# Engineering Architecture And Coding Standards

Status: MANDATORY

Priority: P0

These standards apply to every story, task, API, UI component, database change, worker, AI model, indicator, signal, strategy, risk rule, and Kite integration.

## Core Principle

Implementation must follow:

```text
Knowledge
  -> Architecture
  -> Traceability
  -> Implementation
  -> Validation
```

Story text may not override source PDFs, OCR extraction, research notes, Kite documentation, the Master Knowledge Base, architecture baselines, or traceability matrices.

## Product Definition

SMA is a personal AI-assisted quantitative trading operating system for 1-3 users, self-hosted on a single VPS, implemented as a modular monolith with strict module boundaries.

The system optimizes for:

- Trading intelligence
- Market analysis
- Strategy quality
- Risk management
- Execution reliability
- Research capability
- Auditability

It does not optimize for enterprise infrastructure complexity during MVP.

## Mandatory Knowledge Controls

The following remain mandatory and may not be simplified:

- Master Knowledge Base
- KnowledgeIds
- PDF extraction
- OCR extraction
- Visual chart extraction
- Source traceability
- Implementation traceability
- Architecture governance
- Story governance
- Research governance
- AI governance
- Data quality governance
- Capital protection governance

Master data, PDF-derived concepts, OCR artifacts, extracted images, catalogs, and traceability records are authoritative source material and must not be weakened by implementation shortcuts.

## Runtime Standard

Mandatory runtime components:

- Angular
- ASP.NET Core
- PostgreSQL
- Redis
- SignalR
- Kite Connect
- Python AI Services
- GitHub Actions

Optional infrastructure:

- Docker
- Docker Compose

Not required for MVP:

- Kubernetes
- Service mesh
- Microservices
- Kafka
- RabbitMQ clusters
- Multi-tenant SaaS architecture
- Subscription and billing platform
- Enterprise organization management
- Multi-region deployment
- Distributed transactions

## Deployment Standard v1

Development:

- Local native execution
- Mock data permitted before real Kite credentials are supplied
- Secrets must use environment variables or local user-secret storage

Production target:

- Single Ubuntu VPS
- 8 vCPU
- 16 GB RAM
- 200 GB SSD

The VPS runs:

- Angular UI
- ASP.NET Core API
- PostgreSQL
- Redis
- Python AI Services
- Kite Connect integration

Containerization may be introduced later without architecture redesign.

## Modular Monolith Rule

Even when deployed on one machine, these modules must remain isolated in code and contracts:

- Foundation
- ReferenceData
- MarketData
- FeatureStore
- Indicators
- Signals
- Strategies
- Risk
- Execution
- Backtesting
- PaperTrading
- Portfolio
- Options
- Research
- MarketIntelligence
- AI
- Administration

Future extraction path:

```text
Module
  -> Separate Service
```

Business logic must not be coupled to transport, hosting, UI, or persistence details.

## Backend Structure

Backend implementation should preserve clear dependencies:

```text
apps/api/src/SMA.Domain
apps/api/src/SMA.Application
apps/api/src/SMA.Infrastructure
apps/api/src/SMA.Persistence
apps/api/src/SMA.Contracts
apps/api/src/SMA.Shared
apps/api/src/SMA.Api
```

Dependency direction:

```text
Api -> Application -> Domain
Infrastructure -> Application
Persistence -> Application
Contracts -> Shared
```

Domain logic must not depend on ASP.NET Core, Entity Framework, Kite SDKs, Redis clients, HTTP clients, or UI models.

## Frontend Structure

Angular implementation should preserve:

```text
apps/web/src/app/core
apps/web/src/app/shared
apps/web/src/app/features
```

Components should stay thin. Services own IO and state orchestration. Types should be explicit. Avoid `any` unless the source contract is genuinely unknown and validation exists at the boundary.

## API Standards

Every API must define:

- Request DTO
- Response DTO
- Validation
- Error contract
- Swagger/OpenAPI metadata where applicable
- Audit logging
- Correlation ID propagation
- Authorization rule

APIs must not expose persistence entities directly.

## Database Standards

PostgreSQL is the system of record for durable data.

Database changes must define:

- Table purpose
- Ownership module
- Keys and indexes
- Versioning rules where applicable
- Audit fields where applicable
- Retention expectations
- Traceability to stories and KnowledgeIds

## Redis Standards

Redis may be used for cache, realtime state, transient broker/session state, and coordination. Redis must not become the only durable store for trading-critical data.

## Market Data Standards

Market data flow must support:

```text
Provider
  -> Raw Event
  -> Validation
  -> Normalization
  -> Durable Storage
  -> Aggregation
  -> Feature Store
```

Mock providers are allowed before real Kite credentials are available. Mock data must be clearly marked and may not be represented as live broker evidence.

Market data stories must validate:

- Missing ticks
- Duplicate ticks
- Timezone handling
- Holiday handling
- Candle correctness
- Corporate actions
- Splits
- Bonus issues

## Kite Integration Standards

For Kite stories, verify against:

- `docs/KITE/kite documentation.md`
- `docs/master-data/KiteApiMasterCatalog.md`
- Architecture baseline
- Implementation traceability

Validate:

- Authentication
- Token handling
- Session expiry
- Rate limits
- Retry policies
- Reconnect handling
- Error handling

Kite API secrets must never be committed, logged, returned to the UI, or stored in client-side code.

## Feature Store Rule

Indicators, signals, AI models, strategies, and market intelligence must use Feature Store values when available. They must not independently recalculate a feature from raw data when the feature already exists and is valid.

## Trading Safety Rules

No live trading path may bypass:

- Daily loss limits
- Position sizing controls
- Exposure limits
- Circuit breakers
- Kill switch
- Risk validation
- Data quality validation
- Capital protection validation

Capital protection overrides strategy logic.

## AI Standards

AI may assist with market intelligence, research, news/results interpretation, regime assistance, journal analysis, strategy research, and opportunity discovery.

AI may not bypass:

- Deterministic trading core
- Feature Store
- Risk Engine
- Capital Protection
- Model governance
- Approval workflow

## MVP Testing Priority Rule

During MVP, implementation should prioritize working capability and evidence over exhaustive unit-test coverage.

P0 validation remains mandatory:

- Build validation
- Smoke validation
- Integration or contract validation for external boundaries
- Security review
- Acceptance review
- Traceability review
- Documentation evidence

Unit tests are P2 for non-trading foundation stories when the behavior is already covered by build, smoke, and manual validation evidence.

Unit tests remain P0 when implementing:

- Kite authentication/session handling
- Market data ingestion
- Candle aggregation
- Data quality logic
- Feature Store calculations
- Indicators
- Signals
- Strategies
- Risk controls
- Execution controls
- Capital protection
- AI governance logic

If unit tests are deferred, create or update `docs/validation/ManualTestChecklist.md` with exact manual checks and expected results. Do not mark unexecuted tests as PASS.

## Mock Data Rule

Before real Kite credentials are supplied, use mock market data, replay fixtures, and deterministic sample instruments.

Mock-mode stories may close only as mock-mode validated. They may not claim live Kite validation, live market-data validation, live order validation, or production trading readiness.

Real Kite validation begins only when credentials are supplied and the relevant Kite story explicitly requires live API interaction.

## Documentation Standards

Every implementation story must update documentation when behavior, configuration, APIs, data contracts, or operational procedures change.

At minimum, document:

- Configuration
- Commands
- Evidence
- Known limitations
- Mock/live mode distinction
- Traceability references

## Engineering Compliance Gate

Generate or update:

```text
docs/validation/EngineeringStandardsComplianceReport.md
```

The report must include:

- Story Id
- Architecture compliance
- Runtime compliance
- Modular boundary compliance
- Mock/live data mode
- Testing priority decision
- Kite compliance when applicable
- Security compliance
- Traceability compliance
- Result

Story closure requires Engineering Standards Compliance = PASS.
