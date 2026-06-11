param(
  [string]$ProjectOwner = "@me",
  [string]$RepoOwner = "nandu-g-krishnan",
  [string]$Repo = "SMA",
  [string]$ProjectTitle = "SMA Institutional Trading Platform",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Invoke-Gh {
  param(
    [string[]]$Arguments,
    [string]$Action
  )

  if ($DryRun) {
    Write-Host "[DRY RUN] gh $($Arguments -join ' ')"
    return ""
  }

  $result = & gh @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI failed while $Action. Exit code: $LASTEXITCODE"
  }
  return $result
}

function Get-RemoteIssues {
  $issues = @()
  $page = 1

  while ($true) {
    $json = & gh api "repos/$RepoOwner/$Repo/issues?state=all&per_page=100&page=$page"
    if ($LASTEXITCODE -ne 0) {
      throw "GitHub CLI failed while listing repository issues page $page. Exit code: $LASTEXITCODE"
    }

    $pageItems = @($json | ConvertFrom-Json)
    $pageItems = @($pageItems | Where-Object { -not $_.pull_request })
    if ($pageItems.Count -eq 0) {
      break
    }

    $issues += $pageItems
    if ($pageItems.Count -lt 100) {
      break
    }

    $page++
  }

  return $issues
}

function Get-OrCreateProjectNumber {
  if ($DryRun) {
    Write-Host "[DRY RUN] Would find or create Project V2 '$ProjectTitle' for $ProjectOwner"
    return 1
  }

  $projectListJson = Invoke-Gh `
    -Arguments @("project", "list", "--owner", $ProjectOwner, "--format", "json", "--limit", "100") `
    -Action "listing projects for $ProjectOwner"

  $projects = ($projectListJson | ConvertFrom-Json).projects
  $existing = @($projects | Where-Object { $_.title -eq $ProjectTitle } | Select-Object -First 1)
  if ($existing.Count -gt 0) {
    Write-Host "Found Project V2 #$($existing[0].number): $ProjectTitle"
    return [int]$existing[0].number
  }

  $createdJson = Invoke-Gh `
    -Arguments @("project", "create", "--owner", $ProjectOwner, "--title", $ProjectTitle, "--format", "json") `
    -Action "creating Project V2 $ProjectTitle"

  $created = $createdJson | ConvertFrom-Json
  Write-Host "Created Project V2 #$($created.number): $ProjectTitle"
  return [int]$created.number
}

function Ensure-ProjectFields {
  param([int]$ProjectNumber)

  $requiredFields = @(
    @{ Name = "KnowledgeId"; Type = "TEXT" },
    @{ Name = "Knowledge Source"; Type = "SINGLE_SELECT"; Options = "TA_Workbook,Research_Paper,Kite_API,Market_Strategy,Architecture,Governance" },
    @{ Name = "Source Document"; Type = "TEXT" },
    @{ Name = "Source Page"; Type = "TEXT" },
    @{ Name = "Architecture Component"; Type = "TEXT" },
    @{ Name = "Initiative"; Type = "TEXT" },
    @{ Name = "Epic"; Type = "TEXT" },
    @{ Name = "Feature"; Type = "TEXT" },
    @{ Name = "Story"; Type = "TEXT" },
    @{ Name = "Formula Verified"; Type = "SINGLE_SELECT"; Options = "No,Yes,Not Applicable" },
    @{ Name = "Backtest Verified"; Type = "SINGLE_SELECT"; Options = "No,Yes,Not Applicable" },
    @{ Name = "Paper Trade Verified"; Type = "SINGLE_SELECT"; Options = "No,Yes,Not Applicable" },
    @{ Name = "Live Verified"; Type = "SINGLE_SELECT"; Options = "No,Yes,Not Applicable" },
    @{ Name = "Compliance Status"; Type = "SINGLE_SELECT"; Options = "Not Reviewed,Pass,Fail" },
    @{ Name = "Priority"; Type = "SINGLE_SELECT"; Options = "High,Medium,Low" },
    @{ Name = "Story Points"; Type = "NUMBER" },
    @{ Name = "Status"; Type = "SINGLE_SELECT"; Options = "Ready,In Progress,Blocked,Done" },
    @{ Name = "Model Version"; Type = "TEXT" },
    @{ Name = "Risk Review"; Type = "SINGLE_SELECT"; Options = "Required,Approved,Rejected,Not Required" }
  )

  if ($DryRun) {
    foreach ($field in $requiredFields) {
      Write-Host "[DRY RUN] Would ensure Project V2 field: $($field.Name)"
    }
    return
  }

  $fieldListJson = Invoke-Gh `
    -Arguments @("project", "field-list", "$ProjectNumber", "--owner", $ProjectOwner, "--format", "json", "--limit", "100") `
    -Action "listing fields for Project V2 #$ProjectNumber"

  $existingFields = ($fieldListJson | ConvertFrom-Json).fields
  foreach ($field in $requiredFields) {
    $exists = @($existingFields | Where-Object { $_.name -eq $field.Name }).Count -gt 0
    if ($exists) {
      Write-Host "Skipped existing field: $($field.Name)"
      continue
    }

    $arguments = @("project", "field-create", "$ProjectNumber", "--owner", $ProjectOwner, "--name", $field.Name, "--data-type", $field.Type)
    if ($field.Type -eq "SINGLE_SELECT") {
      $arguments += "--single-select-options"
      $arguments += $field.Options
    }

    Invoke-Gh -Arguments $arguments -Action "creating Project V2 field $($field.Name)" | Out-Null
    Write-Host "Created field: $($field.Name)"
  }
}

function Add-IssuesToProject {
  param([int]$ProjectNumber)

  $issues = Get-RemoteIssues
  foreach ($issue in $issues) {
    Invoke-Gh `
      -Arguments @("project", "item-add", "$ProjectNumber", "--owner", $ProjectOwner, "--url", $issue.html_url) `
      -Action "adding issue #$($issue.number) to Project V2 #$ProjectNumber" | Out-Null
    Write-Host "Linked issue #$($issue.number): $($issue.title)"
  }
}

$projectNumber = Get-OrCreateProjectNumber
Ensure-ProjectFields -ProjectNumber $projectNumber
Add-IssuesToProject -ProjectNumber $projectNumber

Write-Host "Project V2 sync complete for $ProjectTitle."
