param(
  [string]$Owner = "nandu-g-krishnan",
  [string]$Repo = "SMA",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$lines = gh api --paginate "repos/$Owner/$Repo/issues?state=all&per_page=100" --jq '.[] | select(.pull_request == null) | [.number, .title] | @tsv'
if ($LASTEXITCODE -ne 0) {
  throw "GitHub issue list failed. Exit code: $LASTEXITCODE"
}

$byTitle = @{}
foreach ($line in $lines) {
  if ([string]::IsNullOrWhiteSpace($line)) {
    continue
  }

  $parts = $line -split "`t", 2
  if ($parts.Count -ne 2) {
    continue
  }

  $number = [int]$parts[0]
  $title = $parts[1]
  if (-not $byTitle.ContainsKey($title)) {
    $byTitle[$title] = New-Object System.Collections.Generic.List[int]
  }
  $byTitle[$title].Add($number)
}

foreach ($title in $byTitle.Keys) {
  $numbers = @($byTitle[$title] | Sort-Object)
  if ($numbers.Count -le 1) {
    continue
  }

  $canonical = $numbers[0]
  $duplicates = @($numbers | Select-Object -Skip 1)
  foreach ($duplicate in $duplicates) {
    if ($DryRun) {
      Write-Host "[DRY RUN] Would close duplicate issue #$duplicate for '$title' and keep #$canonical"
      continue
    }

    gh api -X PATCH "repos/$Owner/$Repo/issues/$duplicate" -f state=closed -f state_reason=not_planned
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to close duplicate issue #$duplicate"
    }

    Write-Host "Closed duplicate issue #$duplicate for '$title'; kept #$canonical"
  }
}
