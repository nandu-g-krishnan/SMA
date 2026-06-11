# 10 Backtesting Architecture

## Responsibilities

Backtesting replays historical market events, feature-store snapshots, strategy versions, risk policies, fees, slippage, and margin assumptions.

## Components

- Event Replay Engine
- Strategy Runner
- Fee Model
- Slippage Model
- Corporate Action Adjuster
- Walk Forward Optimizer
- Parameter Sweep Engine
- Monte Carlo Engine
- Result Store
- Research Report Generator

## Reproducibility

Every run stores dataset version, feature-store version, strategy version, parameters, costs, slippage, date range, instruments, random seed, and code version.

## Bias Controls

Backtests must include look-ahead guard, survivorship-bias guard, point-in-time feature reads, and out-of-sample reporting.
