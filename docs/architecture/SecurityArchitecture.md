# Security Architecture

Use ASP.NET Core identity/RBAC, encrypted broker tokens, secret rotation, audit logs, request signing for internal services, and environment isolation.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Select queue/cache technology after throughput tests.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
