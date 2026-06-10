# Global Macro Architecture

Global macro data must connect to market intelligence scoring and regime classification.

## Required Inputs

GDP, CPI, interest rates, PMI, employment data, central bank decisions, USDINR, US 10Y yield, crude oil, gold, silver, S&P 500, NASDAQ, Dow Jones, Russell 2000, Shanghai Composite, Hang Seng, Nikkei, DAX, FTSE, RBI events, Fed events, US CPI, and US NFP.

## Components

- Macro Calendar
- Macro Data Ingestion
- Central Bank Event Classifier
- Macro Surprise Scorer
- Global Risk Score
- Market Intelligence Score
- Regime Integration

## Scoring Contract

Macro scores must include metric, release timestamp, expected value where available, actual value, surprise score, market relevance, affected instruments/sectors, confidence, and decay function.
