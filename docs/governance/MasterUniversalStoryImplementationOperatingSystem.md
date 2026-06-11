# SMA Master Universal Story Implementation Operating System

Status: MANDATORY

Priority: P0

Purpose: this is the mandatory operating process for Codex throughout the lifetime of SMA.

Applies to every initiative, epic, feature, story, task, bug, refactor, enhancement, API, UI component, database change, AI model, indicator, signal, strategy, risk rule, and Kite integration.

No implementation may bypass this process.

## Repository Is The Source Of Truth

The repository is authoritative.

GitHub Issues and GitHub Project V2 are synchronized execution views.

If GitHub limits occur:

- Continue locally.
- Never stop implementation.
- Never stop backlog maintenance.
- Never stop traceability.

## Repository Structure

Read and respect:

```text
ref/
research/

docs/
  architecture/
  catalogs/
  governance/
  implementation/
  KITE/
  master-data/
  planning/
  product/
  traceability/
  validation/

github/
  backlog/
    Initiatives/
    Epics/
    Features/
    Stories/
    Tasks/
    Dependencies/
    Completed/
    Archive/

automation/
```

## P0 Rule: Knowledge First

Knowledge is the source of truth.

Stories are implementation vehicles.

A story description alone is never sufficient.

Implementation must always be derived from:

- PDFs
- OCR extraction
- Research documents
- Kite documentation
- Architecture
- Master Knowledge Base
- Catalogs
- Traceability
- Governance
- Acceptance Criteria
- Definition Of Done

## Step 1: Load Project Governance

Read:

```text
docs/governance/*
docs/implementation/*
docs/traceability/*
docs/validation/*
```

Mandatory:

```text
StoryLifecycleGovernanceRules.md
ImplementationExecutionRules.md
MasterUniversalStoryImplementationOperatingSystem.md
ArchitectureBaseline_v1.md
ArchitectureChangeRequest.md
```

Verify:

- Architecture remains LOCKED.
- Story lifecycle rules exist.
- Implementation authorization remains valid.

If governance is invalid, stop.

## Step 2: Load Execution Dashboard

Read:

```text
github/backlog/StoryRegistry.md
docs/implementation/StoryExecutionDashboard.md
docs/implementation/ExecutionMetrics.md
```

Generate or update the dashboard if stale.

Select the highest priority Ready story.

Validate all dependencies are closed.

If dependencies are incomplete:

- Set Status = Blocked.
- Stop.

## Step 3: Load Story

Read:

```text
Story file
Feature file
Epic file
Initiative file
```

Extract:

- Story Id
- KnowledgeIds
- Source Documents
- Source Pages
- Architecture Components
- Acceptance Criteria
- Definition Of Done
- Dependencies
- Risk Controls
- Testing Requirements

## Step 4: Load Traceability

Read:

```text
docs/traceability/SourceTraceabilityMatrix.md
docs/traceability/ImplementationTraceabilityMatrix.md
```

Validate:

- KnowledgeId mappings exist.
- Source mappings exist.
- Architecture mappings exist.
- Story mappings exist.

If traceability is missing, stop and generate remediation.

## Step 5: Load Master Knowledge

Read:

```text
docs/master-data/*
```

Mandatory:

```text
MasterKnowledgeBase.md
CanonicalConceptRegistry.md
IndicatorMasterCatalog.md
PatternMasterCatalog.md
CandlestickMasterCatalog.md
SignalMasterCatalog.md
FeatureMasterCatalog.md
StrategyMasterCatalog.md
RiskMasterCatalog.md
FundamentalMasterCatalog.md
ValuationMasterCatalog.md
MarketBreadthMasterCatalog.md
MacroMasterCatalog.md
MarketRegimeMasterCatalog.md
MachineLearningMasterCatalog.md
ExecutionMasterCatalog.md
KiteApiMasterCatalog.md
```

Read every catalog entry related to the story.

## Step 6: Load Research Sources

Read:

```text
ref/*
research/*
```

Review all source documents mapped to the story.

Mandatory:

- PDFs
- OCR outputs
- Research notes
- Research audits

If source exists, it must be reviewed and cannot be skipped.

## Step 7: Load Architecture

Read relevant documents from:

```text
docs/architecture/*
```

Validate:

- Architecture component exists.
- Architecture baseline compliance exists.

If an architecture change is required:

1. Create or update `ArchitectureChangeRequest.md`.
2. Stop implementation.
3. Wait for approval.

## Step 8: Load Kite Documentation

For any story touching market data, orders, execution, broker, streaming, positions, holdings, portfolio, or authentication, read:

```text
docs/KITE/*
docs/master-data/KiteApiMasterCatalog.md
```

Validate:

- API Contracts
- Authentication
- Rate Limits
- Error Handling
- Reconnect Logic
- Broker Constraints
- Exchange Constraints

## Step 9: Generate Implementation Context

Create:

```text
docs/implementation/ImplementationContext.md
```

Include:

- Story
- KnowledgeIds
- Source Documents
- Architecture Components
- Dependencies
- Files Expected To Change
- Acceptance Criteria
- Definition Of Done
- Risks
- Validation Required
- Testing Required

## Step 10: Knowledge Validation

Generate:

```text
docs/validation/StoryKnowledgeValidationReport.md
```

Verify:

- KnowledgeIds Exist
- Sources Exist
- Source Pages Exist
- Architecture Exists
- Catalog Entries Exist
- Traceability Exists
- Dependencies Exist
- Definitions Exist

If validation fails, stop.

## Step 11: Domain-Specific Validation

### Indicators

Validate formula, inputs, outputs, parameters, signal rules, and storage requirements.

### Signals

Validate trigger rules, dependencies, regime impacts, and risk impacts.

### Strategies

Validate research hypothesis, indicators, signals, risk controls, market regime, backtest criteria, walk-forward criteria, deployment criteria, and retirement criteria.

### Risk

Validate position sizing, drawdown controls, daily loss limits, exposure controls, kill switches, and circuit breakers.

### AI

Validate feature dependencies, model registry, lineage, explainability, and drift controls.

### Kite

Validate API contracts, rate limits, authentication, reconnect logic, and error handling.

## Step 12: Implement

Implement only what the story requires.

Allowed implementation areas:

- Backend
- Frontend
- Database
- API
- Worker
- Signal Engine
- Risk Engine
- Execution Engine
- Feature Store
- Tests
- Documentation

No unrelated changes.

## Step 13: Build Validation

Attempt:

```text
.NET Build
Angular Build
Python Build
Docker Build
Database Validation
```

If the environment is unavailable, generate:

```text
docs/validation/ManualValidationRequired.md
```

It must contain:

- Commands
- Expected Results
- Evidence Required

Never assume success.

## Step 14: Test Validation

Run:

```text
Unit Tests
Integration Tests
Contract Tests
Regression Tests
```

If unable, generate:

```text
docs/validation/ManualTestChecklist.md
```

## Step 15: Audit

Generate:

```text
docs/validation/StoryAuditReport.md
```

Validate:

- Code Review
- Architecture Review
- Knowledge Compliance
- Source Compliance
- Documentation Review
- Testing Review

Result must be PASS or FAIL.

## Step 16: Security

Generate:

```text
docs/validation/StorySecurityReport.md
```

Run:

- Dependency Scan
- Secret Scan
- SAST Scan
- OWASP Review
- Authentication Review
- Authorization Review
- API Security Review
- Input Validation Review

Story fails if:

- Critical Vulnerability Exists
- High Vulnerability Exists
- Secrets Exposed

## Step 17: Acceptance

Generate:

```text
docs/validation/StoryAcceptanceReport.md
```

Validate:

- Acceptance Criteria
- Definition Of Done
- Knowledge Compliance
- PDF Compliance
- Kite Documentation Compliance
- Architecture Compliance
- Testing Compliance

Result must be PASS or FAIL.

## Step 18: Traceability

Generate:

```text
docs/validation/StoryTraceabilityReport.md
```

Verify:

- KnowledgeId
- Source Document
- Architecture Component
- Initiative
- Epic
- Feature
- Story
- Code Module
- Database Table
- API
- UI Component
- Test

Result must be PASS or FAIL.

## Step 19: Update Project Artifacts

Update:

```text
StoryRegistry.md
StoryExecutionDashboard.md
ExecutionMetrics.md
ImplementationTraceabilityMatrix.md
BacklogCoverageReport.md
```

Update story status, progress, evidence links, and validation results.

## Step 20: Story Closure Validation

Story may close only if:

- Knowledge Validation PASS
- Implementation PASS
- Build PASS
- Tests PASS
- Audit PASS
- Security PASS
- Acceptance PASS
- Traceability PASS
- Documentation Updated
- ImplementationTraceabilityMatrix Updated
- No Critical Vulnerabilities
- No High Vulnerabilities

## Step 21: Local Closure

Move the story from:

```text
github/backlog/Stories/
```

to:

```text
github/backlog/Completed/
```

Update:

```text
StoryRegistry.md
StoryExecutionDashboard.md
ExecutionMetrics.md
```

Set Status = Closed.

## Step 22: GitHub Closure

If GitHub is available, update:

- Issue Status
- Project Status
- Audit Result
- Security Result
- Acceptance Result
- Traceability Result
- Closure Evidence

Close the issue.

If GitHub is unavailable:

- Mark sync pending.
- Keep the local repository authoritative.

## Failure Rule

If any stage fails:

- Stop.
- Set Status = Blocked.
- Generate a remediation plan.
- Do not close the story.

## Anti-Shortcut Rules

Never:

- Skip PDF review
- Skip research review
- Skip Kite documentation review
- Skip architecture review
- Skip traceability review
- Skip testing
- Skip security review
- Skip acceptance review
- Skip audit review
- Mark PASS without evidence
- Assume code works without execution
- Invent requirements
- Ignore KnowledgeIds

## Global Completion Chain

Every story must follow:

```text
Knowledge
-> Research
-> Architecture
-> Traceability
-> Story
-> Implementation Context
-> Knowledge Validation
-> Implementation
-> Build
-> Test
-> Audit
-> Security
-> Acceptance
-> Traceability
-> Documentation
-> Local Closure
-> GitHub Closure
```

No step may be skipped.

Implementation is not completion.

Validated, tested, secure, audited, traceable completion is completion.
