# Strategy Registry Architecture

Every strategy must be registered, versioned, independently deployable, independently disable-able, and traceable to source concepts.

## Strategy Record

| Field | Requirement |
| --- | --- |
| Id | Stable unique strategy identifier. |
| Name | Human-readable strategy name. |
| Version | Semantic or date-based version for reproducibility. |
| Category | Trend, breakout, mean reversion, options, futures, portfolio, ML, event-driven, or hybrid. |
| Parameters | Versioned parameter schema with defaults and bounds. |
| Indicators | Required feature-store indicators and technical inputs. |
| Signals | Entry, exit, filter, confirmation, and invalidation signals. |
| Risk Profile | Position sizing, stop model, max loss, capital allocation, margin, and drawdown rules. |
| Performance Metrics | Backtest, WFO, paper, and live performance metrics by regime. |
| Status | Draft, Research, Backtesting, Paper, Approved, Live, Disabled, Retired. |

## Deployment Model

Strategies are deployed independently by strategy_id and version. A deployment can target research, paper trading, limited live, or production live. Execution is blocked unless Strategy Registry status is Approved or Live and Risk Engine pre-check passes.

## Required Integrations

- Feature Store for all inputs.
- Research Workbench for experiment history.
- Backtesting Engine for reproducibility.
- Risk Engine for pre-trade limits.
- Execution Engine for order intent only after approval.
- Monitoring for latency, errors, signal frequency, and drift.
