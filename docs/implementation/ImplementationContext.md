# Implementation Context

Status: ACTIVE

## Current Story

| Field | Value |
| --- | --- |
| Story Id | I01-E01-F04-S1 |
| Story Name | Monitor Reference data model |
| Initiative | Trading Core Platform |
| Epic | Platform foundation |
| Feature | Reference data model |
| Phase | Phase 1A Reference Data Platform |
| Priority | medium-priority |
| Status Before Implementation | Ready |

## Source Knowledge Coverage

| Evidence Type | Evidence |
| --- | --- |
| KnowledgeIds | SMA-MLQ-0003 |
| Knowledge Concept | Feature Store |
| Source Documents | rf-v2017-n4-1-pdf.pdf; ssrn-3138630.pdf; ssrn-3247865.pdf |
| Source Page | Document-level source reference recorded in extraction audit; page-specific review logged in GapAnalysis |
| Master Catalogs | MasterKnowledgeBase.md; MachineLearningMasterCatalog.md |
| Architecture | ArchitectureBaseline_v1.md; ArchitectureTraceabilityMatrix.md |
| Traceability | SourceTraceabilityMatrix.md; ImplementationTraceabilityMatrix.md |
| Coverage Status | PASS |

## Files Expected To Change

| File | Purpose |
| --- | --- |
| apps/api/SMA.Api/Program.cs | Add read-only reference data model monitor endpoint and traceable response model |
| automation/test-reference-data-model-monitor.ps1 | Add smoke test for reference data monitor endpoint |
| docs/traceability/ImplementationTraceabilityMatrix.md | Map story to code, API, database target, UI surface, and test |
| docs/validation/StoryKnowledgeValidationReport.md | Record knowledge validation evidence |
| docs/validation/StoryAuditReport.md | Record audit evidence |
| docs/validation/StorySecurityReport.md | Record security evidence |
| docs/validation/StoryAcceptanceReport.md | Record acceptance evidence |
| docs/validation/StoryTraceabilityReport.md | Record traceability evidence |

## Acceptance Criteria

- Knowledge Validation: PASS.
- Source Validation: PASS.
- PDF Compliance Validation: PASS.
- Kite Documentation Compliance Validation: not applicable because this story does not modify broker, auth, streaming, order, or Kite instrument sync contracts.
- Architecture Validation: PASS.
- Traceability Validation: PASS.
- Testing Validation: PASS.
- Documentation Validation: PASS.
- Master Knowledge Base Validation: PASS.
- Signal, Strategy, Risk, and AI catalog validation: no catalog mutation required.
- Data Quality Validation: PASS for monitored data-quality gates; no market-data ingestion behavior added.
- Capital Protection Validation: PASS for no live-trading path.

## Implementation Summary

The implementation adds a read-only `/api/reference-data/model/monitor` endpoint that exposes the reference data model monitoring targets from the locked Phase 1A architecture baseline:

- Instrument master.
- NSE/BSE symbol mapping.
- Kite instrument sync.
- Expiry calendar.
- Trading calendar.
- Holiday calendar.
- Corporate actions framework.
- Sector/industry classification.

The endpoint returns story, KnowledgeId, source documents, traceability artifacts, data-quality checks, and capital-protection controls. It does not place orders, open execution paths, or bypass any capital-protection gate.

Story: `I01-E01-F01-S2: Validate Repository baseline`

## Story Metadata

| Field | Value |
| --- | --- |
| Story Id | `I01-E01-F01-S2` |
| KnowledgeIds | Mapped through SourceTraceabilityMatrix |
| Knowledge Source | TA_Workbook |
| Initiative | Trading Core Platform |
| Epic | Platform foundation |
| Feature | Repository baseline |
| Architecture Component | Trading Core Platform Foundation |
| Upstream Dependency | I01-E01-F01-S1 (CLOSED) |

## Source Documents

- `4823_Technical Analysis.pdf`
- `Everything_you_need_to_know_about_investing-Advanced_series_eBook.pdf`
- `Idenitfying-Chart-Patterns.pdf`
- `research/ingestion-audit/4823_Technical Analysis.md`
- `research/ingestion-audit/Everything_you_need_to_know_about_investing-Advanced_series_eBook.md`
- `research/ingestion-audit/Idenitfying-Chart-Patterns.md`

## Dependencies Validation

| Dependency | Required | Status |
| --- | --- | --- |
| Product vision | Yes | PRESENT |
| Architecture baseline | Yes | LOCKED v1 |
| Domain model | Yes | PRESENT |
| PostgreSQL schema | Yes | PRESENT |
| ASP.NET Core API | Yes | PRESENT (apps/api/SMA.Api/) |
| Angular UI | Yes | PRESENT (apps/web/) |
| Monitoring baseline | Yes | PRESENT |
| Story I01-E01-F01-S1 | Yes | CLOSED |

## Validation Scope

**Task:** Validate repository baseline implementation from S1

**Validation Areas:**
- API endpoint `/api/foundation/repository-baseline` existence and correctness
- Response contract compliance
- Error handling (missing, stale, invalid data)
- Audit trail logging
- Source document traceability
- Knowledge compliance
- Architecture compliance
- Security controls
- Data quality gates
- Capital protection gates

## Files Expected To Change

- `tests/SMA.Api.Tests/` (validator unit tests)
- `apps/api/SMA.Api/` (validation endpoint implementation)
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `docs/validation/StoryKnowledgeValidationReport.md`
- `docs/validation/StoryAuditReport.md`
- `docs/validation/StorySecurityReport.md`
- `docs/validation/StoryAcceptanceReport.md`
- `docs/validation/StoryTraceabilityReport.md`
- `github/backlog/StoryRegistry.md`
- `docs/implementation/StoryExecutionDashboard.md`
- `docs/implementation/ExecutionMetrics.md`

## Acceptance Criteria (All Required for Closure)

- Knowledge Validation: PASS
- Source Validation: PASS
- PDF Compliance Validation: PASS
- Kite Documentation Compliance Validation: PASS
- Architecture Validation: PASS
- Traceability Validation: PASS
- Testing Validation: PASS
- Documentation Validation: PASS
- Master Knowledge Base Validation: PASS
- Signal Catalog Validation: PASS
- Feature Catalog Validation: PASS
- Strategy Catalog Validation: PASS
- Risk Catalog Validation: PASS
- AI Governance Validation: PASS
- Data Quality Validation: PASS
- Capital Protection Validation: PASS
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
