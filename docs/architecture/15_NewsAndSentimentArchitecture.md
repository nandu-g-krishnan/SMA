# 15 News And Sentiment Architecture

## Components

- Source Connector
- News Normalizer
- Deduplication Engine
- Entity Resolver
- Event Classifier
- Sentiment Classifier
- Credibility Scorer
- Impact Decay Model
- Alert Publisher

## Event Classes

Corporate announcements, earnings, RBI, SEBI, Fed, US CPI, US NFP, sector news, global risk events, broker/exchange events.

## Outputs

Sentiment score, event impact score, credibility score, decay-adjusted score, affected instruments, affected sectors, source trace, and alert metadata.
