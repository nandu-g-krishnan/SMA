param(
  [string]$Owner = "nandu-g-krishnan",
  [string]$Repo = "SMA",
  [string]$ProjectTitle = "SMA Institutional Trading Platform"
)

$ErrorActionPreference = "Stop"

$labels = @(
  "initiative","epic","feature","story","task","bug","technical-debt","research","architecture",
  "backend","frontend","database","ai","ml","options","futures","risk","portfolio","market-data",
  "news","broker","kite","monitoring","security","devops","high-priority","medium-priority","low-priority",
  "blocked","ready","done"
)

$projectFields = @(
  "KnowledgeId",
  "Source PDF",
  "Source Page",
  "Formula Verified",
  "Backtest Verified",
  "Paper Trade Verified",
  "Live Verified",
  "Compliance Status",
  "Model Version",
  "Risk Review"
)

foreach ($label in $labels) {
  gh label create $label --repo "$Owner/$Repo" --color "ededed" --description "SMA $label" --force
}

Write-Host "Labels ensured for $Owner/$Repo."
Write-Host "Required Project V2 fields:"
foreach ($field in $projectFields) {
  Write-Host "- $field"
}
Write-Host "Create Project V2 fields after confirming Project V2 access and token scope."
Write-Host "Project title: $ProjectTitle"
