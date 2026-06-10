# Database Architecture

PostgreSQL schemas for reference, market_data, analytics, strategies, portfolio, execution, risk, news, ml, audit. Use hypertable-ready partitioning patterns for time-series tables.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
