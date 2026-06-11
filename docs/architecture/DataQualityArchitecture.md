# Data Quality Architecture

## Purpose

The SMA platform treats data quality as a precondition for research, backtesting, machine learning, execution, risk, and portfolio decisions.

## Quality Controls

| Control | Required Behavior | Architecture Component | Traceability |
| --- | --- | --- | --- |
| Missing Data | Detect gaps by instrument, timeframe, feed, and session; block dependent calculations when required bars or ticks are absent. | Data Quality Service | Feature Store, Backtesting Engine, Execution Engine |
| Duplicate Ticks | Deduplicate by instrument, timestamp, source, exchange sequence, and price-volume fingerprint. | Market Data Ingestion | Tick Store, Replay Engine |
| Outlier Detection | Flag price, volume, spread, IV, OI, and derived-feature anomalies using rolling thresholds and source-specific constraints. | Data Quality Service | Feature Store, Risk Engine |
| Corporate Actions | Adjust historical OHLCV and derived features for dividends, splits, symbol changes, and corporate events. | Corporate Action Processor | Historical Store, Feature Store |
| Splits | Maintain split-adjusted and raw price series with versioned adjustment factors. | Corporate Action Processor | Backtesting Engine |
| Bonus Issues | Capture bonus ratios, effective dates, adjustment factors, and affected instruments. | Corporate Action Processor | Portfolio Engine |
| Holiday Handling | Use exchange calendars for market sessions, settlement, expiry, and event scheduling. | Calendar Service | Execution Engine, Options Engine |
| Timezone Handling | Store canonical UTC timestamps with exchange-local session metadata. | Time Service | All time-series components |
| Late Data | Mark late arrivals, reprocess affected features, and emit correction events. | Data Reconciliation Service | Event Bus, Feature Store |
| Corrupt Data | Quarantine malformed rows, invalid timestamps, impossible prices, and schema violations. | Data Quality Service | Monitoring, Audit Log |
| Data Validation Rules | Version validation rules and attach rule results to datasets, features, backtests, models, and signals. | Data Quality Registry | Source Traceability Matrix |

## Gate

No indicator, feature, model, strategy, backtest, signal, or execution workflow may consume market data unless its required data-quality checks pass or a governed override is recorded.
