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

## Testing Priority Order

SMA is a trading system, not a CRUD application.

A perfectly unit-tested system can still lose money if market-data flow, indicator calculations, signal generation, strategy logic, risk controls, execution flow, or broker integration fail in combination.

Prioritize system validation, business validation, and trading validation over high unit-test percentages.

P0:

- Integration tests
- End-to-end flow validation
- Business rule validation
- Risk validation
- Data quality validation
- Kite integration validation

P1:

- Unit tests

P2:

- Performance tests

P3:

- Advanced coverage expansion

## Mandatory Trading Flow Coverage

For critical trading flows, require integration tests, scenario tests, historical validation, and paper-trading validation before focusing on unit-test percentages.

Critical flows:

- Market Data
- Feature Store
- Indicators
- Signals
- Strategies
- Risk
- Execution
- Capital Protection

If unit tests are deferred, create or update `docs/validation/ManualTestChecklist.md` with exact manual checks and expected results. Do not mark unexecuted tests as PASS.

## Mock Data Rule

Before real Kite credentials are supplied, use mock market data, replay fixtures, and deterministic sample instruments.

Mock-mode stories may close only as mock-mode validated. They may not claim live Kite validation, live market-data validation, live order validation, or production trading readiness.

Real Kite validation begins only when credentials are supplied and the relevant Kite story explicitly requires live API interaction.

## Documentation Standards

SMA is a trading system, not a documentation system.

Prefer:

- Correct architecture
- Correct calculations
- Correct risk controls
- Correct execution behavior
- Correct integrations

over generating excessive story-level documentation.

Every implementation story must update documentation only when behavior, configuration, APIs, data contracts, architecture, traceability, master data, or operational procedures change.

Allowed document updates when impacted:

- Architecture documents
- Implementation traceability
- Master data
- API docs
- Execution dashboard
- Story registry
- Centralized validation reports

Do not generate new documentation simply because a story was completed.

Documentation should support implementation, not dominate implementation.

Priority order:

1. Knowledge Integrity
2. Architecture Compliance
3. Trading Logic Correctness
4. Risk Protection
5. Data Quality
6. Integration Validation
7. Documentation Updates

## Repository Source Of Truth

The following are authoritative:

- `github/backlog/StoryRegistry.md`
- `docs/implementation/StoryExecutionDashboard.md`
- `docs/implementation/ExecutionMetrics.md`
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `docs/traceability/SourceTraceabilityMatrix.md`

GitHub Issues and GitHub Project V2 are synchronized execution views.

## Centralized Validation Model

Maintain cumulative validation repositories:

- `docs/validation/StoryAuditReport.md`
- `docs/validation/StorySecurityReport.md`
- `docs/validation/StoryAcceptanceReport.md`
- `docs/validation/StoryTraceabilityReport.md`
- `docs/validation/EngineeringStandardsComplianceReport.md`

Each completed story adds or updates an entry with:

- Story Id
- Status
- Audit Result
- Security Result
- Acceptance Result
- Traceability Result
- Timestamp
- Evidence

Do not create separate per-story validation files for:

- StoryAuditReport
- StorySecurityReport
- StoryAcceptanceReport
- StoryTraceabilityReport
- StoryKnowledgeValidationReport

## Story Closure Evidence Rule

For every completed story, store evidence in `github/backlog/StoryRegistry.md`.

Required registry columns:

- Story Id
- KnowledgeIds
- Status
- Implementation Result
- Audit Result
- Security Result
- Acceptance Result
- Traceability Result
- Commit Hash
- GitHub Issue
- Closure Date

## New Closure Gate

A story closes when:

- Knowledge Validation PASS
- Architecture Compliance PASS
- Integration Validation PASS
- Business Validation PASS
- Risk Validation PASS
- Security PASS
- Acceptance PASS
- Traceability PASS
- Engineering Standards PASS
- Documentation Updated if impacted
- ImplementationTraceabilityMatrix Updated
- StoryRegistry Updated

Unit tests are recommended but are not the primary success criterion.

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
- Integration validation result
- Business validation result
- Risk validation result
- Kite compliance when applicable
- Security compliance
- Traceability compliance
- Result

Story closure requires Engineering Standards Compliance = PASS.
