# Kite API Master Catalog

Status: PASS

Kite Connect documentation is a first-class source document for broker, reference-data, market-data, and execution integration.

| KnowledgeId | Capability | Description | Epic | Feature | Story | Required Work Items |
| --- | --- | --- | --- | --- | --- | --- |
| SMA-KITE-0001 | Authentication | API credential configuration and login URL generation | I08-E01 | I08-E01-F-KITE | I08-E01-F-KITE-S01 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0002 | Session Management | Request-token exchange, access token state, and expiry hook handling | I08-E01 | I08-E01-F-KITE | I08-E01-F-KITE-S03 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0003 | Instrument APIs | Versioned instrument master import and NSE/BSE mapping | I08-E01 | I08-E01-F-KITE | I08-E01-F-KITE-S06 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0004 | Historical APIs | Historical candle retrieval readiness for later backfill workflows | I02-E01 | Historical Data | STORY-KITE-HISTORICAL-DATA | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0005 | Quote APIs | Quote retrieval readiness for broker market snapshots | I02-E01 | Quote Data | STORY-KITE-QUOTE-DATA | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0006 | LTP APIs | Last traded price retrieval readiness | I02-E01 | LTP Data | STORY-KITE-LTP-DATA | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0007 | WebSocket Streaming | Live tick streaming and subscription management | I08-E01 | I08-E01-F-KITE | I08-E01-F-KITE-S07 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0008 | Reconnect Logic | Reconnect, no-reconnect, error, close, and stale-feed handling | I08-E01 | I08-E01-F-KITE | I08-E01-F-KITE-S08 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0009 | Order APIs | Guarded order placement disabled until paper trading and capital protection pass | I08-E02 | Order Management | I08-E01-F-KITE-S12 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0010 | Position APIs | Position synchronization and reconciliation readiness | I08-E04 | Position Sync | I08-E04-F02-S1 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0011 | Holding APIs | Holdings retrieval and portfolio reconciliation readiness | I08-E04 | Holdings Sync | I08-E01-F-KITE-S11 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0012 | Margin APIs | Margin and exposure validation readiness | I07-E02 | Risk Engine | STORY-KITE-MARGIN-DATA | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0013 | Portfolio APIs | Portfolio ledger and broker reconciliation readiness | I07-E01 | Portfolio Construction | STORY-KITE-PORTFOLIO-DATA | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0014 | GTT APIs | GTT workflow readiness after execution safety gates | I08-E02 | Order Management | STORY-KITE-GTT | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0015 | Rate Limits | Broker rate-limit policy and retry safety | I08-E03 | Rate Limit | I08-E03-F02-S1 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0016 | Error Handling | Broker API error taxonomy, audit, and retry eligibility | I08-E01 | Broker Health | I08-E01-F04-S1 | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0017 | Market Constraints | Exchange session, instrument, and market-state guards | I02-E01 | Indian Market Data | STORY-KITE-MARKET-CONSTRAINTS | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0018 | Exchange Constraints | NSE/BSE exchange constraints and symbol mapping rules | I01-E01 | Reference Data Model | STORY-KITE-EXCHANGE-CONSTRAINTS | Implementation, testing, validation, documentation, operational readiness |
| SMA-KITE-0019 | Broker Constraints | Broker safety, session, and operational limits | I08-E01 | Broker Health | STORY-KITE-BROKER-CONSTRAINTS | Implementation, testing, validation, documentation, operational readiness |

