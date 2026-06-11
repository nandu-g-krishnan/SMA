# 14 Market Intelligence Architecture

Status: MANDATORY

The Market Intelligence Engine is a first-class architecture module. It converts source-backed market, macro, news, flow, results, and derivatives inputs into reusable feature-store values and explainable strategy context.

## Required Inputs

- News
- Corporate actions
- Quarterly results
- Annual reports
- Concall notes
- Management commentary
- GDP
- CPI
- PMI
- Interest rates
- Fed decisions
- RBI decisions
- Currency
- Bond yields
- Commodity prices
- FII/DII
- Options chain
- OI
- PCR
- Sector rotation
- Market breadth
- NIFTY, BANKNIFTY, FINNIFTY, MIDCAP, SMALLCAP, GIFT NIFTY, India VIX
- USDINR, gold, silver, crude
- S&P 500, NASDAQ, Dow, Russell, Hang Seng, Shanghai, Nikkei, DAX, FTSE

## Scoring Engines

| Score | Inputs |
| --- | --- |
| Market Health Score | Breadth, trend, volatility, index participation |
| Regime Score | Trend, volatility, macro, breadth, flows |
| Risk Score | VIX, drawdowns, macro events, global indices, USDINR |
| Sentiment Score | News, events, announcements, LLM sentiment |
| Liquidity Score | Volume, spreads, turnover, delivery, OI |
| Macro Score | GDP, CPI, PMI, interest rates, central bank decisions, currency, bond yields, commodities |
| News Score | Corporate announcements, results, concalls, management commentary, event classification |
| Confidence Score | Source coverage, data freshness, cross-signal agreement, model confidence |
| Strategy Bias | Market regime, sector strength, macro score, risk score, news score |

## Outputs

- Market regime
- Sector strength
- Macro score
- Risk score
- News score
- Confidence score
- Strategy bias

Every strategy consumes Market Intelligence Engine outputs through feature-store entries or strategy context. No strategy may directly bypass the Feature Store when a market intelligence feature exists.

## Trade Decision Explainability

Every trade must answer:

- Why entered?
- Why exited?
- Which indicators?
- Which signals?
- Which strategy?
- Which market regime?
- Which risk controls?
- Which news contributed?
- Which macro factors contributed?

Traceability chain:

```text
Trade
  -> Execution
  -> Strategy
  -> Signal
  -> Feature
  -> KnowledgeId
  -> PDF Source
  -> Page
```

## Production Admission Rule

No production logic may exist without:

- KnowledgeId
- Source document
- Source page
- Architecture mapping
- Story mapping
- Traceability mapping

This applies to indicators, signals, strategies, risk rules, AI features, market regimes, and execution logic.
