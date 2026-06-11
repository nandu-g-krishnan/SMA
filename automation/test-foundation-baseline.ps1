param(
  [string]$Url = "http://127.0.0.1:5081"
)

$ErrorActionPreference = "Stop"

$project = "apps/api/SMA.Api/SMA.Api.csproj"
$logPath = "docs/validation/foundation-baseline-api.log"

dotnet build $project | Out-Host

$process = Start-Process `
  -FilePath "dotnet" `
  -ArgumentList @("run", "--no-build", "--project", $project, "--urls", $Url) `
  -PassThru `
  -WindowStyle Hidden `
  -RedirectStandardOutput $logPath `
  -RedirectStandardError "docs/validation/foundation-baseline-api.err.log"

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

  $baseline = Invoke-RestMethod -Uri "$Url/api/foundation/repository-baseline" -Method Get

  if ($baseline.storyId -ne "I01-E01-F01-S1") {
    throw "Unexpected storyId: $($baseline.storyId)"
  }

  if ($baseline.knowledgeId -ne "SMA-KNW-0018") {
    throw "Unexpected knowledgeId: $($baseline.knowledgeId)"
  }

  if ($baseline.architectureStatus -ne "LOCKED") {
    throw "Architecture status is not LOCKED."
  }

  if ($baseline.implementationAuthorization -ne "APPROVED") {
    throw "Implementation authorization is not APPROVED."
  }

  if (-not ($baseline.sourceDocuments -contains "4823_Technical Analysis.pdf")) {
    throw "Expected source document is missing from baseline response."
  }

  Write-Host "Foundation baseline smoke test passed."
} finally {
  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
