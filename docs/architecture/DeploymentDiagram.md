# Deployment Diagram

Deployment Standard v1 uses local native execution for development and a single Ubuntu VPS for production.

The production VPS runs Angular UI, ASP.NET Core API, PostgreSQL, Redis, SignalR, Python AI Services, and Kite Connect integration on one machine for 1-3 users.

Docker and Docker Compose are optional convenience tooling. They are not mandatory deployment requirements.

Kubernetes, service mesh, multi-region deployment, multi-tenant SaaS infrastructure, load balancer layers, and distributed messaging clusters are future scaling candidates, not current requirements.

## Required Decisions

- Define data-retention windows for tick, candle, and feature stores.
- Use Redis for cache and realtime coordination; evaluate additional queueing only when measured throughput requires it.
- Define live-trading approval gates for each strategy class.

## Traceability

This architecture must remain linked to `docs/research/DocumentKnowledgeIndex.md` and all generated backlog stories.
