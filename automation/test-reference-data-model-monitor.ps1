param(
  [string]$Url = "http://127.0.0.1:5082"
)

$ErrorActionPreference = "Stop"

$project = "apps/api/SMA.Api/SMA.Api.csproj"
$logPath = "docs/validation/reference-data-model-monitor-api.log"

dotnet build $project | Out-Host

$process = Start-Process `
  -FilePath "dotnet" `
  -ArgumentList @("run", "--no-build", "--project", $project, "--urls", $Url) `
  -PassThru `
  -WindowStyle Hidden `
  -RedirectStandardOutput $logPath `
  -RedirectStandardError "docs/validation/reference-data-model-monitor-api.err.log"

try {
  $ready = $false
  for ($i = 0; $i -lt 30; $i++) {
    try {
      Invoke-RestMethod -Uri "$Url/health/live" -Method Get | Out-Null
      $ready = $true
      break
    } catch {
      Start-Sleep -Seconds 1
    }
  }

  if (-not $ready) {
    throw "SMA API did not become ready at $Url."
  }

  $monitor = Invoke-RestMethod -Uri "$Url/api/reference-data/model/monitor" -Method Get

  if ($monitor.storyId -ne "I01-E01-F04-S1") {
    throw "Unexpected storyId: $($monitor.storyId)"
  }

  if ($monitor.knowledgeId -ne "SMA-MLQ-0003") {
    throw "Unexpected knowledgeId: $($monitor.knowledgeId)"
  }

  if ($monitor.architectureComponent -ne "Reference Data Platform") {
    throw "Unexpected architecture component: $($monitor.architectureComponent)"
  }

  if (-not ($monitor.sourceDocuments -contains "ssrn-3138630.pdf")) {
    throw "Expected source document ssrn-3138630.pdf is missing."
  }

  if (-not ($monitor.targets.name -contains "Instrument master")) {
    throw "Instrument master target is missing."
  }

  if (-not ($monitor.dataQualityChecks -contains "Timezone handling")) {
    throw "Timezone handling data-quality check is missing."
  }

  if (-not ($monitor.capitalProtectionControls -contains "No live trading path")) {
    throw "Capital protection no-live-trading control is missing."
  }

  Write-Host "Reference data model monitor smoke test passed."
} finally {
  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
