# Code Analysis

No application code has been created yet. The repository is currently a research, architecture, and implementation-planning dataset.

## Proposed Codebase

- `src/Sma.Api`: ASP.NET Core API
- `src/Sma.Domain`: DDD aggregates, entities, value objects, domain events
- `src/Sma.Infrastructure`: PostgreSQL, broker, news, market-data integrations
- `src/Sma.Workers`: ingestion, backtesting, scheduled jobs
- `src/Sma.ML`: Python ML services and model workflows
- `src/sma-web`: Angular frontend
- `tests`: unit, integration, replay, parity, and end-to-end tests

## First Implementation Slice

Start with reference data, OHLCV ingestion, SMA/EMA/RSI/MACD/ATR calculations, support/resistance detection, portfolio ledger, risk pre-checks, and backtest replay.
