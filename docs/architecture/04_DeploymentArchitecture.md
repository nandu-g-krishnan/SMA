# 04 Deployment Architecture

## Environments

Dev, QA, UAT, and Prod are supported. Each environment has isolated PostgreSQL databases, Redis, RabbitMQ, secrets, broker credentials, and observability dashboards.

## Containers

| Container | Runtime |
| --- | --- |
| `trading-api` | ASP.NET Core API and SignalR |
| `market-data-worker` | .NET background worker |
| `indicator-worker` | .NET background worker |
| `pattern-worker` | .NET background worker |
| `signal-worker` | .NET background worker |
| `risk-worker` | .NET background worker |
| `news-worker` | .NET background worker |
| `execution-worker` | .NET background worker |
| `backtest-worker` | .NET background worker |
| `ai-service` | Python FastAPI |
| `regime-service` | Python FastAPI |
| `sentiment-service` | Python FastAPI |
| `forecast-service` | Python FastAPI |
| `feature-store-service` | Python FastAPI or .NET API facade |
| `trading-ui` | Angular static frontend |
| `postgres` | PostgreSQL |
| `redis` | Redis Community |
| `rabbitmq` | RabbitMQ |
| `prometheus` | Metrics |
| `grafana` | Dashboards |

## Deployment Strategy

Start as a Docker Compose deployment for local/dev. Evolve to orchestrated containers when scaling requires independent worker replicas. Keep module boundaries explicit so each worker can become a service without rewriting domain logic.
