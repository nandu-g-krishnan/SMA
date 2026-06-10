# Non Functional Requirements

- Availability targets: market-hours services 99.9% with graceful broker degradation.
- Latency targets: realtime tick processing under 250 ms per normalized event under nominal load.
- Security: encrypted secrets, least-privilege access, MFA-ready administration, full audit logs.
- Reliability: idempotent order workflows, reconciliation, retry policies, and kill switches.
- Maintainability: DDD bounded contexts, automated tests, CI gates, observability, and versioned models.
