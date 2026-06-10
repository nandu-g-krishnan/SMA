# Event Architecture

Domain events include TickReceived, CandleClosed, IndicatorCalculated, PatternDetected, SignalGenerated, RiskCheckPassed, OrderSubmitted, FillReceived, PositionReconciled, ModelDriftDetected.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
