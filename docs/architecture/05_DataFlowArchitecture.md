# 05 Data Flow Architecture

## Realtime Tick Flow

Broker/market data adapter receives ticks, normalizes them, writes raw ticks to PostgreSQL partitions, publishes `TickReceived`, updates Redis latest quote cache, and streams updates through SignalR.

## Historical Data Flow

Historical ingestion workers fetch candles, validate gaps, adjust corporate actions, write candles to PostgreSQL, and publish `HistoricalDataImported`.

## Candle Aggregation Flow

Tick streams aggregate into candles by instrument and timeframe. Completed candles write to `market_data.candles`, publish `CandleClosed`, and trigger indicator and pattern calculations.

## Indicator Calculation Flow

Indicator workers consume `CandleClosed` or scheduled recalculation events, compute indicators, write feature-store values, and publish `IndicatorCalculated`.

## Signal Flow

Signal workers consume indicators, patterns, market regime, macro scores, institutional flow, sentiment, and risk context. They create explainable signals and publish `SignalGenerated`.

## Order Flow

Approved strategies produce order intents. Risk Engine validates them. Execution Engine submits approved orders through `IBrokerGateway`, reconciles status, writes fills, updates positions, and publishes execution events.
