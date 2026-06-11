# Feature Verification Requirement

Every implementation story must be verified against the PDF-derived master knowledge base before development begins.

## Required Checks

| Check | Required Evidence | Pass Condition |
| --- | --- | --- |
| Knowledge Source Exists | `KnowledgeId` in `docs/master-data/MasterKnowledgeBase.md` | Present and linked to source PDF and page reference |
| Story Exists | Backlog story or GitHub issue | Story references the KnowledgeId |
| Architecture Component Exists | Architecture document and source traceability row | Component maps to the KnowledgeId |
| Traceability Exists | Source and implementation traceability rows | Both matrices contain the KnowledgeId |

## Verification Report

For every selected story, generate a report with:

- Story id
- Related KnowledgeIds
- Source PDFs and page references
- Architecture coverage result
- Implementation coverage result
- Missing evidence
- Decision: Approved for implementation or blocked

## Failure Rule

If any required check fails, implementation is blocked until the missing knowledge, architecture, story, or traceability artifact is created.
