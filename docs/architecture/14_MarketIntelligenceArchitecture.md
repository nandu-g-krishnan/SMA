# 14 Market Intelligence Architecture

## Required Inputs

NIFTY, BANKNIFTY, FINNIFTY, MIDCAP, SMALLCAP, GIFT NIFTY, India VIX, USDINR, gold, silver, crude, S&P 500, NASDAQ, Dow, Russell, Hang Seng, Shanghai, Nikkei, DAX, FTSE, FII, DII, sector rotation, market breadth, global news, corporate announcements.

## Scoring Engines

| Score | Inputs |
| --- | --- |
| Market Health Score | Breadth, trend, volatility, index participation |
| Regime Score | Trend, volatility, macro, breadth, flows |
| Risk Score | VIX, drawdowns, macro events, global indices, USDINR |
| Sentiment Score | News, events, announcements, LLM sentiment |
| Liquidity Score | Volume, spreads, turnover, delivery, OI |

## Outputs

Market intelligence produces reusable feature-store metrics and explainable dashboard scores consumed by strategies, portfolio, risk, and research.
