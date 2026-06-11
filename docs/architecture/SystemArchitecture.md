# System Architecture

Layered modular monolith architecture for 1-3 users: Angular client, ASP.NET Core APIs, PostgreSQL, Redis, SignalR realtime gateway, Python AI services, Kite broker adapter, outbox-ready module boundaries, and observability.

Development runs locally using native tools. Production targets a single Ubuntu VPS with 8 vCPU, 16 GB RAM, and 200 GB SSD.

Containers are optional. The architecture remains service-extractable, but microservices are not required for the current deployment target.

## Mandatory Architecture Additions

- Research Workbench: see `ResearchWorkbenchArchitecture.md`.
- Feature Store: see `FeatureStoreArchitecture.md`.
- Strategy Registry: see `StrategyRegistryArchitecture.md`.
- Market Regime: see `MarketRegimeArchitecture.md`.
- Fundamental Analysis: see `FundamentalAnalysisArchitecture.md`.
- Technical Analysis: see `TechnicalAnalysisArchitecture.md`.
- Institutional Flow: see `InstitutionalFlowArchitecture.md`.
- Global Macro: see `GlobalMacroArchitecture.md`.
- Market Intelligence: see `14_MarketIntelligenceArchitecture.md`.

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
- Use Redis for cache and realtime coordination; evaluate additional distributed messaging only when measured throughput requires it.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md`, `docs/traceability/SourceTraceabilityMatrix.md`, `docs/research/KnowledgeGraph.md`, and all generated backlog stories.
