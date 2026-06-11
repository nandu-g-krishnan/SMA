# Phase 0 Knowledge Extraction Prompt

Use this prompt before `docs/planning/ArchitectureMasterPrompt.md`.

## Role

You are acting as Quantitative Research Analyst, Trading Knowledge Engineer, OCR Reviewer, Financial Markets SME, Data Catalog Architect, and Architecture Governance Reviewer for SMA.

## Primary Objective

Extract, normalize, catalog, and validate every concept from every supplied PDF, chart, table, image, infographic, OCR artifact, and visual audit artifact before architecture generation begins.

No architecture generation, story generation, GitHub automation, or implementation planning may proceed until Phase 0 passes.

## Required Inputs

Review:

- `ref/`
- `research/`
- `research/ocr/`
- `research/ingestion-audit/`
- `docs/research/DocumentKnowledgeIndex.md`
- `docs/research/VisualAndOcrAbsorptionRegister.md`
- Existing catalogs under `docs/master-data/`

## Required Outputs

Generate or update:

- `docs/master-data/MasterKnowledgeBase.md`
- `docs/master-data/CanonicalConceptRegistry.md`
- `docs/master-data/IndicatorMasterCatalog.md`
- `docs/master-data/PatternMasterCatalog.md`
- `docs/master-data/CandlestickMasterCatalog.md`
- `docs/master-data/StrategyMasterCatalog.md`
- `docs/master-data/SignalMasterCatalog.md`
- `docs/master-data/FeatureMasterCatalog.md`
- `docs/master-data/OptionsMasterCatalog.md`
- `docs/master-data/FuturesMasterCatalog.md`
- `docs/master-data/RiskMasterCatalog.md`
- `docs/master-data/ValuationMasterCatalog.md`
- `docs/master-data/FundamentalMasterCatalog.md`
- `docs/master-data/MacroMasterCatalog.md`
- `docs/master-data/MarketRegimeMasterCatalog.md`
- `docs/master-data/MachineLearningMasterCatalog.md`
- `docs/master-data/ExecutionMasterCatalog.md`
- `docs/master-data/KnowledgeExtractionCoverageReport.md`
- `docs/research/VisualAndOcrAbsorptionRegister.md`
- `docs/validation/SourceCoverageReport.md`

## Master Knowledge Extraction Requirement

All supplied PDFs are authoritative sources.

Extract every concept from every source document, including text, OCR text, charts, tables, screenshots, diagrams, annotations, examples, formulas, workflows, strategy rules, risk controls, and visual-only material.

Each concept must receive:

| KnowledgeId | Name | Category | Description | Source Document | Source Page | Dependencies | Related Concepts | Implementation Candidates |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

No concept may be omitted.

## Concept Normalization Requirement

Every extracted concept must be normalized.

Different spellings, abbreviations, punctuation variants, and document-specific names must map to one canonical concept.

Examples:

- `RSI`
- `Relative Strength Index`
- `R.S.I.`

These must become one canonical concept with aliases.

Generate `docs/master-data/CanonicalConceptRegistry.md` with:

| KnowledgeId | Canonical Name | Aliases | Category | Source References |
| --- | --- | --- | --- | --- |

## Signal Catalog Requirement

Signals are first-class trading objects.

Generate `docs/master-data/SignalMasterCatalog.md`.

Examples include:

- RSI oversold
- MACD bullish crossover
- ADX trend strength
- Breakout confirmed
- PCR extreme
- Long build-up
- Short covering

Each signal must include:

| KnowledgeId | Signal | Category | Source Document | Source Page | Inputs | Trigger Rule | Confirmation Rule | Risk Control | Related Feature | Related Strategy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Feature Catalog Requirement

Features are reusable model and strategy inputs.

Generate `docs/master-data/FeatureMasterCatalog.md`.

Examples include:

- `RSI_14`
- `ATR_14`
- `MACD_Histogram`
- `PCR`
- `OI_Change`
- `FII_Net`
- `MarketBreadth`
- `SentimentScore`

Each feature must include:

| KnowledgeId | Feature Name | Feature Type | Source Document | Source Page | Inputs | Calculation | Frequency | Storage Target | Consumers | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Visual And OCR Absorption Requirement

Generate or update `docs/research/VisualAndOcrAbsorptionRegister.md`.

For every source document, list:

- Pages reviewed
- Charts analyzed
- Tables analyzed
- Images analyzed
- Infographics analyzed
- Extracted concepts
- Coverage percentage

No document may pass source coverage until visual content has been reviewed.

## Extraction Coverage Requirement

Generate `docs/master-data/KnowledgeExtractionCoverageReport.md`.

Use this schema:

| PDF | Pages | Concepts Extracted | Charts Reviewed | Tables Reviewed | Coverage % |
| --- | ---: | ---: | ---: | ---: | ---: |

Pass criteria:

- 100% page coverage
- 100% visual coverage
- 100% concept extraction

## Phase 0 Pass Criteria

Phase 0 passes only when:

- `MasterKnowledgeBase.md` contains real KnowledgeIds with no empty scaffold rows.
- `CanonicalConceptRegistry.md` exists and maps aliases to canonical concepts.
- `SignalMasterCatalog.md` exists and contains real signal KnowledgeIds.
- `FeatureMasterCatalog.md` exists and contains real feature KnowledgeIds.
- Every master catalog contains real KnowledgeIds and source references.
- `KnowledgeExtractionCoverageReport.md` shows 100% page, visual, and concept coverage.
- `VisualAndOcrAbsorptionRegister.md` shows 100% visual/OCR absorption.
- `SourceCoverageReport.md` shows 100% source coverage.

If any gate fails, keep architecture generation blocked and update `docs/validation/GapAnalysis.md`.
