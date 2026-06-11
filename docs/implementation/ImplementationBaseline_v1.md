# Implementation Baseline v1

Status = LOCKED

## Approved Stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular |
| Backend | ASP.NET Core/.NET |
| Database | PostgreSQL |
| Cache and realtime state | Redis |
| Realtime transport | SignalR |
| AI services | Python FastAPI |
| Broker | Zerodha Kite Connect |
| Packaging | Docker |
| CI/CD | GitHub Actions |

## Approved Phase Order

| Phase | Scope | Gate |
| --- | --- | --- |
| Phase 1 | Foundation Platform | Implementation Authorization = APPROVED |
| Phase 1A | Reference Data Platform | Instrument master, NSE/BSE symbol mapping, Kite instrument sync, expiry calendar, trading calendar, holiday calendar, corporate actions framework, sector/industry classification |
| Phase 1B | Database Platform | PostgreSQL persistence and versioned schemas |
| Phase 1C | Market Data Platform | Kite Login -> Instrument Sync -> Live Tick Stream -> PostgreSQL Tick Storage -> 1 Minute Candle Generation |
| Phase 1D | Data Quality Validation | DataQualityReport = PASS |
| Phase 2 | Feature Store, Indicators, Signals, Strategies, Risk | Data quality gate remains PASS |
| Phase 3 | Backtesting, Paper Trading, Execution | Backtest PASS, Walk Forward PASS, Paper Trading PASS |
| Phase 3A | Capital Protection Validation | CapitalProtectionReadinessReport = PASS |
| Phase 4 | Portfolio, Market Intelligence, Options Analytics | Traceability remains complete |
| Phase 5 | UI, AI, Regime Detection | Model governance required |
| Phase 6 | Production Readiness | Monitoring, security, operations, and release gates |

## First Measurable Milestone

```text
Kite Login
  -> Instrument Sync
  -> Live Tick Stream
  -> PostgreSQL Tick Storage
  -> 1 Minute Candle Generation
```

## Forbidden Shortcuts

- No AI before Feature Store.
- No Strategy Engine before Signal Engine.
- No Execution before Paper Trading.
- No Live Trading before CapitalProtectionReadinessReport = PASS.
- No Architecture changes without ArchitectureChangeRequest approval.

## Implementation Directive

Stop creating governance frameworks unless a gate fails. Start implementation with Epic 001 Foundation Platform, while preserving all authorization gates.
