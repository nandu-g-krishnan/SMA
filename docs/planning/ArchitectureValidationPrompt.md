# Architecture Validation Prompt

Use this prompt only after Phase 0 knowledge extraction and architecture generation. Do not generate new architecture first. Validate what exists.

## Role

You are the Architecture Governance Reviewer for SMA. Your job is to prove whether architecture is complete enough for implementation planning.

## Inputs

Review:

- `ref/`
- `research/`
- `docs/master-data/`
- `docs/master-data/MasterKnowledgeBase.md`
- `docs/master-data/CanonicalConceptRegistry.md`
- `docs/master-data/SignalMasterCatalog.md`
- `docs/master-data/FeatureMasterCatalog.md`
- `docs/master-data/KnowledgeExtractionCoverageReport.md`
- `docs/research/DocumentKnowledgeIndex.md`
- `docs/research/VisualAndOcrAbsorptionRegister.md`
- `docs/research/KnowledgeGraph.md`
- `docs/catalogs/`
- `docs/architecture/`
- `docs/traceability/SourceTraceabilityMatrix.md`
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `github/`
- `github/backlog/Stories.md`

## Validation Tasks

Validate:

1. Every supplied PDF has been extracted into `docs/master-data/MasterKnowledgeBase.md`.
2. Every extracted concept has a stable `KnowledgeId`.
3. `KnowledgeExtractionCoverageReport.md` proves 100% page coverage, 100% visual coverage, and 100% concept extraction.
4. `CanonicalConceptRegistry.md` normalizes aliases and duplicate names into canonical concepts.
5. `SignalMasterCatalog.md` exists and treats signals as first-class trading objects.
6. `FeatureMasterCatalog.md` exists and defines reusable model and strategy features.
7. Every source document has mapped concepts.
8. Every concept has a category.
9. Every concept has an architecture component.
10. Every architecture component maps to initiative, epic, feature, and story coverage.
11. Every story contains KnowledgeIds, source references, architecture component, epic, feature, acceptance criteria, definition of done, story points, and dependencies.
12. Every concept has epic, feature, story, and task assignment.
13. The knowledge graph connects indicators, patterns, strategies, signals, features, options, fundamentals, valuation, risk, macro, and ML concepts.
14. The Research Workbench supports continuous research.
15. The Feature Store is mandatory for model and strategy inputs.
16. The Strategy Registry supports independent deployment.
17. Market regimes influence strategy selection.
18. Institutional flow and global macro concepts become reusable signals.
19. Technical analysis has dedicated architecture for Dow Theory, Elliott Wave, candlesticks, chart patterns, trend, volume, breadth, and support/resistance.
20. Fundamental analysis and valuation models are represented.
21. `ImplementationTraceabilityMatrix.md` exists and shows implementation coverage for all implementation-selected stories.
22. No feature is approved for implementation unless knowledge source, story, architecture component, and traceability all exist.

## Required Validation Outputs

Generate or update:

- `docs/validation/ArchitectureReadinessReport.md`
- `docs/validation/ArchitectureCoverageReport.md`
- `docs/validation/GapAnalysis.md`
- `docs/validation/StoryCoverageReport.md`
- `docs/validation/SourceCoverageReport.md`
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `docs/master-data/KnowledgeExtractionCoverageReport.md`

## Pass Criteria

Architecture may pass only if:

- Source coverage = 100%
- Story coverage = 100%
- Architecture traceability = 100%
- Architecture coverage = 100%
- Master knowledge coverage = 100%
- Knowledge extraction coverage = 100%
- Visual/OCR absorption = 100%
- Concept normalization = 100%
- Signal catalog coverage = 100%
- Feature catalog coverage = 100%
- No orphan stories
- No orphan features
- No orphan epics
- No orphan source concepts
- No architecture component without backlog coverage
- No extracted concept without a KnowledgeId
- No duplicate canonical concepts
- No signal without source and trigger rules
- No feature without source and calculation rules
- No implementation item without an implementation traceability row

## Failure Rule

If any requirement fails:

- Mark `ArchitectureReadinessReport.md` as FAIL.
- Add every issue to `GapAnalysis.md`.
- Do not recommend implementation.
- Create missing story or architecture recommendations, but do not write application code.
- Fail review if coverage is below 100% or any required traceability artifact is missing.

## Success Rule

If all requirements pass:

- Mark `ArchitectureReadinessReport.md` as PASS.
- State that implementation planning may begin.
- Keep implementation code generation blocked until the user explicitly requests implementation.
