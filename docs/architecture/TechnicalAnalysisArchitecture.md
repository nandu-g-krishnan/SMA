# Technical Analysis Architecture

Technical analysis is decomposed into dedicated components so that document concepts do not collapse into one generic indicator service.

| Area | Dedicated Component | Required Coverage |
| --- | --- | --- |
| Dow Theory | Trend Theory Classifier | Primary, secondary, and minor trend classification. |
| Elliott Wave | Wave Count Analyzer | Impulse waves, corrective waves, confidence score. |
| Candlestick Analysis | Candlestick Pattern Engine | Doji, hammer, engulfing, morning/evening star, and extensible pattern catalog. |
| Chart Patterns | Chart Pattern Engine | H&S, inverse H&S, double/triple tops/bottoms, triangles, flags, pennants, wedges, cups, gaps, breakouts, pullbacks. |
| Trend Analysis | Trend Indicator Engine | SMA, EMA, WMA, MACD, ADX, Parabolic SAR, Ichimoku, Supertrend. |
| Volume Analysis | Volume Analytics Engine | OBV, A/D, PVT, MFI, volume confirmation and divergence. |
| Market Breadth | Breadth Analytics Engine | Advance/decline, new highs/lows, volume breadth, participation score. |
| Support/Resistance | Structural Level Engine | Pivot levels, zones, touches, break/retest, stop placement. |

## Output Contract

All technical components write reusable feature-store values and explainable signal records with source references, confidence score, invalidation level, and applicable market regime.
