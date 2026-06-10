# Component Diagram

Components: Market Data, Indicator Engine, Pattern Engine, Strategy Engine, Backtester, Optimizer, Portfolio, Risk, Execution, Broker Integration, News/Sentiment, ML Services, Monitoring, Admin.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
