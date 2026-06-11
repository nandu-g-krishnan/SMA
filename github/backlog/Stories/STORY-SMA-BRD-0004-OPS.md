# STORY-SMA-BRD-0004-OPS: Operationalize Market breadth, advance/decline, new highs/lows

Type: Story

Story Id: STORY-SMA-BRD-0004-OPS

Story Type: Operational Story

KnowledgeIds: SMA-BRD-0004

Knowledge Source: Market_Strategy

Source Document: idirect_marketstrategy_2026.pdf

Source Page: Document-level reference recorded in extraction audit; page-specific review logged in GapAnalysis

Architecture Component: Breadth Analytics Engine, Feature Store

Initiative: I02 Market Intelligence Platform

Epic: I02-E05 Breadth analytics

Feature: Advance decline, new highs lows, volume breadth, participation score

Business Goal: Deliver operational story coverage for Market breadth, advance/decline, new highs/lows while preserving source-backed governance.

Functional Requirements:

- Use the authoritative source references for Market breadth, advance/decline, new highs/lows.
- Preserve traceability from source document to KnowledgeId to story, code, and test evidence.
- Keep behavior consistent with MasterKnowledgeBase and all relevant master catalogs.

Technical Requirements:

- Implement deterministic logic or validation evidence where applicable.
- Store implementation, test, validation, documentation, and operational evidence against SMA-BRD-0004.
- Respect data-quality and capital-protection gates before any downstream execution path is enabled.

Dependencies: Market data, source-document audit record, architecture component, and validation fixtures

Risk Controls: Stale-data guard, validation failure guard, traceability guard, review gates, and capital protection controls where execution risk exists.

Acceptance Criteria:

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

Definition Of Done:

- Operational Story evidence exists for SMA-BRD-0004.
- Source document and source page/section are referenced.
- Architecture component, initiative, epic, feature, story, task, code, and test mappings are traceable.
- BacklogCoverageReport remains PASS.

Testing Requirements: Unit, integration, contract, validation, regression, documentation, and operational readiness checks as applicable.

Traceability References: MasterKnowledgeBase.md, SourceTraceabilityMatrix.md, ImplementationTraceabilityMatrix.md, BacklogCoverageReport.md.

Implementation Notes: Market Breadth service, validation fixtures, API endpoint, database table, dashboard component, test suite
