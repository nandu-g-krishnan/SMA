# 17 Risk Management Architecture

## Risk Controls

Position sizing, stop loss, trailing stop, ATR stop, support/resistance stop, risk/reward, daily loss limit, portfolio heat, max drawdown, VaR, expected shortfall, margin risk, gap risk, options Greek limits, kill switch.

## Pre-Trade Checks

Every order intent must pass account risk, strategy risk, instrument risk, market regime eligibility, margin, position concentration, and kill-switch checks.

## Dynamic Stops

Stop engines can use ATR, support/resistance, percentage risk, volatility change, trailing logic, and strategy-specific invalidation levels.

## Exception Workflow

Risk failures are immutable. Overrides require authorized risk operator approval and full audit.
