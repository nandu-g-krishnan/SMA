param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "docs/master-data/MasterKnowledgeBase.md",
  "docs/master-data/CanonicalConceptRegistry.md",
  "docs/master-data/IndicatorMasterCatalog.md",
  "docs/master-data/PatternMasterCatalog.md",
  "docs/master-data/CandlestickMasterCatalog.md",
  "docs/master-data/StrategyMasterCatalog.md",
  "docs/master-data/SignalMasterCatalog.md",
  "docs/master-data/FeatureMasterCatalog.md",
  "docs/master-data/OptionsMasterCatalog.md",
  "docs/master-data/FuturesMasterCatalog.md",
  "docs/master-data/ValuationMasterCatalog.md",
  "docs/master-data/FundamentalMasterCatalog.md",
  "docs/master-data/RiskMasterCatalog.md",
  "docs/master-data/MarketBreadthMasterCatalog.md",
  "docs/master-data/MacroMasterCatalog.md",
  "docs/master-data/MarketRegimeMasterCatalog.md",
  "docs/master-data/MachineLearningMasterCatalog.md",
  "docs/master-data/ExecutionMasterCatalog.md",
  "docs/master-data/KiteApiMasterCatalog.md",
  "docs/master-data/KnowledgeExtractionCoverageReport.md",
  "docs/master-data/KnowledgeDistributionReport.md",
  "docs/traceability/SourceTraceabilityMatrix.md",
  "docs/traceability/ImplementationTraceabilityMatrix.md",
  "docs/validation/SourceCoverageReport.md",
  "docs/validation/ArchitectureCoverageReport.md",
  "docs/validation/StoryCoverageReport.md",
  "docs/validation/KnowledgeOrphanReport.md",
  "docs/validation/StoryCompletenessReport.md",
  "docs/validation/StrategyReadinessReport.md",
  "docs/validation/DataQualityReport.md",
  "docs/validation/CapitalProtectionReadinessReport.md",
  "docs/validation/StoryAuditReport.md",
  "docs/validation/StorySecurityReport.md",
  "docs/validation/StoryAcceptanceReport.md",
  "docs/validation/StoryTraceabilityReport.md",
  "docs/validation/EngineeringStandardsComplianceReport.md",
  "docs/validation/BacklogCoverageReport.md",
  "docs/validation/BacklogDistributionReport.md",
  "docs/validation/BacklogDeduplicationReport.md",
  "docs/architecture/ArchitectureBaseline_v1.md",
  "docs/architecture/ArchitectureChangeRequest.md",
  "docs/implementation/ImplementationBaseline_v1.md",
  "docs/implementation/StoryExecutionDashboard.md",
  "docs/implementation/ExecutionMetrics.md",
  "docs/governance/MasterUniversalStoryImplementationOperatingSystem.md",
  "docs/governance/StoryLifecycleGovernanceRules.md",
  "docs/governance/ImplementationExecutionRules.md",
  "docs/governance/EngineeringArchitectureAndCodingStandards.md",
  "github/backlog/Dependencies.md",
  "github/backlog/BacklogCoverageReport.md",
  "github/backlog/BacklogBaseline_v1.md",
  "github/backlog/KiteStories.md",
  "github/backlog/KiteBacklogCoverageReport.md",
  "github/import/kite-stories.csv",
  "github/backlog/ProjectSyncMatrix.md",
  "github/backlog/StoryRegistry.md"
)

$failed = $false

foreach ($relativePath in $requiredFiles) {
  $path = Join-Path $Root $relativePath
  if (-not (Test-Path $path)) {
    [Console]::Error.WriteLine("Missing required traceability artifact: $relativePath")
    $failed = $true
    continue
  }

  $content = Get-Content $path -Raw
  if ($content -match "Status:\s*Incomplete") {
    [Console]::Error.WriteLine("Traceability artifact is incomplete: $relativePath")
    $failed = $true
  }

  if ($relativePath -eq "docs/validation/KnowledgeOrphanReport.md" -and $content -notmatch "Orphan count:\s*0") {
    [Console]::Error.WriteLine("Knowledge orphan report must show zero orphans.")
    $failed = $true
  }

  if ($relativePath -in @(
    "docs/validation/StoryCompletenessReport.md",
    "docs/validation/StrategyReadinessReport.md",
    "docs/validation/DataQualityReport.md",
    "docs/validation/CapitalProtectionReadinessReport.md",
    "docs/validation/EngineeringStandardsComplianceReport.md",
    "docs/validation/BacklogCoverageReport.md",
    "docs/validation/BacklogDistributionReport.md",
    "docs/master-data/KiteApiMasterCatalog.md",
    "github/backlog/BacklogCoverageReport.md",
    "github/backlog/KiteBacklogCoverageReport.md"
  ) -and $content -notmatch "Status:\s*PASS") {
    [Console]::Error.WriteLine("Authorization report must be PASS: $relativePath")
    $failed = $true
  }

  if ($relativePath -eq "docs/architecture/ArchitectureBaseline_v1.md" -and $content -notmatch "Status\s*=\s*LOCKED") {
    [Console]::Error.WriteLine("Architecture baseline must be LOCKED.")
    $failed = $true
  }

  if ($relativePath -eq "docs/governance/StoryLifecycleGovernanceRules.md") {
    if ($content -notmatch "Status:\s*MANDATORY") {
      [Console]::Error.WriteLine("Story lifecycle governance must be MANDATORY.")
      $failed = $true
    }

    if ($content -notmatch "Priority:\s*P1") {
      [Console]::Error.WriteLine("Story lifecycle governance must be P1.")
      $failed = $true
    }

    foreach ($stage in @(
      "Implementation Complete",
      "Audit Review",
      "Security Review",
      "Acceptance Validation",
      "Traceability Validation",
      "Ready For Closure",
      "Closed"
    )) {
      if ($content -notmatch [regex]::Escape($stage)) {
        [Console]::Error.WriteLine("Story lifecycle governance is missing stage: $stage")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "docs/governance/ImplementationExecutionRules.md") {
    if ($content -notmatch "Status:\s*MANDATORY") {
      [Console]::Error.WriteLine("Implementation execution rules must be MANDATORY.")
      $failed = $true
    }

    foreach ($rule in @(
      "No AI before Feature Store",
      "No Strategy implementation before Signal Engine",
      "No Execution before Paper Trading",
      "No Live Trading before",
      "GitHub is unavailable, local status remains authoritative"
    )) {
      if ($content -notmatch [regex]::Escape($rule)) {
        [Console]::Error.WriteLine("Implementation execution rules are missing rule: $rule")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "docs/governance/MasterUniversalStoryImplementationOperatingSystem.md") {
    if ($content -notmatch "Status:\s*MANDATORY") {
      [Console]::Error.WriteLine("Master universal story implementation operating system must be MANDATORY.")
      $failed = $true
    }

    foreach ($rule in @(
      "Repository Is The Source Of Truth",
      "P0 Rule: Knowledge First",
      "EngineeringArchitectureAndCodingStandards.md",
      "P0-A Rule: Repository Reality Check",
      "P0-B Rule: Source Document Precedence",
      "P0-C Rule: Master Data Synchronization",
      "P0-D Rule: Knowledge Coverage Protection",
      "P0-E Rule: Kite Contract Protection",
      "P0-F Rule: Feature Store First",
      "P0-G Rule: Strategy Safety Rule",
      "P0-H Rule: Capital Protection Rule",
      "P0-I Rule: Data Quality Rule",
      "P0-J Rule: Implementation Evidence Rule",
      "P0-K Rule: Manual Validation Honesty Rule",
      "P0-L Rule: Single Story Execution Rule",
      "P0-M Rule: Completed Story Immutability",
      "P0-N Rule: Implementation Authorization Protection",
      "Load Project Governance",
      "Load Execution Dashboard",
      "Generate Implementation Context",
      "Knowledge Validation",
      "Build Validation",
      "Test Validation",
      "Engineering Standards Compliance",
      "Anti-Shortcut Rules",
      "No evidence means no PASS",
      "Knowledge correctness is more important than implementation speed",
      "Validated, tested, secure, audited, traceable completion is completion"
    )) {
      if ($content -notmatch [regex]::Escape($rule)) {
        [Console]::Error.WriteLine("Master operating system is missing required section/rule: $rule")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "docs/governance/EngineeringArchitectureAndCodingStandards.md") {
    if ($content -notmatch "Status:\s*MANDATORY") {
      [Console]::Error.WriteLine("Engineering architecture and coding standards must be MANDATORY.")
      $failed = $true
    }

    if ($content -notmatch "Priority:\s*P0") {
      [Console]::Error.WriteLine("Engineering architecture and coding standards must be P0.")
      $failed = $true
    }

    foreach ($rule in @(
      "Modular Monolith Rule",
      "MVP Testing Priority Rule",
      "Mock Data Rule",
      "Kite Integration Standards",
      "Engineering Compliance Gate"
    )) {
      if ($content -notmatch [regex]::Escape($rule)) {
        [Console]::Error.WriteLine("Engineering standards are missing required rule: $rule")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "docs/implementation/StoryExecutionDashboard.md") {
    foreach ($column in @(
      "Story Id",
      "Story Name",
      "KnowledgeIds",
      "Implementation Status",
      "Audit Status",
      "Security Status",
      "Acceptance Status",
      "Traceability Status",
      "Completion %"
    )) {
      if ($content -notmatch [regex]::Escape($column)) {
        [Console]::Error.WriteLine("Story execution dashboard is missing required column: $column")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "docs/implementation/ExecutionMetrics.md") {
    foreach ($metric in @(
      "Total Stories",
      "Completed Stories",
      "Blocked Stories",
      "Ready Stories",
      "Failed Stories",
      "Coverage %",
      "Epic Progress",
      "Initiative Progress"
    )) {
      if ($content -notmatch [regex]::Escape($metric)) {
        [Console]::Error.WriteLine("Execution metrics are missing required metric: $metric")
        $failed = $true
      }
    }
  }

  if ($relativePath -eq "github/backlog/StoryRegistry.md") {
    foreach ($column in @(
      "Story Id",
      "KnowledgeIds",
      "GitHub Issue",
      "Local Story File",
      "Implementation Status",
      "Audit Status",
      "Security Status",
      "Acceptance Status",
      "Closure Status"
    )) {
      if ($content -notmatch [regex]::Escape($column)) {
        [Console]::Error.WriteLine("Story registry is missing required column: $column")
        $failed = $true
      }
    }
  }

  if ($relativePath -in @(
    "docs/implementation/ImplementationBaseline_v1.md",
    "github/backlog/BacklogBaseline_v1.md",
    "github/backlog/Dependencies.md"
  ) -and $content -notmatch "Status\s*=\s*LOCKED|Status:\s*LOCKED") {
    [Console]::Error.WriteLine("Baseline artifact must be LOCKED: $relativePath")
    $failed = $true
  }
}

if ($failed) {
  exit 1
}

Write-Host "Traceability gate passed."
