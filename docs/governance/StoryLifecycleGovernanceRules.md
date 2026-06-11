# Story Lifecycle Governance Rules

Status: MANDATORY

Priority: P1

## Single Story Source Of Truth

The repository backlog is the source of truth for story lifecycle state, closure evidence, and audit history.

Required local backlog structure:

- `github/backlog/Initiatives/`
- `github/backlog/Epics/`
- `github/backlog/Features/`
- `github/backlog/Stories/`
- `github/backlog/Tasks/`
- `github/backlog/Completed/`
- `github/backlog/Archive/`

GitHub Issues and GitHub Project V2 are execution views generated from, or synchronized with, the local backlog.

## Story Registry Requirement

`github/backlog/StoryRegistry.md` must track every local story.

Required columns:

| Story Id | KnowledgeIds | Epic | Feature | GitHub Issue | Local Story File | Status | Implementation Status | Audit Status | Security Status | Acceptance Status | Closure Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Every story must exist locally even when a matching GitHub issue exists.

Example local story files:

- `github/backlog/Stories/STORY-IND-0001.md`
- `github/backlog/Stories/STORY-KITE-0001.md`
- `github/backlog/Stories/STORY-RISK-0001.md`

## Completion Workflow

A story is never closed immediately after implementation.

Required lifecycle:

1. Open
2. In Progress
3. Implementation Complete
4. Audit Review
5. Security Review
6. Acceptance Validation
7. Traceability Validation
8. Ready For Closure
9. Closed

Implementation is not completion.

## Mandatory Audit Stage

After implementation, run:

- Code Review
- Architecture Review
- Knowledge Compliance Review
- Source Compliance Review
- Traceability Review
- Documentation Review
- Testing Review

Generate `docs/validation/StoryAuditReport.md`.

## Mandatory Security Stage

After audit, run:

- Dependency Scan
- SAST Scan
- Secret Scan
- OWASP Review
- Authentication Review
- Authorization Review
- API Security Review
- Input Validation Review

Generate `docs/validation/StorySecurityReport.md`.

## Mandatory Acceptance Stage

Validate:

- Acceptance Criteria
- Definition Of Done
- KnowledgeIds
- PDF Compliance
- Kite Documentation Compliance
- Architecture Compliance
- Testing Compliance

Generate `docs/validation/StoryAcceptanceReport.md`.

## Mandatory Traceability Stage

Verify these mappings exist and are correct:

- KnowledgeId
- Source Document
- Architecture Component
- Epic
- Feature
- Story
- Code Module
- Database Table
- API
- UI Component
- Test

Generate `docs/validation/StoryTraceabilityReport.md`.

## Closure Rule

A story may be closed only if:

- `StoryAuditReport.md` = PASS
- `StorySecurityReport.md` = PASS
- `StoryAcceptanceReport.md` = PASS
- `StoryTraceabilityReport.md` = PASS
- All tests PASS
- No Critical Vulnerabilities
- No High Vulnerabilities
- Documentation Updated
- `ImplementationTraceabilityMatrix.md` Updated

## GitHub Closure Rule

When a story passes all closure gates, update the GitHub Issue:

- Status = Closed
- Add Audit Result
- Add Security Result
- Add Acceptance Result
- Add Traceability Result
- Add Closure Evidence

## Local Closure Rule

When a story passes all closure gates:

1. Move the local story file from `github/backlog/Stories/` to `github/backlog/Completed/`.
2. Update `github/backlog/StoryRegistry.md`.
3. Set `Status = Closed`.

## Vulnerability Rule

A story may not be closed if any of these conditions exist:

- Critical Vulnerability Exists
- High Vulnerability Exists
- Security Scan Failed
- Secrets Detected
- Dependency Risk Exists

## Global Implementation Rule

Codex must enforce this workflow for every implementation story.

Implementation requires audit, security validation, acceptance validation, and traceability validation before closure.

## Final Rule

Every implemented story must have:

- Implementation Evidence
- Audit Evidence
- Security Evidence
- Acceptance Evidence
- Traceability Evidence
- Closure Evidence

before closure is permitted.
