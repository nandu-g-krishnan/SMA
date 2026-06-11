#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"

required_files=(
  "docs/master-data/MasterKnowledgeBase.md"
  "docs/master-data/CanonicalConceptRegistry.md"
  "docs/master-data/IndicatorMasterCatalog.md"
  "docs/master-data/PatternMasterCatalog.md"
  "docs/master-data/CandlestickMasterCatalog.md"
  "docs/master-data/StrategyMasterCatalog.md"
  "docs/master-data/SignalMasterCatalog.md"
  "docs/master-data/FeatureMasterCatalog.md"
  "docs/master-data/OptionsMasterCatalog.md"
  "docs/master-data/FuturesMasterCatalog.md"
  "docs/master-data/ValuationMasterCatalog.md"
  "docs/master-data/FundamentalMasterCatalog.md"
  "docs/master-data/RiskMasterCatalog.md"
  "docs/master-data/MarketBreadthMasterCatalog.md"
  "docs/master-data/MacroMasterCatalog.md"
  "docs/master-data/MarketRegimeMasterCatalog.md"
  "docs/master-data/MachineLearningMasterCatalog.md"
  "docs/master-data/ExecutionMasterCatalog.md"
  "docs/master-data/KnowledgeExtractionCoverageReport.md"
  "docs/master-data/KnowledgeDistributionReport.md"
  "docs/traceability/SourceTraceabilityMatrix.md"
  "docs/traceability/ImplementationTraceabilityMatrix.md"
  "docs/validation/SourceCoverageReport.md"
  "docs/validation/ArchitectureCoverageReport.md"
  "docs/validation/StoryCoverageReport.md"
  "docs/validation/KnowledgeOrphanReport.md"
  "docs/validation/StoryCompletenessReport.md"
  "docs/validation/StrategyReadinessReport.md"
  "docs/validation/DataQualityReport.md"
  "docs/validation/CapitalProtectionReadinessReport.md"
  "docs/validation/BacklogCoverageReport.md"
  "docs/architecture/ArchitectureBaseline_v1.md"
  "docs/architecture/ArchitectureChangeRequest.md"
  "docs/implementation/ImplementationBaseline_v1.md"
  "github/backlog/Dependencies.md"
  "github/backlog/BacklogCoverageReport.md"
  "github/backlog/BacklogBaseline_v1.md"
  "github/backlog/KiteStories.md"
  "github/backlog/KiteBacklogCoverageReport.md"
  "github/import/kite-stories.csv"
)

failed=0

for relative_path in "${required_files[@]}"; do
  path="$ROOT/$relative_path"
  if [[ ! -f "$path" ]]; then
    echo "Missing required traceability artifact: $relative_path" >&2
    failed=1
    continue
  fi

  if grep -Eq "Status:[[:space:]]*Incomplete" "$path"; then
    echo "Traceability artifact is incomplete: $relative_path" >&2
    failed=1
  fi

  if [[ "$relative_path" == "docs/validation/KnowledgeOrphanReport.md" ]] && ! grep -Eq "Orphan count:[[:space:]]*0" "$path"; then
    echo "Knowledge orphan report must show zero orphans." >&2
    failed=1
  fi

  case "$relative_path" in
    "docs/validation/StoryCompletenessReport.md"|"docs/validation/StrategyReadinessReport.md"|"docs/validation/DataQualityReport.md"|"docs/validation/CapitalProtectionReadinessReport.md"|"docs/validation/BacklogCoverageReport.md"|"github/backlog/BacklogCoverageReport.md"|"github/backlog/KiteBacklogCoverageReport.md")
      if ! grep -Eq "Status:[[:space:]]*PASS" "$path"; then
        echo "Authorization report must be PASS: $relative_path" >&2
        failed=1
      fi
      ;;
  esac

  if [[ "$relative_path" == "docs/architecture/ArchitectureBaseline_v1.md" ]] && ! grep -Eq "Status[[:space:]]*=[[:space:]]*LOCKED" "$path"; then
    echo "Architecture baseline must be LOCKED." >&2
    failed=1
  fi

  case "$relative_path" in
    "docs/implementation/ImplementationBaseline_v1.md"|"github/backlog/BacklogBaseline_v1.md"|"github/backlog/Dependencies.md")
      if ! grep -Eq "Status[[:space:]]*=[[:space:]]*LOCKED|Status:[[:space:]]*LOCKED" "$path"; then
        echo "Baseline artifact must be LOCKED: $relative_path" >&2
        failed=1
      fi
      ;;
  esac
done

if [[ "$failed" -ne 0 ]]; then
  exit 1
fi

echo "Traceability gate passed."
