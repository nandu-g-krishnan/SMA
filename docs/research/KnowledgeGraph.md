# Knowledge Graph

The graph below describes the dependency structure between the knowledge extracted from the supplied PDFs. It is intentionally domain-oriented: implementation may store the graph in PostgreSQL later, but this document is the canonical planning graph.

## Core Nodes

| Node Group | Nodes |
| --- | --- |
| Indicators | SMA, EMA, WMA, VWAP, MACD, MACD Histogram, RSI, Stochastic, Williams %R, ROC, Momentum, ATR, Bollinger Bands, ADX, OBV, Accumulation Distribution, PVT, MFI, Chaikin Volatility, Parabolic SAR, Standard Deviation, TRIX, Ichimoku, Supertrend, Keltner Channels, Donchian Channels |
| Patterns | Support/Resistance, Head and Shoulders, Inverse Head and Shoulders, Double Top, Double Bottom, Triangles, Flags, Pennants, Wedges, Gaps, Breakouts, Pullbacks, Candlesticks |
| Strategies | Trend Following, Breakout, Pullback, Mean Reversion, VWAP Reversion, Bollinger Squeeze, RSI Divergence, MACD Momentum, Sector Rotation, Factor Allocation, Options Income, Volatility Strategies |
| Options Concepts | Option Chain, OI, PCR, IV Rank, Delta, Gamma, Theta, Vega, Rho, Payoff, Expiry, Margin, Spreads, Straddles, Strangles, Iron Condors, Butterflies, Calendar Spreads, Synthetic Positions |
| Fundamental Concepts | Revenue Growth, Earnings Growth, Margins, ROE, ROCE, Debt, Cash Flow, Promoter/Ownership Quality, Sector Tailwinds |
| Valuation Concepts | P/E, P/B, EV/EBITDA, PEG, DCF, Dividend Discount, Relative Valuation, Intrinsic Value, Fair Value |
| Risk Concepts | Stop Loss, Trailing Stop, Position Sizing, Risk/Reward, ATR Stop, Support/Resistance Stop, Portfolio Heat, Drawdown, VaR, Expected Shortfall, Margin Risk, Gap Risk |
| Macro Concepts | GDP, CPI, Interest Rates, PMI, Employment, Central Bank Decisions, USDINR, US 10Y, Commodities, Global Indices, FII/DII, Sector Rotation |
| ML Concepts | Feature Store, Label Generation, Time-Series Validation, Regime Classification, Signal Ensemble, Drift Detection, Explainability, Model Registry |

## Dependency Edges

| From | Relationship | To | Implementation Meaning |
| --- | --- | --- | --- |
| Raw OHLCV | produces | Indicators | Indicator engine writes reusable feature-store values. |
| Raw OHLCV | produces | Patterns | Pattern engine consumes candles and technical pivots. |
| Indicators | confirm | Patterns | Momentum, trend, volatility, and volume features raise/lower pattern confidence. |
| ATR | parameterizes | Stops and Position Sizing | Volatility-aware stop distance and capital risk. |
| ADX | classifies | Trend Strength Regime | Strong/weak trend regime affects strategy selection. |
| Bollinger Bands and ATR | classify | Volatility Regime | High/low volatility affects breakout, mean-reversion, and options strategies. |
| OBV, A/D, PVT, MFI | confirm | Breakout/Pullback Strategies | Volume confirmation becomes a reusable signal. |
| Dow Theory and Elliott Wave | inform | Trend Analysis | Trend hierarchy and wave count become regime and signal context. |
| Support/Resistance | parameterizes | Stops, Entries, Exits | Structural levels influence trade plans and risk. |
| Market Breadth | influences | Market Regime | Broad participation improves confidence in index/sector signals. |
| FII/DII, OI, PCR, Delivery Percentage | produces | Institutional Flow Signals | Institutional flow feeds market intelligence scoring. |
| Macro Metrics | influence | Market Intelligence Score | GDP, CPI, rates, PMI, employment, and central-bank decisions affect regime scoring. |
| Fundamental Metrics | produce | Valuation Features | P/E, P/B, ROE, ROCE, debt, growth, and cash flow feed valuation models. |
| Valuation Models | influence | Portfolio Construction | Intrinsic/fair value affects allocation, watchlists, and risk. |
| Options Greeks | parameterize | Options Strategies | Delta/gamma/theta/vega/rho define payoff, risk, and scenario behavior. |
| Option Chain Metrics | influence | Options Signals | OI, PCR, IV rank, and expiry risk feed derivatives analytics. |
| Feature Store | supplies | ML Models | Models must consume feature-store values instead of recalculating from raw data. |
| Research Workbench | evaluates | Strategies and Models | Hypotheses, experiments, WFO, Monte Carlo, and comparisons drive promotion. |
| Strategy Registry | deploys | Execution Engine | Only approved strategy versions can generate executable orders. |
| Risk Engine | gates | Execution Engine | Orders cannot be submitted without pre-trade risk approval. |
| Monitoring | observes | All Components | Freshness, latency, errors, drift, and coverage metrics are mandatory. |

## Graph Enforcement

- Every new catalog concept must be added as a node or edge.
- Every strategy must link to indicators/signals, risk controls, market regimes, and source documents.
- Every ML model must list its feature-store dependencies and validation edges.
