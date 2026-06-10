# Context Diagram

Actors: trader, researcher, portfolio manager, administrator. External systems: Zerodha Kite Connect, market data feeds, news providers, OpenAI, macro data, GitHub Actions.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
