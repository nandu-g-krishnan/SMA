param(
  [string]$Owner = "nandu-g-krishnan",
  [string]$Repo = "SMA",
  [string]$Assignee = "nandu-g-krishnan",
  [string]$ExistingTitleCache = "",
  [int]$BatchSize = 25,
  [int]$SleepSeconds = 3,
  [switch]$DryRun,
  [switch]$UpdateExisting
)

$ErrorActionPreference = "Stop"

function Invoke-Gh {
  param(
    [string[]]$Arguments,
    [string]$Action
  )

  $result = & gh @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI failed while $Action. Exit code: $LASTEXITCODE"
  }
  return $result
}

function Get-RemoteIssues {
  $issues = @()

  $lines = Invoke-Gh `
    -Arguments @("api", "--paginate", "repos/$Owner/$Repo/issues?state=all&per_page=100", "--jq", '.[] | select(.pull_request == null) | [.number, .title, (.assignees | map(.login) | join(","))] | @tsv') `
    -Action "listing existing issues"

  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $parts = $line -split "`t", 3
    if ($parts.Count -ge 2) {
      $assigneeLogins = @()
      if ($parts.Count -eq 3 -and -not [string]::IsNullOrWhiteSpace($parts[2])) {
        $assigneeLogins = $parts[2].Split(",") | ForEach-Object {
          [pscustomobject]@{ login = $_ }
        }
      }

      $issues += [pscustomobject]@{
        number = [int]$parts[0]
        title = $parts[1]
        assignees = $assigneeLogins
      }
    }
  }

  return $issues
}

function Ensure-Assignee {
  param(
    [int]$IssueNumber,
    [object[]]$CurrentAssignees
  )

  if ([string]::IsNullOrWhiteSpace($Assignee)) {
    return
  }

  $alreadyAssigned = @($CurrentAssignees | Where-Object { $_.login -eq $Assignee }).Count -gt 0
  if (-not $alreadyAssigned) {
    Invoke-Gh `
      -Arguments @("api", "-X", "POST", "repos/$Owner/$Repo/issues/$IssueNumber/assignees", "-f", "assignees[]=$Assignee") `
      -Action "assigning issue #$IssueNumber to $Assignee" | Out-Null
    Write-Host "Assigned issue #$IssueNumber to $Assignee"
  }
}

function New-Issue {
  param(
    [string]$Title,
    [string]$Body,
    [string]$Label
  )

  $arguments = @("api", "-X", "POST", "repos/$Owner/$Repo/issues", "-f", "title=$Title", "-f", "body=$Body")
  foreach ($labelName in $Label.Split(",")) {
    $trimmed = $labelName.Trim()
    if ($trimmed.Length -gt 0) {
      $arguments += "-f"
      $arguments += "labels[]=$trimmed"
    }
  }
  if (-not [string]::IsNullOrWhiteSpace($Assignee)) {
    $arguments += "-f"
    $arguments += "assignees[]=$Assignee"
  }

  $json = Invoke-Gh -Arguments $arguments -Action "creating issue $Title"
  return (($json -join "`n") | ConvertFrom-Json)
}

function Update-IssueBody {
  param(
    [int]$IssueNumber,
    [string]$Body
  )

  Invoke-Gh `
    -Arguments @("api", "-X", "PATCH", "repos/$Owner/$Repo/issues/$IssueNumber", "-f", "body=$Body") `
    -Action "updating issue #$IssueNumber" | Out-Null
}

$backlogFiles = @(
  @{
    Path = "github/Initiatives.md"
    Label = "initiative"
  },
  @{
    Path = "github/Epics.md"
    Label = "epic"
  },
  @{
    Path = "github/Features.md"
    Label = "feature"
  },
  @{
    Path = "github/backlog/Stories.md"
    Label = "story"
  },
  @{
    Path = "github/backlog/KiteStories.md"
    Label = "story,kite,broker"
  }
)

$existingByTitle = @{}
if (-not $DryRun) {
  $existingIssues = @()
  if (-not [string]::IsNullOrWhiteSpace($ExistingTitleCache)) {
    $cachedTitles = Get-Content $ExistingTitleCache
    foreach ($cachedTitle in $cachedTitles) {
      $trimmedTitle = $cachedTitle.Trim()
      if ($trimmedTitle.Length -gt 0) {
        $existingIssues += [pscustomobject]@{
          title = $trimmedTitle
          number = 0
          assignees = @()
        }
      }
    }
  } else {
    $existingIssues = Get-RemoteIssues
  }

  foreach ($issue in $existingIssues) {
    if (-not $existingByTitle.ContainsKey($issue.title)) {
      $existingByTitle[$issue.title] = $issue
    }
  }
}

foreach ($backlogFile in $backlogFiles) {
  $storyFile = $backlogFile.Path
  $label = $backlogFile.Label
  $content = Get-Content $storyFile -Raw
  $matches = [regex]::Matches($content, "(?ms)^##\s+([^`r`n]+)\r?\n(.*?)(?=^##\s+|\z)")
  $processedInBatch = 0
  foreach ($match in $matches) {
    $title = $match.Groups[1].Value.Trim()
    $body = $match.Groups[2].Value.Trim()
    if ($DryRun) {
      Write-Host "[DRY RUN] Would create/update GitHub issue: [$label] $title"
      continue
    }

    if ($existingByTitle.ContainsKey($title)) {
      $existingIssue = $existingByTitle[$title]
      $number = $existingIssue.number
      if ($UpdateExisting) {
        if ($number -gt 0) {
          Update-IssueBody -IssueNumber $number -Body $body
          Write-Host "Updated issue #$number $title"
        } else {
          Write-Host "Skipped cached existing issue $title"
        }
      } else {
        if ($number -gt 0) {
          Write-Host "Skipped existing issue #$number $title"
        } else {
          Write-Host "Skipped cached existing issue $title"
        }
      }
      if ($number -gt 0) {
        Ensure-Assignee -IssueNumber $number -CurrentAssignees @($existingIssue.assignees)
      }
    } else {
      $created = New-Issue -Title $title -Body $body -Label $label
      $existingByTitle[$title] = $created
      Write-Host "Created issue #$($created.number) $title"
    }

    if (-not $DryRun -and $BatchSize -gt 0) {
      $processedInBatch++
      if ($processedInBatch -ge $BatchSize) {
        Write-Host "Batch limit reached ($BatchSize). Sleeping for $SleepSeconds seconds to avoid GitHub secondary limits."
        Start-Sleep -Seconds $SleepSeconds
        $processedInBatch = 0
      }
    }
  }
}
