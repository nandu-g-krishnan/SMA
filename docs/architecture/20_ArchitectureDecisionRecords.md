# 20 Architecture Decision Records

## ADR-001: Modular Monolith First

Decision: Build a modular monolith with strong module boundaries before extracting services.

Reason: Faster delivery, simpler operations, lower distributed-system risk.

## ADR-002: PostgreSQL Only

Decision: PostgreSQL is the only system of record.

Reason: Relational integrity, partitioning, indexing, JSONB support, and operational simplicity.

## ADR-003: Queueing Deferred Until Throughput Requires It

Decision: Do not require RabbitMQ for the current 1-3 user single-VPS deployment. Use in-process workflows, PostgreSQL outbox-ready persistence, and Redis-backed coordination where needed.

Reason: Simpler operations. Distributed messaging can be introduced later through Architecture Change Request when measured throughput or reliability needs justify it.

## ADR-004: Redis Community For Cache

Decision: Use Redis Community for latest quotes, short-lived cache, locks, and rate-limit state.

Reason: OSS, fast, operationally familiar.

## ADR-005: Broker Adapter Boundary

Decision: All broker integrations use `IBrokerGateway`.

Reason: Kite must be replaceable by Fyers, Upstox, Interactive Brokers, or Binance without changing application logic.

## ADR-006: Feature Store First

Decision: All reusable indicators, signals, macro metrics, flow metrics, sentiment metrics, option metrics, and AI features are stored in the feature store.

Reason: Prevent duplicated feature logic and enable research/inference consistency.

## ADR-007: OSS Preference

Decision: Prefer open-source dependencies. Paid dependencies require `PaidDependencies.md`.

Reason: Cost control and long-term portability.

## ADR-008: Docker Optional For Current Deployment

Decision: Docker and Docker Compose are optional convenience tooling, not mandatory runtime requirements.

Reason: SMA currently targets local native execution and a single Ubuntu VPS for 1-3 users. Containerization may be introduced later without architecture redesign.

## ADR-009: Knowledge Governance Is Not Simplified

Decision: PDF extraction, OCR extraction, visual chart extraction, Master Knowledge Base, KnowledgeIds, traceability, catalogs, research governance, AI governance, data quality, capital protection, and story governance remain mandatory.

Reason: These artifacts are SMA's core intellectual property and must remain stronger than the simplified runtime infrastructure.
