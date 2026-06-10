# Backtesting Architecture

Event-driven backtester replays candles/ticks, applies fees/slippage/margins, records trades/equity curve, supports walk-forward splits and parameter sweeps.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
