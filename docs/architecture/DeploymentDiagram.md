# Deployment Diagram

Dockerized Angular, ASP.NET Core API, worker services, Python ML services, PostgreSQL, cache/queue, and monitoring deployed through GitHub Actions with environment-specific secrets.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
