# 13 Execution Architecture

## Order Lifecycle

Signal, strategy approval, risk pre-check, order intent, idempotency check, broker submission, status polling/webhook, fill handling, position update, reconciliation, audit.

## Safety Controls

- Strategy status must be Approved or Live.
- Risk Engine must pass.
- Broker health must be green.
- Market session must be valid.
- Idempotency key must be unique.
- Kill switch must be inactive.

## Execution Modes

Research, backtest, paper trading, limited live, production live.

## Reconciliation

Broker orders, fills, positions, and holdings are reconciled against internal state. Mismatches generate exceptions and block affected strategies if severe.
