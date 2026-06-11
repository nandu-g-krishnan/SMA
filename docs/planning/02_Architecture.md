# Architecture

Frontend: Angular. Backend: ASP.NET Core. Database: PostgreSQL. Cache: Redis. Realtime: SignalR and WebSockets. Broker: Zerodha Kite Connect. AI: OpenAI plus Python AI services. Infrastructure: local native development, single Ubuntu VPS production, GitHub Actions. Docker and Docker Compose are optional convenience tooling.

Core contexts: Market Data, Technical Analysis, Pattern Recognition, Fundamental Analysis, Derivatives, Quant Research, AI/ML, Backtesting, Portfolio, Risk, Execution, Broker Integration, News/Sentiment, Monitoring, Administration.

Architecture rule: no signal, model, order, or risk decision is accepted without versioned inputs, calculation trace, source-reference trace, and audit metadata.

Architecture completion rule: no architecture document is final until source traceability, knowledge graph coverage, story coverage, source coverage, and architecture readiness reports prove that every extracted concept has a mapped architecture component and backlog home.

Mandatory architecture modules: Research Workbench, Feature Store, Strategy Registry, Market Regime, Fundamental Analysis, Technical Analysis, Institutional Flow, and Global Macro.

Architecture generation and validation must be separated:

- Use `docs/planning/ArchitectureMasterPrompt.md` for architecture generation.
- Use `docs/planning/ArchitectureValidationPrompt.md` after generation.
- Follow `docs/planning/ArchitectureWorkflow.md` for the project sequence.

Architecture phase output is captured in the numbered document set `docs/architecture/01_SystemArchitecture.md` through `docs/architecture/20_ArchitectureDecisionRecords.md`, plus `docs/architecture/ArchitectureTraceabilityMatrix.md`, `docs/architecture/ArchitectureReadinessReport.md`, and `docs/architecture/PaidDependencies.md`.
