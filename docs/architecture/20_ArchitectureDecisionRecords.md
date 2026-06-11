# 20 Architecture Decision Records

## ADR-001: Modular Monolith First

Decision: Build a modular monolith with strong module boundaries before extracting services.

Reason: Faster delivery, simpler operations, lower distributed-system risk.

## ADR-002: PostgreSQL Only

Decision: PostgreSQL is the only system of record.

Reason: Relational integrity, partitioning, indexing, JSONB support, and operational simplicity.

## ADR-003: RabbitMQ For Queueing

Decision: Use RabbitMQ for asynchronous workflows.

Reason: OSS, mature routing, retries, dead-letter queues.

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
