# Architecture Traceability Matrix

No story should be orphaned. Every story maps to at least one architecture component through its initiative, epic, and feature.

| Architecture Component | Initiative | Epic Coverage | Feature Coverage | Story Coverage |
| --- | --- | --- | --- | --- |
| System Foundation | I01 Trading Core Platform | I01-E01 Platform foundation | Repository baseline, product navigation, configuration registry, reference data model | I01-E01-F01-S1 to I01-E01-F04-S3 |
| Trading Workflow | I01 Trading Core Platform | I01-E02 Trading workflow | Trade setup builder, entry exit checklist, signal review, trading calendar | I01-E02-F01-S1 to I01-E02-F04-S3 |
| Instrument Workspace | I01 Trading Core Platform | I01-E03 Instrument workspace | Instrument profile, multi-timeframe chart shell, watchlist manager, annotations | I01-E03-F01-S1 to I01-E03-F04-S3 |
| Trade Journal | I01 Trading Core Platform | I01-E04 Trade journal | Journal schema, trade review, mistake taxonomy, performance tags | I01-E04-F01-S1 to I01-E04-F04-S3 |
| Strategy Governance | I01 Trading Core Platform | I01-E05 Strategy governance | Strategy catalog, strategy approvals, versioning, source traceability | I01-E05-F01-S1 to I01-E05-F04-S3 |
| Angular UX | I01 Trading Core Platform | I01-E06 User experience | Angular shell, dashboard layout, responsive tables, export flows | I01-E06-F01-S1 to I01-E06-F04-S3 |
| Indian Market Data | I02 Market Intelligence Platform | I02-E01 Indian market data | NIFTY, BANKNIFTY, FINNIFTY, India VIX | I02-E01-F01-S1 to I02-E01-F04-S3 |
| Global Market Data | I02 Market Intelligence Platform | I02-E02 Global market data | GIFT NIFTY, US indices, Asia/Europe indices, commodities | I02-E02-F01-S1 to I02-E02-F04-S3 |
| Macro Intelligence | I02 Market Intelligence Platform | I02-E03 Macro intelligence | USDINR, US 10Y, RBI calendar, Fed calendar | I02-E03-F01-S1 to I02-E03-F04-S3 |
| Institutional Flow | I02 Market Intelligence Platform | I02-E04 FII/DII tracking | FII, DII, net flow, flow dashboard | I02-E04-F01-S1 to I02-E04-F04-S3 |
| Breadth Analytics | I02 Market Intelligence Platform | I02-E05 Breadth analytics | Advance/decline, highs/lows, volume breadth, participation | I02-E05-F01-S1 to I02-E05-F04-S3 |
| Sector Rotation | I02 Market Intelligence Platform | I02-E06 Sector rotation | Sector map, relative strength, rotation signal, sector regime | I02-E06-F01-S1 to I02-E06-F04-S3 |
| Indicator Engine | I03 Technical Analysis Platform | I03-E01 Indicator engine | SMA, EMA, WMA, VWAP, MACD, RSI | I03-E01-F01-S1 to I03-E01-F06-S3 |
| Volume Analytics | I03 Technical Analysis Platform | I03-E02 Volume analytics | OBV, A/D, PVT, MFI | I03-E02-F01-S1 to I03-E02-F04-S3 |
| Trend Theory | I03 Technical Analysis Platform | I03-E03 Trend theory | Dow trends, Elliott wave | I03-E03-F01-S1 to I03-E03-F04-S3 |
| Candlestick Analytics | I03 Technical Analysis Platform | I03-E04 Candlestick analytics | Doji, hammer, engulfing, morning/evening star | I03-E04-F01-S1 to I03-E04-F04-S3 |
| Technical Signal Service | I03 Technical Analysis Platform | I03-E05 Technical signal service | ADX, ATR, Bollinger Bands, Parabolic SAR | I03-E05-F01-S1 to I03-E05-F04-S3 |
| Indicator Dashboards | I03 Technical Analysis Platform | I03-E06 Indicator dashboards | Comparison, overlay, divergence, parameter lab | I03-E06-F01-S1 to I03-E06-F04-S3 |
| Technical Validation | I03 Technical Analysis Platform | I03-E07 Technical validation | TradingView parity, fixtures, tolerance reports, audit | I03-E07-F01-S1 to I03-E07-F04-S3 |
| Options Chain | I04 Options And Futures Platform | I04-E01 Options chain | Chain, OI, PCR, IV rank | I04-E01-F01-S1 to I04-E01-F04-S3 |
| Greeks Analytics | I04 Options And Futures Platform | I04-E02 Greeks analytics | Delta, Gamma, Theta, Vega, Rho | I04-E02-F01-S1 to I04-E02-F05-S3 |
| Options Strategies | I04 Options And Futures Platform | I04-E03 Options strategies | Covered call, protective put, vertical spreads, iron condor | I04-E03-F01-S1 to I04-E03-F04-S3 |
| Futures Analytics | I04 Options And Futures Platform | I04-E04 Futures analytics | Contract master, basis, rollover, cost of carry | I04-E04-F01-S1 to I04-E04-F04-S3 |
| Margin And Expiry Risk | I04 Options And Futures Platform | I04-E05 Margin and expiry risk | SPAN margin model, expiry calendar, assignment risk, MTM risk | I04-E05-F01-S1 to I04-E05-F04-S3 |
| Derivatives Backtesting | I04 Options And Futures Platform | I04-E06 Derivatives backtesting | Payoff engine, options replay, futures replay, slippage model | I04-E06-F01-S1 to I04-E06-F04-S3 |
| Research Workbench | I05 Quantitative Research Platform | I05-E01 to I05-E06 | Dataset registry, factors, regimes, optimization, validation, reports | I05-E01-F01-S1 to I05-E06-F04-S3 |
| AI/ML Platform | I06 AI And Machine Learning Platform | I06-E01 to I06-E06 | Feature store, training, inference, explainability, MLOps, AI assistant | I06-E01-F01-S1 to I06-E06-F04-S3 |
| Portfolio Engine | I07 Portfolio And Risk Platform | I07-E01 Portfolio construction | Holdings, allocation, correlation, rebalancing | I07-E01-F01-S1 to I07-E01-F04-S2 |
| Risk Engine | I07 Portfolio And Risk Platform | I07-E02 to I07-E06 | Risk policy, stops, drawdown, allocation analytics, reporting | I07-E02-F01-S1 to I07-E06-F04-S2 |
| Broker And Execution | I08 Execution And Broker Platform | I08-E01 to I08-E06 | Kite, orders, safety, reconciliation, paper, multi-broker | I08-E01-F01-S1 to I08-E06-F04-S2 |
| News And Sentiment | I09 News And Sentiment Platform | I09-E01 to I09-E06 | Ingestion, announcements, sentiment, events, macro news, alerts | I09-E01-F01-S1 to I09-E06-F04-S2 |
| Backtesting And WFO | I10 Institutional Analytics Platform | I10-E01 to I10-E03 | Event replay, strategy runner, WFO, distributed research | I10-E01-F01-S1 to I10-E03-F04-S2 |
| Monitoring, Security, DevOps | I10 Institutional Analytics Platform | I10-E04 to I10-E06 | Observability, RBAC, audit, GitHub Actions, optional container readiness, testing | I10-E04-F01-S1 to I10-E06-F04-S2 |

## Validation

All 650 stories are covered by the component ranges above. New stories must be added to this matrix before architecture can remain PASS.
