# Architecture Master Prompt

Use this prompt only after `docs/planning/Phase0KnowledgeExtractionPrompt.md` has passed. This is the single source-of-truth architecture-generation prompt for SMA.

## Role

You are acting as Lead Enterprise Architect, Quantitative Research Lead, Product Owner, Business Analyst, Solution Architect, Data Architect, ML Architect, and Technical Program Manager for an institutional-grade AI quantitative trading platform.

## Primary Objective

Generate complete architecture documents for SMA using the supplied PDF corpus, OCR artifacts, the Master Trading Knowledge Base, research audits, catalogs, backlog, and traceability controls as source material.

No architecture, story, feature, API, AI model, indicator, strategy, pattern, valuation model, or risk model is complete unless it can be traced back to the supplied PDFs.

Do not run this prompt if Phase 0 knowledge extraction is incomplete.

The platform supports:

- Indian equities
- Swing trading
- Intraday trading
- Futures trading
- Options trading
- Portfolio management
- Market intelligence
- Quantitative research
- AI/ML trading
- Automated execution
- Backtesting
- Walk-forward optimization
- Risk management
- News sentiment
- Global macro analysis

## Technology Constraints

- Frontend: Angular
- Backend: ASP.NET Core
- Database: PostgreSQL
- Broker: Zerodha Kite Connect
- Realtime: SignalR and WebSockets
- AI: OpenAI and Python ML services
- Infrastructure: local native development, single Ubuntu VPS production, GitHub Actions
- Optional packaging: Docker and Docker Compose

## SMA Vision Lock v2

SMA is an autonomous AI-assisted quantitative trading operating system.

It is not only a charting tool, screener, or backtesting tool.

The following must never be simplified:

- PDF knowledge extraction
- OCR extraction
- Visual chart extraction
- Master Knowledge Base
- KnowledgeIds
- Source traceability
- Implementation traceability
- Indicator, signal, feature, strategy, risk, valuation, macro, and market regime catalogs
- Research governance
- AI governance
- Data quality
- Capital protection
- Story governance

These are the core intellectual property of SMA.

## Infrastructure Simplification Rule

Current deployment target is 1-3 users.

Use a modular monolith architecture:

- Angular
- ASP.NET Core
- PostgreSQL
- Redis
- SignalR
- Python AI Services
- Kite Connect

Development deployment is local native execution.

Production deployment is a single Ubuntu VPS with 8 vCPU, 16 GB RAM, and 200 GB SSD.

Docker is optional.

Kubernetes, service mesh, complex microservices, multi-region deployment, and SaaS multi-tenant infrastructure are not required.

Do not introduce infrastructure complexity that does not directly improve trading intelligence, market analysis, strategy quality, risk management, execution reliability, or research capability.

Keep module boundaries explicit so future migration can follow:

```text
Module
  -> Separate Service
```

without rewriting business logic.

## AI Mandatory Rule

AI is mandatory for:

- News interpretation
- Quarterly results analysis
- Concall analysis
- Management commentary analysis
- Macro analysis
- Sector rotation analysis
- Market regime detection
- Research assistance
- Trade journal analysis
- Strategy research
- Strategy ranking
- Opportunity discovery

AI may not bypass deterministic trading systems.

Mandatory production trading flow:

```text
Data
  -> Feature Store
  -> Indicators
  -> Signals
  -> Strategies
  -> Risk Engine
  -> Capital Protection
  -> Execution Engine
```

AI assists. Risk engine governs.

## Required Architecture Outputs

Generate or update:

- `docs/architecture/SystemArchitecture.md`
- `docs/architecture/ContextDiagram.md`
- `docs/architecture/ComponentDiagram.md`
- `docs/architecture/DeploymentDiagram.md`
- `docs/architecture/DataFlowDiagram.md`
- `docs/architecture/DomainModel.md`
- `docs/architecture/DatabaseArchitecture.md`
- `docs/architecture/EventArchitecture.md`
- `docs/architecture/SecurityArchitecture.md`
- `docs/architecture/MLArchitecture.md`
- `docs/architecture/AIGovernanceArchitecture.md`
- `docs/architecture/BacktestingArchitecture.md`
- `docs/architecture/ExecutionArchitecture.md`
- `docs/architecture/MonitoringArchitecture.md`
- `docs/architecture/DataQualityArchitecture.md`
- `docs/architecture/ResearchGovernance.md`

## Mandatory Extensions

Also generate or update:

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
- `docs/master-data/ValuationMasterCatalog.md`
- `docs/master-data/FundamentalMasterCatalog.md`
- `docs/master-data/RiskMasterCatalog.md`
- `docs/master-data/MarketBreadthMasterCatalog.md`
- `docs/master-data/MacroMasterCatalog.md`
- `docs/master-data/MarketRegimeMasterCatalog.md`
- `docs/master-data/MachineLearningMasterCatalog.md`
- `docs/master-data/ExecutionMasterCatalog.md`
- `docs/master-data/KnowledgeExtractionCoverageReport.md`
- `docs/traceability/SourceTraceabilityMatrix.md`
- `docs/traceability/ImplementationTraceabilityMatrix.md`
- `docs/research/KnowledgeGraph.md`
- `docs/research/VisualAndOcrAbsorptionRegister.md`
- `docs/architecture/ResearchWorkbenchArchitecture.md`
- `docs/architecture/FeatureStoreArchitecture.md`
- `docs/architecture/StrategyRegistryArchitecture.md`
- `docs/architecture/MarketRegimeArchitecture.md`
- `docs/architecture/DowTheoryArchitecture.md`
- `docs/architecture/ElliottWaveArchitecture.md`
- `docs/architecture/CandlestickArchitecture.md`
- `docs/architecture/FundamentalAnalysisArchitecture.md`
- `docs/architecture/ValuationArchitecture.md`
- `docs/architecture/InstitutionalFlowArchitecture.md`
- `docs/architecture/GlobalMacroArchitecture.md`
- `docs/validation/ArchitectureReadinessReport.md`
- `docs/validation/ArchitectureCoverageReport.md`
- `docs/validation/StoryCoverageReport.md`
- `docs/validation/SourceCoverageReport.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/CODEOWNERS`
- `.github/dependabot.yml`
- `.github/workflows/`
- `automation/`

## Master Knowledge Base Requirement

All supplied PDFs are authoritative sources.

Before architecture generation:

1. Extract every concept from every PDF.
2. Store every extracted concept in `docs/master-data/MasterKnowledgeBase.md`.
3. Assign every concept a stable `KnowledgeId`.
4. Populate the relevant master catalog in `docs/master-data/`.
5. Map every concept to architecture, backlog, and implementation traceability controls.

The Master Knowledge Base becomes the canonical source of truth.

Every extracted concept receives:

| KnowledgeId | Name | Category | Description | Source Document | Source Page | Dependencies | Related Concepts | Implementation Candidates |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

No concept may be omitted.

No architecture, story, feature, API, model, indicator, signal, or strategy may exist without a `KnowledgeId`.

`docs/master-data/MasterKnowledgeBase.md` must contain real KnowledgeIds before architecture generation. Empty scaffold rows mean architecture generation must stop.

The required master catalogs are:

- Indicator master catalog
- Pattern master catalog
- Candlestick master catalog
- Strategy master catalog
- Signal master catalog
- Feature master catalog
- Options master catalog
- Futures master catalog
- Valuation master catalog
- Fundamental master catalog
- Risk master catalog
- Market breadth master catalog
- Macro master catalog
- Market regime master catalog
- Machine learning master catalog
- Execution master catalog

## Concept Normalization Requirement

Every extracted concept must be normalized in `docs/master-data/CanonicalConceptRegistry.md`.

Different spellings, abbreviations, punctuation variants, and document-specific names must map to one canonical concept.

Example:

- `RSI`
- `Relative Strength Index`
- `R.S.I.`

These must become one canonical concept.

`CanonicalConceptRegistry.md` must include:

| KnowledgeId | Canonical Name | Aliases | Category | Source References |
| --- | --- | --- | --- | --- |

No duplicate concept may generate duplicate architecture, story, signal, feature, or implementation objects.

## Signal Master Catalog Requirement

Signals are first-class objects in the AI trading platform.

Generate `docs/master-data/SignalMasterCatalog.md`.

Examples include:

- RSI oversold
- MACD bullish crossover
- ADX trend strength
- Breakout confirmed
- PCR extreme
- Long build-up
- Short covering

Every signal must trace to a `KnowledgeId`, source document, source page, inputs, trigger rule, confirmation rule, related feature, related strategy, and risk control.

## Feature Master Catalog Requirement

Features are reusable inputs for machine learning, strategy evaluation, signal generation, and risk controls.

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

Every feature must trace to a `KnowledgeId`, source document, source page, inputs, calculation, frequency, storage target, and consumers.

## Knowledge Extraction Coverage Requirement

Generate `docs/master-data/KnowledgeExtractionCoverageReport.md`.

Use this schema:

| PDF | Pages | Concepts Extracted | Charts Reviewed | Tables Reviewed | Coverage % |
| --- | ---: | ---: | ---: | ---: | ---: |

Pass criteria:

- 100% page coverage
- 100% visual coverage
- 100% concept extraction

Architecture generation is blocked until knowledge extraction coverage is 100%.

## Visual Knowledge Absorption Requirement

Many trading PDFs hide source material inside charts, tables, screenshots, infographics, and scanned images.

Generate `docs/research/VisualAndOcrAbsorptionRegister.md`.

For every source document, list:

- Charts analyzed
- Tables analyzed
- Images analyzed
- Infographics analyzed
- Extracted concepts
- Coverage percentage

No document may pass source coverage until visual content has been reviewed and either converted into concepts or explicitly marked as non-applicable.

## Traceability Requirement

Every concept extracted from every supplied PDF must be traceable.

`SourceTraceabilityMatrix.md` must include:

| KnowledgeId | Source Document | Page Reference | Concept | Category | Architecture Component | Initiative | Epic | Feature | Story | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

No concept may be orphaned.

No architecture document may be finalized until all concepts are mapped.

`SourceCoverageReport.md` must include:

| Source PDF | Concept | Architecture Component | Epic | Feature | Story | Status |
| --- | --- | --- | --- | --- | --- | --- |

Coverage must equal 100% before architecture approval and 100% before implementation approval.

## Architecture Coverage Requirement

Generate `docs/validation/ArchitectureCoverageReport.md` and verify:

- Indicators covered
- Patterns covered
- Candlesticks covered
- Strategies covered
- Risk concepts covered
- Valuation covered
- Fundamentals covered
- Options covered
- Futures covered
- Macro covered
- News covered
- AI covered
- Execution covered
- Coverage percentage
- Missing items
- Recommendations

## Story Coverage Requirement

Generate `docs/validation/StoryCoverageReport.md` and verify every extracted concept has:

- Epic
- Feature
- Story
- Task

## Implementation Traceability Requirement

Generate `docs/traceability/ImplementationTraceabilityMatrix.md` with:

| KnowledgeId | Source Document | Architecture Component | Initiative | Epic | Feature | Story | Code Module | API | Database Table | UI Component | Test Case | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Implementation coverage is 0% until code modules, APIs, database tables, UI components, and tests are mapped to KnowledgeIds.

No implementation may proceed without traceability.

## Feature Gate

No feature may be developed until:

- Knowledge source exists
- Story exists
- Architecture component exists
- Traceability exists

## Feature Verification Requirement

Whenever a story is selected:

1. Find related KnowledgeIds.
2. Find source PDFs and page references.
3. Validate architecture coverage.
4. Validate implementation coverage.
5. Generate a verification report before implementation begins.

## Knowledge Preservation Requirement

`KnowledgeGraph.md` must connect:

- Indicators
- Patterns
- Strategies
- Options concepts
- Fundamental concepts
- Valuation concepts
- Risk concepts
- Macro concepts
- ML concepts

The graph must show dependencies between concepts, features, signals, strategies, models, and risk controls.

## Research Workbench Requirement

Architecture must include a Research Workbench supporting:

- Strategy research
- Hypothesis testing
- Dataset management
- Experiment tracking
- Model comparison
- Parameter optimization
- Walk-forward testing
- Monte Carlo analysis

The platform must support continuous research, not only trading.

## Quant Research Governance Requirement

Generate `docs/architecture/ResearchGovernance.md`.

Every strategy must have:

- Research hypothesis
- Supporting concepts
- Indicators
- Risk controls
- Expected market regime
- Expected edge
- Backtest requirements
- Walk-forward requirements
- Deployment criteria
- Retirement criteria

No strategy may enter the Strategy Registry until research governance evidence exists.

## Feature Store Requirement

Every indicator, signal, breadth metric, macro metric, sentiment metric, FII/DII metric, option metric, and AI-derived feature must be stored and reusable.

Models must never calculate features directly from raw data when a feature-store value is available.

## Strategy Registry Requirement

Every strategy must have:

- Id
- Name
- Version
- Category
- Parameters
- Indicators
- Signals
- Risk profile
- Performance metrics
- Status

Strategies must be deployable independently.

## Data Quality Requirement

Generate `docs/architecture/DataQualityArchitecture.md`.

Cover:

- Missing data
- Duplicate ticks
- Outlier detection
- Corporate actions
- Splits
- Bonus issues
- Holiday handling
- Timezone handling
- Late data
- Corrupt data
- Data validation rules

Every ingestion pipeline, feature calculation, backtest, model training job, and execution decision must declare the data-quality checks it depends on.

## AI Governance Requirement

Generate `docs/architecture/AIGovernanceArchitecture.md`.

Cover:

- Model registry
- Model versioning
- Feature versioning
- Training lineage
- Inference lineage
- Drift detection
- Bias detection
- Model explainability
- Rollback strategy
- Approval workflow

No AI model may be trained, deployed, used for inference, or used for trading decisions unless it has versioned lineage and approval evidence.

## Market Regime Requirement

Architecture must support:

- Trending
- Strong trending
- Weak trending
- Sideways
- High volatility
- Low volatility
- Bull market
- Bear market
- Risk on
- Risk off
- Event driven

Regime classification must influence strategy selection, sizing, risk controls, portfolio allocation, and execution eligibility.

## Technical Analysis Requirement

Architecture must explicitly support and map each to dedicated components:

- Dow Theory
- Elliott Wave
- Candlestick Analysis
- Chart Patterns
- Trend Analysis
- Volume Analysis
- Market Breadth
- Support/Resistance

## Fundamental And Valuation Requirement

Architecture must support:

- P/E
- P/B
- ROE
- ROCE
- Debt metrics
- Growth metrics
- Cash-flow metrics
- Intrinsic value

Valuation models:

- DCF
- Relative valuation
- Dividend discount
- Fair value models

## Institutional Flow Requirement

Architecture must support:

- FII
- DII
- OI
- PCR
- Delivery percentage
- Sector rotation
- Market breadth

All must be converted into reusable signals and feature-store entries.

## Global Macro Requirement

Architecture must support:

- GDP
- CPI
- Interest rates
- PMI
- Employment data
- Central bank decisions

Macro data must connect to market intelligence scoring, regime classification, portfolio allocation, and risk controls.

## GitHub Automation Expansion Requirement

Before creating GitHub automation artifacts, confirm:

- GitHub Organization Name
- Repository Name
- Personal or Organization Repository
- GitHub Project V2 enabled: Yes or No
- Preferred workflow: Feature Branch, GitFlow, or Trunk Based
- Environments: Dev, QA, UAT, Prod, or Custom
- Story point scale
- Sprint length
- Iteration structure

Generate:

- `.github/ISSUE_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/CODEOWNERS`
- `.github/dependabot.yml`
- `.github/workflows/`
- GitHub issue forms
- GitHub Project V2 configuration
- Bootstrap scripts
- Architecture validation workflows
- Coverage validation workflows
- Traceability validation workflows

GitHub automation must create or validate issue templates, pull request templates, code ownership, dependency updates, labels, milestones, project fields, Project V2 setup, architecture gates, coverage gates, and traceability gates.

## Final Rule

Do not begin implementation planning or code generation until:

- `ArchitectureReadinessReport.md` = PASS
- `StoryCoverageReport.md` = 100%
- `SourceCoverageReport.md` = 100%
- `SourceTraceabilityMatrix.md` = Complete
- `MasterKnowledgeBase.md` = Complete
- `CanonicalConceptRegistry.md` = Complete
- `SignalMasterCatalog.md` = Complete
- `FeatureMasterCatalog.md` = Complete
- `KnowledgeExtractionCoverageReport.md` = 100%
- `ArchitectureCoverageReport.md` = 100%
- `ImplementationTraceabilityMatrix.md` exists with all selected implementation items mapped
- `VisualAndOcrAbsorptionRegister.md` = 100%
- `ResearchGovernance.md` exists and covers every strategy
- `DataQualityArchitecture.md` exists
- `AIGovernanceArchitecture.md` exists

If any gate fails, generate `docs/validation/GapAnalysis.md` and stop.
