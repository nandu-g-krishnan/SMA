# System Architecture

Layered modular monolith or service-ready architecture: Angular client, ASP.NET Core APIs, PostgreSQL, SignalR realtime gateway, Python ML workers, broker adapter, event bus/outbox, and observability stack.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
