# Feature Store Architecture

Every indicator, signal, breadth metric, macro metric, sentiment metric, FII/DII metric, option metric, and AI-derived feature must be stored and reusable.

## Rule

Models must never calculate features directly from raw data when a feature-store value is available. Models consume versioned features through the Feature Store API.

## Feature Families

| Family | Examples | Producer | Consumers |
| --- | --- | --- | --- |
| Indicator Features | SMA, EMA, RSI, MACD, ATR, ADX, Bollinger Bands, OBV, MFI | Technical Analysis Engine | Strategies, ML, dashboards, risk |
| Pattern Features | Breakout, pullback, support/resistance, H&S, double top/bottom, wave score | Pattern Recognition Engine | Strategy Registry, Research Workbench |
| Breadth Features | Advance/decline, new highs/lows, volume breadth, participation score | Breadth Analytics Engine | Market Regime, Market Intelligence |
| Macro Features | GDP, CPI, rates, PMI, employment, central bank events, USDINR, US 10Y | Global Macro Engine | Regime, portfolio, risk, ML |
| Sentiment Features | News sentiment, event impact, credibility, decay score | News/Sentiment Engine | Signals, ML, alerts |
| Institutional Flow Features | FII, DII, OI, PCR, delivery percentage, sector rotation | Institutional Flow Engine | Market intelligence, options, regime |
| Option Features | Greeks, IV rank, OI buildup, payoff metrics, expiry risk | Derivatives Engine | Options strategies, risk, ML |
| AI-Derived Features | Regime probability, signal ensemble score, drift score, explainability | ML Platform | Strategy selection, dashboards |

## Storage Contract

Feature records require: feature_id, feature_name, family, entity_id, instrument_id, timeframe, timestamp, value, vector payload where needed, source_document_refs, producer_version, feature_version, quality_status, created_at, and correlation_id.

## Serving Contract

- Offline research reads point-in-time correct feature snapshots.
- Online inference reads latest approved feature values.
- Backtests read historical feature versions, not recalculated ad hoc values.
- Feature lineage is auditable from model output back to source document and raw data.
