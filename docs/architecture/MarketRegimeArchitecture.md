# Market Regime Architecture

Regime classification must influence strategy selection, risk limits, portfolio allocation, and alert confidence.

## Supported Regimes

| Regime | Inputs | Platform Use |
| --- | --- | --- |
| Trending | ADX, moving averages, highs/lows, breadth | Enables trend-following and breakout strategies. |
| Strong Trending | ADX strength, price above/below key averages, breadth confirmation | Allows larger trend allocation within risk policy. |
| Weak Trending | Directional structure with low confirmation | Reduces size and requires extra confirmation. |
| Sideways | Low ADX, range compression, mean-reversion structure | Favors range and options-income strategies. |
| High Volatility | ATR, VIX, Bollinger width, macro events | Widens stops, reduces size, changes options filters. |
| Low Volatility | Low ATR/VIX, compressed bands | Enables squeeze/watchlist logic. |
| Bull Market | Primary trend, breadth, macro/risk-on context | Raises long strategy priority. |
| Bear Market | Primary downtrend, breadth deterioration, risk-off context | Raises defensive/hedged strategy priority. |
| Risk On | Global indices, FII/DII, rates, commodities, credit context | Increases growth/cyclical allocation. |
| Risk Off | Volatility, USDINR, yields, global selloff, negative flows | Reduces exposure and tightens risk. |
| Event Driven | Earnings, RBI, Fed, CPI, NFP, SEBI, corporate events | Requires event-specific risk and strategy selection. |

## Strategy Selection

The Strategy Registry must declare allowed regimes and blocked regimes. Signal generation can run in any regime, but execution is blocked if the current regime violates strategy policy.
