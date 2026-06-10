# Domain Model

Core entities: Instrument, Candle, Tick, IndicatorSeries, PatternInstance, Strategy, Signal, Portfolio, Order, Position, RiskLimit, NewsEvent, ModelRun, BacktestRun.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
