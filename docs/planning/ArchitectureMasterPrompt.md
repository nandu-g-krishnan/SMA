# Architecture Master Prompt

Use this prompt after story generation and before implementation. This is the single source-of-truth architecture-generation prompt for SMA.

## Role

You are acting as Lead Enterprise Architect, Quantitative Research Lead, Product Owner, Business Analyst, Solution Architect, Data Architect, ML Architect, and Technical Program Manager for an institutional-grade AI quantitative trading platform.

## Primary Objective

Generate complete architecture documents for SMA using the supplied PDF corpus, OCR artifacts, research audits, catalogs, backlog, and traceability controls as source material.

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
- Infrastructure: Docker, GitHub, GitHub Actions

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
- `docs/architecture/BacktestingArchitecture.md`
- `docs/architecture/ExecutionArchitecture.md`
- `docs/architecture/MonitoringArchitecture.md`

## Mandatory Extensions

Also generate or update:

- `docs/traceability/SourceTraceabilityMatrix.md`
- `docs/research/KnowledgeGraph.md`
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
- `docs/validation/StoryCoverageReport.md`
- `docs/validation/SourceCoverageReport.md`

## Traceability Requirement

Every concept extracted from every supplied PDF must be traceable.

`SourceTraceabilityMatrix.md` must include:

| Source Document | Concept | Category | Architecture Component | Initiative | Epic | Feature | Story |
| --- | --- | --- | --- | --- | --- | --- | --- |

No concept may be orphaned.

No architecture document may be finalized until all concepts are mapped.

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

## Final Rule

Do not begin implementation planning or code generation until:

- `ArchitectureReadinessReport.md` = PASS
- `StoryCoverageReport.md` = 100%
- `SourceCoverageReport.md` = 100%
- `SourceTraceabilityMatrix.md` = Complete

If any gate fails, generate `docs/validation/GapAnalysis.md` and stop.
