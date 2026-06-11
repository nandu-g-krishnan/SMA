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
| Deployment standard | Local native development; single Ubuntu VPS production |
| Packaging | Docker optional |
| CI/CD | GitHub Actions |

## Deployment Standard v1

| Area | Decision |
| --- | --- |
| Current users | 1-3 |
| Runtime architecture | Modular monolith |
| Development deployment | Local native execution |
| Production deployment | Single Ubuntu VPS |
| Target VPS | 8 vCPU, 16 GB RAM, 200 GB SSD |
| Required runtime components | Angular UI, ASP.NET Core API, PostgreSQL, Redis, SignalR, Python AI Services, Kite Connect |
| Containers | Optional |
| Containerization rule | May be introduced later without architecture redesign |

## Infrastructure Simplification Rule

Current deployment target is 1-3 users.

Do not introduce infrastructure complexity that does not directly improve:

- Trading intelligence
- Market analysis
- Strategy quality
- Risk management
- Execution reliability
- Research capability

Docker is optional.

Kubernetes is not required.

Microservices are not required.

Multi-tenancy is not required.

Enterprise SaaS infrastructure is not required.

The knowledge architecture, AI architecture, traceability, risk controls, data quality, research governance, market intelligence, and PDF-derived master data remain mandatory and may not be simplified.

## Future Scaling Candidates

The following are not required for the current 1-3 user single-VPS deployment and may be evaluated later through Architecture Change Request:

- Docker Compose as mandatory runtime
- Kubernetes
- Service mesh
- Container orchestration
- Multi-region deployment
- Horizontal scaling infrastructure
- Load balancers
- Distributed cache clusters
- Distributed messaging platforms
- API gateway
- Service discovery
- Distributed tracing infrastructure
- Complex event bus
- Kafka
- RabbitMQ clusters
- Cross-service sagas
- Distributed transactions
- Multi-tenant architecture
- Tenant isolation
- Subscription management
- Billing
- Organization management
- Usage metering

## Future Service Extraction Rule

Even though deployment is a modular monolith, these modules must remain isolated so they can become separate services later without rewriting business logic:

- MarketData
- FeatureStore
- Indicators
- Signals
- Strategies
- Risk
- Execution
- Portfolio
- Research
- AI
- MarketIntelligence

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
| Phase 5 | UI, AI, Regime Detection | Model governance required; AI remains mandatory but does not bypass deterministic trading flow |
| Phase 6 | Production Readiness | Monitoring, security, operations, and release gates |

## Architecture Drift Rule

Future changes to technology stack, solution structure, domain boundaries, data architecture, broker abstraction, AI architecture, or event architecture require an Architecture Change Request before implementation.
