# 07 Database Architecture

## Database Rule

PostgreSQL is the only system of record. No MongoDB or alternate document database is used.

## Schemas

| Schema | Responsibility |
| --- | --- |
| `reference` | Instruments, exchanges, calendars, corporate actions |
| `market_data` | Ticks, candles, historical data quality |
| `analytics` | Indicators, patterns, signals, regimes |
| `feature_store` | Reusable online/offline features |
| `options` | Option chains, Greeks, payoffs, strategies |
| `portfolio` | Holdings, positions, cash, allocation |
| `risk` | Policies, checks, limits, exceptions |
| `execution` | Order intents, broker orders, fills, reconciliation |
| `news` | News, announcements, entities, sentiment |
| `research` | Datasets, experiments, backtests, WFO, Monte Carlo |
| `ml` | Models, training runs, inference, drift |
| `admin` | Users, roles, settings, approvals |
| `audit` | Audit events, outbox, idempotency |

## Partitioning

Partition ticks by trading date and optionally instrument hash. Partition candles by timeframe and date. Partition option-chain snapshots by expiry and trading date. Archive cold partitions to compressed PostgreSQL tablespaces or external object storage snapshots while retaining queryable summaries.

## Indexing

Primary time-series indexes use `(instrument_id, timestamp)` and `(timestamp, instrument_id)`. Feature-store indexes use `(feature_name, entity_id, timestamp, feature_version)`. Orders and positions index account, strategy, broker order id, and status.

## Audit Strategy

All derived data includes source refs, producer version, calculation version, correlation id, and audit status.
