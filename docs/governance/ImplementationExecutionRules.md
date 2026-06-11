# Implementation Execution Rules

Status: MANDATORY

Priority: P1

## Execution Order

Stories must be implemented in dependency order.

Approved sequence:

1. Phase 1: Foundation Platform
2. Phase 1A: Reference Data Platform
3. Phase 1B: Database Platform
4. Phase 1C: Market Data Platform
5. Phase 1D: Data Quality Validation
6. Phase 2: Feature Store, Indicators, Signals, Strategies, Risk
7. Phase 3: Backtesting, Paper Trading, Execution
8. Phase 3A: Capital Protection Validation
9. Phase 4: Portfolio, Market Intelligence, Options Analytics
10. Phase 5: UI, AI, Regime Detection
11. Phase 6: Production Readiness

No phase may be skipped.

## Forbidden Shortcuts

- No AI before Feature Store.
- AI is mandatory for intelligence and research workflows, but it may not bypass Feature Store, deterministic signals, Risk Engine, or Capital Protection.
- No Strategy implementation before Signal Engine.
- No Execution before Paper Trading.
- No Live Trading before `CapitalProtectionReadinessReport.md` = PASS.
- No Architecture change without `ArchitectureChangeRequest.md`.
- No story closure without local and remote status synchronization, unless GitHub is unavailable.
- No mandatory Docker, Kubernetes, microservices, multi-tenancy, or enterprise SaaS infrastructure for the current 1-3 user deployment.

## Story Implementation Rule

Every PR or story implementation must:

1. Update `github/backlog/StoryRegistry.md`.
2. Update `docs/traceability/ImplementationTraceabilityMatrix.md`.
3. Run Audit.
4. Run Security Validation.
5. Run Acceptance Validation.
6. Run Traceability Validation.
7. Keep GitHub issue status and local story status synchronized.

If GitHub is unavailable, local status remains authoritative.

## Closure Rule

A story cannot move to `github/backlog/Completed/` until all gates pass:

- Audit PASS
- Security Validation PASS
- Acceptance Validation PASS
- Traceability Validation PASS
- Tests PASS
- No Critical vulnerabilities
- No High vulnerabilities
- Documentation updated
- Implementation traceability updated

## Current Target

Current implementation target:

Epic 001 Foundation Platform.

First milestone:

Kite Login to Instrument Sync to Live Tick Stream to PostgreSQL Tick Storage to 1 Minute Candle Generation.

## Runtime Simplicity Rule

Current runtime target is local native development and a single Ubuntu VPS production deployment.

Required runtime components:

- Angular
- ASP.NET Core
- PostgreSQL
- Redis
- SignalR
- Python AI Services
- Kite Connect
- GitHub Actions

Docker and Docker Compose are optional convenience tooling. They are not implementation blockers.
