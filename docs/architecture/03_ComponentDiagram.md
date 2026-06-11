# 03 Component Diagram

## Component Map

| Component | Responsibility | Primary Module |
| --- | --- | --- |
| API Gateway | REST, auth boundary, SignalR hubs | `Trading.Api` |
| Application Layer | CQRS commands/queries, orchestration | `Trading.Application` |
| Domain Layer | Aggregates, entities, value objects, policies | `Trading.Domain` |
| Persistence | PostgreSQL repositories, migrations, outbox | `Trading.Persistence` |
| Market Data | Ticks, candles, instrument master, corporate actions | `Trading.MarketData` |
| Indicator Engine | SMA, EMA, RSI, MACD, ATR, ADX, Bollinger, volume indicators | `Trading.Indicators` |
| Pattern Engine | Candlesticks, chart patterns, Dow, Elliott, support/resistance | `Trading.Patterns` |
| Strategy Registry | Strategy metadata, versions, deployability | `Trading.Strategies` |
| Signal Engine | Signal composition, ranking, explainability | `Trading.Signals` |
| Options Engine | Chains, Greeks, payoffs, strategies, expiry risk | `Trading.Options` |
| Execution Engine | Order intent, safety, broker submission, reconciliation | `Trading.Execution` |
| Portfolio Engine | Holdings, allocation, exposure, performance | `Trading.Portfolio` |
| Risk Engine | Pre-trade checks, stops, sizing, drawdown, limits | `Trading.Risk` |
| News Engine | News ingestion, announcements, entity extraction | `Trading.News` |
| Market Intelligence | Macro, breadth, flows, scores, regimes | `Trading.MarketIntelligence` |
| Backtesting | Replay, WFO, parameter optimization, reports | `Trading.Backtesting` |
| AI/ML | Feature store clients, model registry, inference | `Trading.AI` |
| Admin | Users, roles, approvals, settings | `Trading.Admin` |

## Dependency Rule

Domain and application services depend on abstractions only. Infrastructure implements broker, market data, news, cache, queue, LLM, and external integrations.
