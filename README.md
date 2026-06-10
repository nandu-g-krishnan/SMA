# SMA

SMA is an AI-powered institutional quantitative trading platform planning repository.

This repository currently contains the reference corpus, image/OCR ingestion audits, product and architecture documents, catalogs, initiatives, epics, features, and 650 implementation-ready stories.

## Structure

- `ref/`: supplied PDF corpus
- `research/`: ingestion, visual, OCR, and corpus audit artifacts
- `docs/`: product, architecture, research, catalog, planning, dataset, DDD, and analysis docs
- `github/`: GitHub-ready initiatives, epics, features, stories, and CSV import datasets
- `architecture/`: top-level architecture mirrors

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

## Source Of Truth

The reference PDFs and research audit artifacts are the knowledge core of the application. Implementation should begin only after stories are reviewed and prioritized.
