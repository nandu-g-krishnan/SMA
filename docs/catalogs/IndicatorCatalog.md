# Indicator Catalog

## SMA

| Field | Detail |
| --- | --- |
| Purpose | Smooth price using an arithmetic mean. |
| Formula | `SMA(n)=sum(close,n)/n` |
| Inputs | period, price source |
| Outputs | average line |
| Bullish Signals | Price closes above rising SMA; short SMA crosses above long SMA. |
| Bearish Signals | Price closes below falling SMA; short SMA crosses below long SMA. |
| Limitations | Lagging and whipsaws in ranges. |
| Best Market Conditions | Trending or mean-reverting markets with clear lookback discipline. |
| Implementation Complexity | Low |
| Related Strategies | trend following, pullback, moving-average crossover |

## EMA

| Field | Detail |
| --- | --- |
| Purpose | Weight recent prices more heavily. |
| Formula | `EMA=today*k + priorEMA*(1-k), k=2/(n+1)` |
| Inputs | period, price source |
| Outputs | responsive average line |
| Bullish Signals | Price reclaims EMA; fast EMA crosses slow EMA. |
| Bearish Signals | Price loses EMA; fast EMA crosses below slow EMA. |
| Limitations | Still lagging; more noise-sensitive than SMA. |
| Best Market Conditions | Momentum trends and swing pullbacks. |
| Implementation Complexity | Low |
| Related Strategies | trend pullback, crossover, trailing stop |

## WMA

| Field | Detail |
| --- | --- |
| Purpose | Emphasize recent data with linear weights. |
| Formula | `WMA=sum(price_i*weight_i)/sum(weight_i)` |
| Inputs | period, weights, source |
| Outputs | weighted average line |
| Bullish Signals | WMA turns up with price above it. |
| Bearish Signals | WMA turns down with price below it. |
| Limitations | Can overreact to short bursts. |
| Best Market Conditions | Short-term trend tracking. |
| Implementation Complexity | Low |
| Related Strategies | momentum continuation |

## VWAP

| Field | Detail |
| --- | --- |
| Purpose | Benchmark intraday fair value weighted by volume. |
| Formula | `VWAP=sum(price*volume)/sum(volume)` |
| Inputs | session, price, volume |
| Outputs | intraday value line |
| Bullish Signals | Price holds above VWAP with rising volume. |
| Bearish Signals | Price rejects VWAP from below or breaks under it. |
| Limitations | Session reset; less useful for multi-day signals unless anchored. |
| Best Market Conditions | Intraday liquid instruments. |
| Implementation Complexity | Medium |
| Related Strategies | intraday mean reversion, institutional execution |

## Anchored VWAP

| Field | Detail |
| --- | --- |
| Purpose | Measure value from a chosen event/date. |
| Formula | `AVWAP=sum(price*volume since anchor)/sum(volume since anchor)` |
| Inputs | anchor, price, volume |
| Outputs | event-anchored value line |
| Bullish Signals | Price holds above AVWAP after breakout/event. |
| Bearish Signals | Price fails below AVWAP after event. |
| Limitations | Anchor selection can be subjective. |
| Best Market Conditions | Post-event trends, swing support/resistance. |
| Implementation Complexity | Medium |
| Related Strategies | event breakout, earnings/announcement trade |

## RSI

| Field | Detail |
| --- | --- |
| Purpose | Measure momentum speed and magnitude. |
| Formula | `RSI=100-100/(1+avgGain/avgLoss)` |
| Inputs | period, source |
| Outputs | 0-100 oscillator |
| Bullish Signals | RSI crosses 50/60, bullish divergence, exits oversold. |
| Bearish Signals | RSI crosses 50/40 down, bearish divergence, exits overbought. |
| Limitations | Overbought can persist in strong trends. |
| Best Market Conditions | Ranges for mean reversion; trends for regime filters. |
| Implementation Complexity | Low |
| Related Strategies | divergence, pullback, range reversal |

## Stochastic RSI

| Field | Detail |
| --- | --- |
| Purpose | Apply stochastic normalization to RSI. |
| Formula | `StochRSI=(RSI-minRSI)/(maxRSI-minRSI)` |
| Inputs | RSI period, stochastic period, smoothing |
| Outputs | 0-1 or 0-100 oscillator |
| Bullish Signals | Cross up from oversold. |
| Bearish Signals | Cross down from overbought. |
| Limitations | Very sensitive; false signals common. |
| Best Market Conditions | Range-bound, fast tactical entries. |
| Implementation Complexity | Medium |
| Related Strategies | short-term reversal |

## Williams %R

| Field | Detail |
| --- | --- |
| Purpose | Locate close relative to recent high-low range. |
| Formula | `%R=(highestHigh-close)/(highestHigh-lowestLow)*-100` |
| Inputs | period |
| Outputs | -100 to 0 oscillator |
| Bullish Signals | Cross above -80 or bullish divergence. |
| Bearish Signals | Cross below -20 or bearish divergence. |
| Limitations | Can stay extreme in trends. |
| Best Market Conditions | Ranges and pullback timing. |
| Implementation Complexity | Low |
| Related Strategies | oversold bounce, overbought fade |

## CCI

| Field | Detail |
| --- | --- |
| Purpose | Identify deviation from typical price mean. |
| Formula | `CCI=(TP-SMA(TP))/(0.015*meanDeviation)` |
| Inputs | period, typical price |
| Outputs | centered oscillator |
| Bullish Signals | Cross above 0 or +100. |
| Bearish Signals | Cross below 0 or -100. |
| Limitations | Thresholds need instrument calibration. |
| Best Market Conditions | Cyclical swings and breakouts. |
| Implementation Complexity | Medium |
| Related Strategies | cycle reversal, momentum breakout |

## MACD

| Field | Detail |
| --- | --- |
| Purpose | Track trend momentum through EMA spread. |
| Formula | `MACD=EMA12-EMA26; signal=EMA9(MACD)` |
| Inputs | fast, slow, signal periods |
| Outputs | MACD line, signal line, histogram |
| Bullish Signals | MACD crosses signal; histogram turns positive. |
| Bearish Signals | MACD crosses below signal; histogram turns negative. |
| Limitations | Late in sideways markets. |
| Best Market Conditions | Trending swings. |
| Implementation Complexity | Low |
| Related Strategies | momentum continuation, divergence |

## ADX

| Field | Detail |
| --- | --- |
| Purpose | Quantify trend strength independent of direction. |
| Formula | `ADX=smoothed DX from +DI/-DI` |
| Inputs | period, high, low, close |
| Outputs | ADX, +DI, -DI |
| Bullish Signals | +DI above -DI with ADX rising. |
| Bearish Signals | -DI above +DI with ADX rising. |
| Limitations | Does not show direction alone. |
| Best Market Conditions | Trend-vs-range regime filtering. |
| Implementation Complexity | Medium |
| Related Strategies | trend qualification |

## ATR

| Field | Detail |
| --- | --- |
| Purpose | Measure realized volatility range. |
| Formula | `ATR=average true range` |
| Inputs | period, high, low, close |
| Outputs | volatility value |
| Bullish Signals | ATR expansion confirms breakout; position sizing normalizes risk. |
| Bearish Signals | ATR expansion against position warns of risk. |
| Limitations | Not directional. |
| Best Market Conditions | All regimes for stops and sizing. |
| Implementation Complexity | Low |
| Related Strategies | volatility stop, position sizing |

## OBV

| Field | Detail |
| --- | --- |
| Purpose | Accumulate volume by close direction. |
| Formula | `OBV=priorOBV +/- volume` |
| Inputs | close, volume |
| Outputs | cumulative volume line |
| Bullish Signals | OBV breaks out before price. |
| Bearish Signals | OBV breaks down before price. |
| Limitations | Volume quality varies across instruments. |
| Best Market Conditions | Accumulation/distribution detection. |
| Implementation Complexity | Low |
| Related Strategies | volume confirmation |

## MFI

| Field | Detail |
| --- | --- |
| Purpose | Volume-weighted RSI style oscillator. |
| Formula | `MFI uses positive/negative money flow ratio.` |
| Inputs | period, high, low, close, volume |
| Outputs | 0-100 oscillator |
| Bullish Signals | Cross up from oversold; bullish divergence. |
| Bearish Signals | Cross down from overbought; bearish divergence. |
| Limitations | Volume anomalies distort readings. |
| Best Market Conditions | Liquid equities and indices. |
| Implementation Complexity | Medium |
| Related Strategies | volume-momentum reversal |

## PVT

| Field | Detail |
| --- | --- |
| Purpose | Volume adjusted by percentage price change. |
| Formula | `PVT=priorPVT+volume*(close-priorClose)/priorClose` |
| Inputs | close, volume |
| Outputs | cumulative flow line |
| Bullish Signals | PVT confirms price breakout. |
| Bearish Signals | PVT diverges lower while price rises. |
| Limitations | Sensitive to bad volume prints. |
| Best Market Conditions | Trend confirmation. |
| Implementation Complexity | Low |
| Related Strategies | accumulation confirmation |

## Accumulation Distribution

| Field | Detail |
| --- | --- |
| Purpose | Estimate buying/selling pressure within candle range. |
| Formula | `ADL += moneyFlowMultiplier*volume` |
| Inputs | high, low, close, volume |
| Outputs | cumulative AD line |
| Bullish Signals | ADL rises while price bases. |
| Bearish Signals | ADL falls while price rises. |
| Limitations | Close-location simplification can mislead. |
| Best Market Conditions | Volume confirmation regimes. |
| Implementation Complexity | Medium |
| Related Strategies | breakout confirmation |

## Bollinger Bands

| Field | Detail |
| --- | --- |
| Purpose | Volatility envelope around moving average. |
| Formula | `middle=SMA; bands=middle +/- k*stdev` |
| Inputs | period, deviation multiplier |
| Outputs | upper, middle, lower bands |
| Bullish Signals | Band squeeze breakout up; reclaim middle band. |
| Bearish Signals | Breakdown from squeeze; lose middle band. |
| Limitations | Band touches are not automatic reversals. |
| Best Market Conditions | Ranges and volatility transitions. |
| Implementation Complexity | Low |
| Related Strategies | squeeze breakout, mean reversion |

## Keltner Channels

| Field | Detail |
| --- | --- |
| Purpose | ATR-based volatility channel. |
| Formula | `middle=EMA; bands=EMA +/- k*ATR` |
| Inputs | EMA period, ATR period, multiplier |
| Outputs | upper, middle, lower channel |
| Bullish Signals | Close above upper channel with ADX confirmation. |
| Bearish Signals | Close below lower channel. |
| Limitations | Less adaptive to statistical extremes than Bollinger. |
| Best Market Conditions | Trend continuation. |
| Implementation Complexity | Medium |
| Related Strategies | channel breakout |

## Donchian Channels

| Field | Detail |
| --- | --- |
| Purpose | Track highest high and lowest low breakout levels. |
| Formula | `upper=max(high,n); lower=min(low,n)` |
| Inputs | period |
| Outputs | upper, lower, midpoint |
| Bullish Signals | Break above upper channel. |
| Bearish Signals | Break below lower channel. |
| Limitations | False breakouts in ranges. |
| Best Market Conditions | Trend-following markets. |
| Implementation Complexity | Low |
| Related Strategies | Turtle breakout |

## Parabolic SAR

| Field | Detail |
| --- | --- |
| Purpose | Trailing stop and trend reversal marker. |
| Formula | `SAR uses extreme point and acceleration factor.` |
| Inputs | step, max step |
| Outputs | dots above/below price |
| Bullish Signals | SAR flips below price. |
| Bearish Signals | SAR flips above price. |
| Limitations | Whipsaws in ranges. |
| Best Market Conditions | Persistent directional trends. |
| Implementation Complexity | Medium |
| Related Strategies | trailing stop |

## Ichimoku

| Field | Detail |
| --- | --- |
| Purpose | Multi-line trend, momentum, support/resistance system. |
| Formula | `Tenkan, Kijun, Senkou spans, Chikou` |
| Inputs | 9/26/52 periods |
| Outputs | cloud and signal lines |
| Bullish Signals | Price above cloud, Tenkan above Kijun, bullish Chikou. |
| Bearish Signals | Price below cloud, Tenkan below Kijun. |
| Limitations | Visually dense; parameter sensitivity. |
| Best Market Conditions | Trend and multi-timeframe context. |
| Implementation Complexity | High |
| Related Strategies | cloud breakout, Kijun pullback |

## Supertrend

| Field | Detail |
| --- | --- |
| Purpose | ATR trailing trend indicator. |
| Formula | `Bands around median price using ATR multiplier.` |
| Inputs | ATR period, multiplier |
| Outputs | trend line/state |
| Bullish Signals | Close flips above Supertrend. |
| Bearish Signals | Close flips below Supertrend. |
| Limitations | Parameter choice drives lag/whipsaw tradeoff. |
| Best Market Conditions | Directional trends. |
| Implementation Complexity | Medium |
| Related Strategies | trend following, trailing stop |

## TRIX

| Field | Detail |
| --- | --- |
| Purpose | Triple-smoothed EMA rate of change. |
| Formula | `TRIX=ROC(EMA(EMA(EMA(close))))` |
| Inputs | period, signal |
| Outputs | oscillator and signal |
| Bullish Signals | TRIX crosses signal above zero. |
| Bearish Signals | TRIX crosses below signal or below zero. |
| Limitations | Lag from triple smoothing. |
| Best Market Conditions | Medium-term trends. |
| Implementation Complexity | Medium |
| Related Strategies | momentum trend |

## ROC

| Field | Detail |
| --- | --- |
| Purpose | Measure percentage price change over lookback. |
| Formula | `ROC=(close-close_n)/close_n*100` |
| Inputs | period |
| Outputs | centered oscillator |
| Bullish Signals | ROC crosses above zero. |
| Bearish Signals | ROC crosses below zero. |
| Limitations | Noisy without smoothing. |
| Best Market Conditions | Momentum regimes. |
| Implementation Complexity | Low |
| Related Strategies | relative strength, momentum ranking |

## Momentum

| Field | Detail |
| --- | --- |
| Purpose | Absolute price change over lookback. |
| Formula | `MOM=close-close_n` |
| Inputs | period |
| Outputs | centered oscillator |
| Bullish Signals | Positive rising momentum. |
| Bearish Signals | Negative falling momentum. |
| Limitations | Scale differs by price level. |
| Best Market Conditions | Momentum continuation. |
| Implementation Complexity | Low |
| Related Strategies | ranking, breakout confirmation |
