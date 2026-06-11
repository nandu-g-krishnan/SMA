param(
  [string]$Owner = "nandu-g-krishnan",
  [string]$Repo = "SMA"
)

$ErrorActionPreference = "Stop"

function Get-BacklogItems {
  $backlogFiles = @(
    "github/Initiatives.md",
    "github/Epics.md",
    "github/Features.md",
    "github/backlog/Stories.md",
    "github/backlog/KiteStories.md"
  )

  $items = New-Object System.Collections.Generic.List[string]
  foreach ($file in $backlogFiles) {
    $content = Get-Content $file -Raw
    $matches = [regex]::Matches($content, "(?m)^##\s+(.+)$")
    foreach ($match in $matches) {
      $items.Add($match.Groups[1].Value.Trim())
    }
  }

  return $items
}

function Get-RemoteIssues {
  $issues = @()

$lines = gh api --paginate "repos/$Owner/$Repo/issues?state=all&per_page=100" --jq '.[] | select(.pull_request == null) | [.number, .title, (.assignees | map(.login) | join(",")), (.labels | map(.name) | join(",")), (.body // "")] | @tsv'
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub issue list failed. Exit code: $LASTEXITCODE"
  }

  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $parts = $line -split "`t", 5
    if ($parts.Count -ge 2) {
      $issues += [pscustomobject]@{
        number = [int]$parts[0]
        title = $parts[1]
        assignees = if ($parts.Count -ge 3) { $parts[2] } else { "" }
        labels = if ($parts.Count -ge 4) { $parts[3] } else { "" }
        body = if ($parts.Count -ge 5) { $parts[4] } else { "" }
      }
    }
  }

  return $issues
}

$localTitles = Get-BacklogItems
$remoteIssues = Get-RemoteIssues

$remoteByTitle = @{}
foreach ($issue in $remoteIssues) {
  if (-not $remoteByTitle.ContainsKey($issue.title)) {
    $remoteByTitle[$issue.title] = New-Object System.Collections.Generic.List[int]
  }
  $remoteByTitle[$issue.title].Add([int]$issue.number)
}

$missing = @()
foreach ($title in $localTitles) {
  if (-not $remoteByTitle.ContainsKey($title)) {
    $missing += $title
  }
}

$duplicates = @()
$unassigned = @()
$missingLabels = @()
$missingKnowledgeId = @()
$missingSourceDocument = @()
foreach ($title in $remoteByTitle.Keys) {
  if ($remoteByTitle[$title].Count -gt 1) {
    $duplicates += [pscustomobject]@{
      Title = $title
      Issues = ($remoteByTitle[$title] -join ", ")
    }
  }
}

foreach ($issue in $remoteIssues) {
  if ([string]::IsNullOrWhiteSpace($issue.assignees)) {
    $unassigned += $issue
  }
  if ([string]::IsNullOrWhiteSpace($issue.labels)) {
    $missingLabels += $issue
  }
  if ($issue.body -notmatch "KnowledgeIds?:|KnowledgeId|SourceTraceabilityMatrix|Source References") {
    $missingKnowledgeId += $issue
  }
  if ($issue.body -notmatch "SourceDocument|Source Documents|Source References|Source PDF") {
    $missingSourceDocument += $issue
  }
}

Write-Host "Local backlog items: $($localTitles.Count)"
Write-Host "Remote issues fetched: $($remoteIssues.Count)"
Write-Host "Missing remote issues: $($missing.Count)"
Write-Host "Duplicate remote titles: $($duplicates.Count)"
Write-Host "Unassigned issues: $($unassigned.Count)"
Write-Host "Issues missing labels: $($missingLabels.Count)"
Write-Host "Issues missing KnowledgeId or traceability marker: $($missingKnowledgeId.Count)"
Write-Host "Issues missing source document marker: $($missingSourceDocument.Count)"
Write-Host "Project items not linked: Pending Project V2 scope audit"

if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing:"
  $missing | ForEach-Object { Write-Host "- $_" }
}

if ($duplicates.Count -gt 0) {
  Write-Host ""
  Write-Host "Duplicates:"
  $duplicates | ForEach-Object { Write-Host "- $($_.Title): #$($_.Issues)" }
}

if ($unassigned.Count -gt 0) {
  Write-Host ""
  Write-Host "Unassigned:"
  $unassigned | Select-Object -First 50 | ForEach-Object { Write-Host "- #$($_.number) $($_.title)" }
}

if ($missingLabels.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing Labels:"
  $missingLabels | Select-Object -First 50 | ForEach-Object { Write-Host "- #$($_.number) $($_.title)" }
}

if ($missingKnowledgeId.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing KnowledgeId/Traceability Marker:"
  $missingKnowledgeId | Select-Object -First 50 | ForEach-Object { Write-Host "- #$($_.number) $($_.title)" }
}

if ($missingSourceDocument.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing Source Document Marker:"
  $missingSourceDocument | Select-Object -First 50 | ForEach-Object { Write-Host "- #$($_.number) $($_.title)" }
}
