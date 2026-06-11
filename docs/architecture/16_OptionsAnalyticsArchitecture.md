# 16 Options Analytics Architecture

## Required Capabilities

Option chain ingestion, OI buildup, PCR, IV rank, Greeks, payoffs, spreads, straddles, strangles, iron condors, iron butterflies, butterflies, calendar spreads, ratio spreads, synthetic long/short, expiry risk, margin assumptions, and options backtesting.

## Greeks

Delta, Gamma, Theta, Vega, Rho are calculated and stored as feature-store metrics.

## Strategy Support

Long call, long put, covered call, protective put, bull call spread, bear put spread, bull put spread, bear call spread, long/short straddle, long/short strangle, iron condor, iron butterfly, butterfly, calendar spread, ratio spread, synthetic long, synthetic short.

## Risk Integration

Options orders require Greek limits, expiry risk checks, margin checks, max loss validation, and scenario analysis.
