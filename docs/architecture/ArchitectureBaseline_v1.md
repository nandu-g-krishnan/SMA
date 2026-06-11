# Architecture Baseline v1

Status = LOCKED

## Target Stack

| Layer | Decision |
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

## Approved Delivery Sequence

| Phase | Scope | Gate |
| --- | --- | --- |
| Phase 1 | Foundation Platform | Architecture readiness remains PASS |
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

## Architecture Drift Rule

Future changes to technology stack, solution structure, domain boundaries, data architecture, broker abstraction, AI architecture, or event architecture require an Architecture Change Request before implementation.
