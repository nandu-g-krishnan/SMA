# Architecture Change Request

Use this document for any future change to the locked v1 architecture baseline.

## Required Fields

| Field | Requirement |
| --- | --- |
| ACR Id | Stable identifier for the change request |
| Date | Date the change is proposed |
| Requester | Owner of the request |
| Affected Area | Technology stack, solution structure, domain boundaries, data architecture, broker abstraction, AI architecture, or event architecture |
| Current Baseline | Existing v1 decision being changed |
| Proposed Change | Exact replacement decision |
| Source Evidence | KnowledgeIds, architecture docs, operational evidence, or implementation findings |
| Impact | Backlog, traceability, tests, deployment, operations, and risk impact |
| Decision | Approved, rejected, or deferred |
| Approval Evidence | Reviewer and date |

## Open Requests

| ACR Id | Date | Affected Area | Proposed Change | Decision | Approval Evidence |
| --- | --- | --- | --- | --- | --- |
| ACR-0001 | 2026-06-11 | Architecture governance | Lock ArchitectureBaseline_v1 and require ACR for future architecture changes | Approved | Implementation Authorization Plan v1.0 |
| ACR-0002 | 2026-06-11 | Deployment architecture and infrastructure scope | Move Docker, Docker Compose, RabbitMQ clusters, Kubernetes, service mesh, complex microservices, multi-region, and SaaS multi-tenant infrastructure from mandatory runtime requirements to optional or future scaling candidates. Adopt local native development and single Ubuntu VPS modular monolith production for 1-3 users while preserving all knowledge, AI, traceability, data-quality, risk, and capital-protection governance. | Approved | SMA Vision Lock v2 user directive |
