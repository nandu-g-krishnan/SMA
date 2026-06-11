# 01 System Architecture

## Purpose

SMA is a production-grade, institutional-quality AI quantitative trading platform for India-first trading and research. It supports swing, intraday, positional, futures, options, portfolio management, risk management, market intelligence, news/sentiment, quantitative research, machine learning, automated trading, backtesting, and walk-forward optimization.

## Architectural Style

- Clean Architecture
- Domain Driven Design
- CQRS
- Event Driven Architecture
- Modular monolith first
- Microservice ready
- SOLID principles
- Hexagonal architecture for integrations

## Technology Baseline

| Layer | Technology |
| --- | --- |
| Frontend | Angular, Angular Material, Lightweight Charts, NgRx, RxJS, SignalR client |
| Backend | .NET, ASP.NET Core, SignalR, background workers |
| Database | PostgreSQL only |
| Cache | Redis Community |
| Queue | RabbitMQ |
| AI services | Python, FastAPI, scikit-learn, PyTorch, XGBoost, LightGBM, Pandas, NumPy |
| LLM | Provider abstraction for OpenAI, Ollama, DeepSeek, Anthropic, Qwen |
| Monitoring | OpenTelemetry, Prometheus, Grafana, Serilog |
| CI/CD | GitHub Actions, Docker |

## High-Level Runtime

Angular clients call ASP.NET Core APIs and subscribe to SignalR streams. Backend application services coordinate domain modules, PostgreSQL persistence, Redis cache, RabbitMQ events, broker adapters, and Python AI services. Workers process market data, indicators, patterns, signals, risk checks, news, AI jobs, execution, and backtests.

## Core Components

- Market Data
- Indicators
- Patterns
- Strategies
- Signals
- Options Analytics
- Futures Analytics
- Execution
- Portfolio
- Risk
- News
- Market Intelligence
- Backtesting
- AI/ML
- Admin
- Shared Kernel

## Solution Structure

```text
TradingPlatform.sln
src/
  Trading.Api
  Trading.Application
  Trading.Domain
  Trading.Infrastructure
  Trading.Persistence
  Trading.MarketData
  Trading.Indicators
  Trading.Patterns
  Trading.Strategies
  Trading.Signals
  Trading.Options
  Trading.Execution
  Trading.Portfolio
  Trading.Risk
  Trading.News
  Trading.MarketIntelligence
  Trading.Backtesting
  Trading.AI
  Trading.Admin
  Trading.Shared
workers/
  MarketDataWorker
  IndicatorWorker
  PatternWorker
  SignalWorker
  RiskWorker
  NewsWorker
  AiWorker
  ExecutionWorker
  BacktestWorker
frontend/
  trading-ui
python/
  ai-service
  regime-service
  sentiment-service
  forecast-service
  feature-store
```

## Architecture Gates

Architecture is complete only when `ArchitectureTraceabilityMatrix.md` maps every story to at least one architecture component and `ArchitectureReadinessReport.md` reports PASS.
