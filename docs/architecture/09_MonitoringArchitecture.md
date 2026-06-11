# 09 Monitoring Architecture

## Observability Stack

OpenTelemetry collects traces and metrics. Prometheus stores metrics. Grafana provides dashboards. Serilog writes structured application logs.

## Required Dashboards

- API health and latency
- SignalR connection health
- Market data freshness
- Tick/candle ingestion lag
- Indicator and feature calculation lag
- Outbox backlog and retry count
- Redis latency and memory use
- Optional queue depth if a distributed queue is introduced later
- PostgreSQL performance
- Broker health
- Order lifecycle
- Risk failures
- Backtesting job health
- AI inference latency
- Model drift
- News ingestion lag

## Alert Classes

Critical alerts include broker outage, stale market data, execution failure spike, risk kill switch, database errors, queue backlog, model drift, and invalid feature-store freshness.
