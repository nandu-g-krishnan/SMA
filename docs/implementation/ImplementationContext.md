# Implementation Context

Status: ACTIVE

Story: `I01-E01-F01-S1: Store Repository baseline`

## Story Metadata

| Field | Value |
| --- | --- |
| Story Id | `I01-E01-F01-S1` |
| KnowledgeIds | `SMA-KNW-0018` |
| Knowledge Concept | Technical analysis assumptions: market discounts everything, market moves in trends, history repeats |
| Initiative | Trading Core Platform |
| Epic | Platform foundation |
| Feature | Repository baseline |
| Architecture Component | Trading Core Platform Foundation |

## Source Documents

- `4823_Technical Analysis.pdf`
- `Everything_you_need_to_know_about_investing-Advanced_series_eBook.pdf`
- `Idenitfying-Chart-Patterns.pdf`
- `research/ingestion-audit/4823_Technical Analysis.md`
- `research/ingestion-audit/Everything_you_need_to_know_about_investing-Advanced_series_eBook.md`
- `research/ingestion-audit/Idenitfying-Chart-Patterns.md`

## Files Expected To Change

- `apps/api/SMA.Api/Program.cs`
- `automation/test-foundation-baseline.ps1`
- `docs/traceability/SourceTraceabilityMatrix.md`
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `docs/validation/StoryKnowledgeValidationReport.md`
- `docs/validation/StoryAuditReport.md`
- `docs/validation/StorySecurityReport.md`
- `docs/validation/StoryAcceptanceReport.md`
- `docs/validation/StoryTraceabilityReport.md`
- `github/backlog/StoryRegistry.md`
- `docs/implementation/StoryExecutionDashboard.md`
- `docs/implementation/ExecutionMetrics.md`

## Acceptance Criteria

- Knowledge Validation: PASS
- Source Validation: PASS
- PDF Compliance Validation: PASS
- Architecture Validation: PASS
- Traceability Validation: PASS
- Testing Validation: PASS
- Documentation Validation: PASS
- Data Quality Validation: PASS
- Capital Protection Validation: PASS

## Definition Of Done

- Repository baseline is stored by the foundation API.
- Baseline response includes Story Id, KnowledgeId, architecture component, source documents, and traceability artifacts.
- Build and smoke test evidence exist.
- Audit, security, acceptance, and traceability reports pass with evidence.
- Story registry, dashboard, execution metrics, and implementation traceability are updated.

## Risks

- PDF source references are document-level because page-specific extraction for image-heavy documents is tracked in GapAnalysis.
- Database persistence is not implemented in this story; repository baseline storage uses an in-memory singleton as a foundation-platform baseline and documents the future PostgreSQL dependency.

## Validation Required

- `dotnet build SMA.sln`
- `cmd /c npm run build`
- `powershell -ExecutionPolicy Bypass -File automation\test-foundation-baseline.ps1`
- `powershell -ExecutionPolicy Bypass -File automation\validate-traceability.ps1`

## Testing Required

- Foundation API live health check.
- Repository baseline API smoke test.
- Traceability gate.
