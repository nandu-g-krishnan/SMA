# System Architecture

Layered modular monolith or service-ready architecture: Angular client, ASP.NET Core APIs, PostgreSQL, SignalR realtime gateway, Python ML workers, broker adapter, event bus/outbox, and observability stack.

## Mandatory Architecture Additions

- Research Workbench: see `ResearchWorkbenchArchitecture.md`.
- Feature Store: see `FeatureStoreArchitecture.md`.
- Strategy Registry: see `StrategyRegistryArchitecture.md`.
- Market Regime: see `MarketRegimeArchitecture.md`.
- Fundamental Analysis: see `FundamentalAnalysisArchitecture.md`.
- Technical Analysis: see `TechnicalAnalysisArchitecture.md`.
- Institutional Flow: see `InstitutionalFlowArchitecture.md`.
- Global Macro: see `GlobalMacroArchitecture.md`.

## Completion Gates

Architecture is not finalized until the following reports remain green:

- `docs/traceability/SourceTraceabilityMatrix.md`
- `docs/research/KnowledgeGraph.md`
- `docs/validation/ArchitectureReadinessReport.md`
- `docs/validation/GapAnalysis.md`
- `docs/validation/StoryCoverageReport.md`
- `docs/validation/SourceCoverageReport.md`

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md`, `docs/traceability/SourceTraceabilityMatrix.md`, `docs/research/KnowledgeGraph.md`, and all generated backlog stories.
