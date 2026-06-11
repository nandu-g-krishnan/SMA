# Architecture Workflow

Use this sequence for SMA:

```text
PDFs
  -> Phase 0 - Knowledge Extraction
  -> Master Knowledge Base
  -> Coverage Validation
  -> Architecture Baseline Lock
  -> Implementation Authorization
  -> Foundation Implementation
  -> Optional GitHub Project Bootstrap
```

## Approved Delivery Sequence

| Phase | Scope | Gate |
| --- | --- | --- |
| Phase 1 | Foundation Platform | ArchitectureReadinessReport = PASS |
| Phase 1A | Reference Data Platform | Instrument master, NSE/BSE symbol mapping, Kite instrument sync, expiry calendar, trading calendar, holiday calendar, corporate actions framework, sector/industry classification |
| Phase 1B | Database Platform | PostgreSQL persistence and versioned schemas |
| Phase 1C | Market Data Platform | Kite Login -> Instrument Sync -> Live Tick Stream -> PostgreSQL Tick Storage -> 1m Candle Generation |
| Phase 1D | Data Quality Validation | DataQualityReport = PASS |
| Phase 2 | Feature Store, Indicators, Signals, Strategies, Risk | Data quality gate remains PASS |
| Phase 3 | Backtesting, Paper Trading, Execution | Backtest PASS, Walk Forward PASS, Paper Trading PASS |
| Phase 3A | Capital Protection Validation | CapitalProtectionReadinessReport = PASS |
| Phase 4 | Portfolio, Market Intelligence, Options Analytics | Traceability remains complete |
| Phase 5 | UI, AI, Regime Detection | Model governance required |
| Phase 6 | Production Readiness | Monitoring, security, operations, and release gates |

## Authorization Gates

Implementation is authorized when:

- `docs/validation/ArchitectureReadinessReport.md` is PASS.
- `docs/validation/SourceCoverageReport.md` is 100%.
- `docs/validation/StoryCoverageReport.md` is 100%.
- `docs/validation/ArchitectureCoverageReport.md` is 100%.
- `docs/validation/KnowledgeOrphanReport.md` reports zero orphans.
- `docs/validation/StoryCompletenessReport.md` is PASS.
- `docs/validation/StrategyReadinessReport.md` is PASS.
- `docs/traceability/ImplementationTraceabilityMatrix.md` is complete.
- `docs/architecture/ArchitectureBaseline_v1.md` is LOCKED.

## GitHub Automation Gate

Remote GitHub Project V2 bootstrap is optional for engineering implementation. It remains blocked until required GitHub configuration is complete in `docs/planning/GitHubProjectConfiguration.md`.

## Rule

Do not expand governance after authorization unless a gate fails. Begin implementation with Epic 001 Foundation Platform and the Kite-to-PostgreSQL market-data milestone.
