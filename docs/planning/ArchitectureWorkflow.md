# Architecture Workflow

Use this sequence for SMA:

```text
PDFs
  ↓
Story Generation
  ↓
Architecture Master Prompt
  ↓
Architecture Documents
  ↓
Architecture Validation Prompt
  ↓
Gap Analysis
  ↓
Implementation Planning
  ↓
Implementation
```

## Workflow Gates

Implementation planning is blocked until:

- `docs/validation/ArchitectureReadinessReport.md` is PASS.
- `docs/validation/StoryCoverageReport.md` confirms 100% story coverage.
- `docs/validation/SourceCoverageReport.md` confirms 100% source coverage.
- `docs/traceability/SourceTraceabilityMatrix.md` is complete.
- `docs/research/KnowledgeGraph.md` connects all required concept categories.

## Prompt Usage

1. Run `docs/planning/ArchitectureMasterPrompt.md` to generate or refresh architecture.
2. Run `docs/planning/ArchitectureValidationPrompt.md` to validate architecture.
3. Fix all gaps before implementation.

## Rule

Do not use one prompt to both generate and validate architecture. The separation is intentional and required for quality control.
