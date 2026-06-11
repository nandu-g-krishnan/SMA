# SMA

SMA is an AI-powered institutional quantitative trading platform.

The project has moved from architecture/governance into implementation. Architecture Baseline v1 is locked, implementation authorization is approved, and Epic 001 Foundation Platform has started.

## Structure

- `ref/`: supplied PDF corpus
- `research/`: ingestion, visual, OCR, and corpus audit artifacts
- `docs/`: product, architecture, research, catalog, planning, dataset, DDD, and analysis docs
- `github/`: GitHub-ready initiatives, epics, features, stories, and CSV import datasets
- `architecture/`: top-level architecture mirrors
- `apps/api/`: ASP.NET Core API foundation
- `apps/web/`: Angular web foundation
- `docker-compose.yml`: local PostgreSQL, Redis, API, and web runtime

## Governance Gates

- `docs/traceability/SourceTraceabilityMatrix.md`: source-to-story traceability.
- `docs/research/KnowledgeGraph.md`: concept dependency graph.
- `docs/validation/ArchitectureReadinessReport.md`: architecture completion gate.
- `docs/validation/GapAnalysis.md`: mandatory gap closure.
- `docs/validation/StoryCoverageReport.md`: story coverage proof.
- `docs/validation/SourceCoverageReport.md`: source coverage proof.
- `docs/planning/ArchitectureMasterPrompt.md`: architecture-generation prompt.
- `docs/planning/ArchitectureValidationPrompt.md`: post-generation validation prompt.
- `docs/planning/ArchitectureWorkflow.md`: required PDF-to-implementation workflow.
- `docs/architecture/01_SystemArchitecture.md`: architecture phase entry point.
- `docs/architecture/ArchitectureTraceabilityMatrix.md`: architecture component to story coverage.
- `docs/architecture/ArchitectureReadinessReport.md`: architecture phase readiness result.

## Source Of Truth

The reference PDFs and research audit artifacts are the knowledge core of the application. Implementation should begin only after stories are reviewed and prioritized.

## Implementation Baseline

The approved first implementation milestone is:

```text
Kite Login
  -> Instrument Sync
  -> Live Tick Stream
  -> PostgreSQL Tick Storage
  -> 1 Minute Candle Generation
```

Local startup target after SDK/dependency installation:

```powershell
docker compose up --build
```

The API exposes:

- `GET /health/live`
- `GET /health/ready`
- `GET /api/foundation/configuration`
- `POST /api/auth/session`
- `GET /api/reference/instruments/sync/status`
- `GET /api/market-data/milestone`
