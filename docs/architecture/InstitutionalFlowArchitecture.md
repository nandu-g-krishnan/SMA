# Institutional Flow Architecture

Institutional flow must be converted into reusable signals, not treated as dashboard-only data.

## Required Inputs

FII, DII, OI, PCR, delivery percentage, sector rotation, market breadth, index futures/options context, and liquidity measures.

## Signal Outputs

| Signal | Inputs | Consumers |
| --- | --- | --- |
| FII/DII Net Flow Signal | Daily and rolling FII/DII cash and derivatives flows | Market intelligence, regime, portfolio allocation |
| OI Buildup Signal | Price, OI, volume, expiry | Options/futures analytics, strategy filters |
| PCR Signal | Put-call ratio by index/expiry | Options strategy selection, risk dashboard |
| Delivery Accumulation Signal | Delivery percentage, volume, price behavior | Swing strategy filters |
| Sector Rotation Signal | Relative strength, breadth, flows | Portfolio allocation, watchlists |
| Breadth Confirmation Signal | Advance/decline, highs/lows, participation | Regime and breakout confirmation |

## Storage

All institutional-flow signals are feature-store features with source, timestamp, calculation version, confidence, and regime context.
