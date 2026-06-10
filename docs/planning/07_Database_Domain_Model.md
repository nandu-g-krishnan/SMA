# Database Domain Model

Schemas: reference, market_data, technical_analysis, patterns, fundamentals, derivatives, research, ml, backtesting, portfolio, risk, execution, news, monitoring, administration, audit.

Core entities: Instrument, Candle, Tick, CorporateAction, IndicatorSeries, PatternInstance, ValuationSnapshot, OptionContract, FuturesContract, Strategy, Signal, ModelRun, BacktestRun, Portfolio, Position, OrderIntent, BrokerOrder, Fill, RiskLimit, NewsEvent, AuditEvent.

Every derived table must include source_document_refs, config_version, calculation_version, created_at, correlation_id, and audit_status.
