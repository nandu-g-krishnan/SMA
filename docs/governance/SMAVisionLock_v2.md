# SMA Vision Lock v2

Status: MANDATORY

## Non-Negotiable Knowledge Layer

The following must never be simplified:

- PDF knowledge extraction
- OCR extraction
- Visual chart extraction
- Master Knowledge Base
- KnowledgeIds
- Source traceability
- Implementation traceability
- Indicator catalog
- Signal catalog
- Feature catalog
- Strategy catalog
- Risk catalog
- Valuation catalog
- Macro catalog
- Market regime catalog
- Research governance
- AI governance
- Data quality
- Capital protection
- Story governance

These are the core intellectual property of SMA.

## Product Identity

SMA is an autonomous AI-assisted quantitative trading operating system.

SMA is not only a charting tool, screener, or backtesting tool.

## Current Runtime Standard

| Area | Decision |
| --- | --- |
| Users | 1-3 |
| Deployment | Single VPS |
| Architecture | Modular monolith |
| Development | Local native execution |
| Database | PostgreSQL |
| Cache | Redis |
| Frontend | Angular |
| Backend | ASP.NET Core |
| Broker | Kite Connect |
| Realtime | SignalR |
| AI | Python AI Services |
| Containers | Optional |

Avoid for now:

- Kubernetes
- Service mesh
- Complex microservices
- Multi-region deployment
- SaaS multi-tenant infrastructure

Architecture must remain future-service-extractable.

## AI Mandatory Rule

AI is mandatory for:

- News interpretation
- Quarterly results analysis
- Concall analysis
- Management commentary analysis
- Macro analysis
- Sector rotation analysis
- Market regime detection
- Research assistance
- Trade journal analysis
- Strategy research
- Strategy ranking
- Opportunity discovery

AI may not bypass deterministic systems.

Mandatory flow:

```text
Data
  -> Feature Store
  -> Indicators
  -> Signals
  -> Strategies
  -> Risk Engine
  -> Capital Protection
  -> Execution Engine
```

AI assists. Risk engine governs.

## Market Data And Intelligence Priority

Continue implementation sequence:

```text
Foundation Platform
  -> Reference Data Platform
  -> Database Platform
  -> Market Data Platform
  -> Tick Storage
  -> 1-Minute Candles
  -> Data Quality
  -> Feature Store
  -> Indicators
  -> Signals
  -> Risk Engine
  -> Backtesting
  -> Paper Trading
  -> Execution
```

Do not jump ahead.

## Live Trading Gates

No live trading until:

- Backtest PASS
- Walk Forward PASS
- Paper Trading PASS
- Daily loss limits configured
- Position sizing active
- Max exposure configured
- Max drawdown validated
- Kill switch active
- Circuit breakers active
- Broker disconnect handling validated
- Feed failure handling validated
- Duplicate order prevention active

## Long-Term Target

The end-state system collects market data, news, results, and macro data; updates features, indicators, and signals; ranks strategies; selects opportunities; validates risk; executes trades; monitors positions; journals outcomes; and improves research while the user is focused elsewhere.

## Final Directive

Knowledge architecture is enterprise grade.

Runtime architecture is modular monolith.

Execution is local first.

GitHub is a synchronization layer.

AI, risk, traceability, capital protection, and PDF knowledge are mandatory.

Optimize for maximum trading intelligence and automation, not maximum infrastructure complexity.
