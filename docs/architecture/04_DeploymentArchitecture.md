# 04 Deployment Architecture

## Environments

Dev, QA, UAT, and Prod remain logical environments, but current deployment targets local native execution for development and a single Ubuntu VPS for production.

The production VPS runs Angular UI, ASP.NET Core API, PostgreSQL, Redis, SignalR, Python AI Services, and Kite Connect integration on one machine for 1-3 users.

## Runtime Modules

| Module | Runtime |
| --- | --- |
| `trading-api` | ASP.NET Core API and SignalR |
| `market-data` | .NET background worker/module |
| `indicator-engine` | .NET module |
| `pattern-engine` | .NET module |
| `signal-engine` | .NET module |
| `risk-engine` | .NET module |
| `news-intelligence` | .NET or Python module |
| `execution-engine` | .NET module, gated by paper trading and capital protection |
| `backtesting` | .NET module |
| `ai-services` | Python FastAPI |
| `feature-store` | .NET API facade and PostgreSQL-backed feature tables |
| `trading-ui` | Angular frontend |
| `postgres` | PostgreSQL |
| `redis` | Redis Community |
| `observability` | Logs, metrics, health checks; Prometheus/Grafana optional |

## Deployment Strategy

Start with local native development and a single-VPS modular monolith. Docker Compose may be used as optional convenience tooling for PostgreSQL, Redis, or packaging.

Keep module boundaries explicit so each module can become a separate service without rewriting domain logic when scaling requires it.
