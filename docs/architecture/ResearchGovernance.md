# Research Governance

## Purpose

Every strategy must be treated as a research object before it becomes a deployable trading object.

## Strategy Evidence Schema

| Field | Required Evidence |
| --- | --- |
| Research Hypothesis | A falsifiable statement describing why the strategy should have edge. |
| Supporting Concepts | KnowledgeIds from MasterKnowledgeBase and related catalog entries. |
| Indicators | Indicator and feature KnowledgeIds used by the strategy. |
| Risk Controls | Stop, sizing, exposure, drawdown, and kill-switch controls. |
| Expected Market Regime | Regimes where the strategy should work and regimes where it is disabled. |
| Expected Edge | Source-backed rationale, expected payoff profile, and measured historical behavior. |
| Backtest Requirements | Clean data, transaction costs, slippage, survivorship controls, and replay rules. |
| Walk Forward Requirements | Rolling optimization, out-of-sample validation, parameter stability, and degradation limits. |
| Deployment Criteria | Approval checklist, monitoring, feature availability, risk approval, and rollback plan. |
| Retirement Criteria | Drawdown breach, regime failure, model drift, rule invalidation, or research supersession. |

## Gate

No strategy may enter the Strategy Registry unless its research evidence links to source PDFs, KnowledgeIds, backtest evidence, walk-forward evidence, risk controls, and deployment criteria.
