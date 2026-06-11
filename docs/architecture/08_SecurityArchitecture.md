# 08 Security Architecture

## Security Model

Use ASP.NET Core authentication and authorization with RBAC. All commands pass authorization policies before application handlers execute.

## Secrets

Broker tokens, API keys, LLM keys, database credentials, and signing secrets are stored outside code and injected per environment. Secrets are rotated and audited.

## Data Protection

- Encrypt sensitive configuration at rest.
- Use TLS for external and internal HTTP traffic.
- Never log access tokens, broker tokens, order credentials, or PII.
- Use idempotency keys for order workflows.

## Authorization Domains

Admin, Researcher, Trader, Portfolio Manager, Risk Operator, Execution Operator, Viewer.

## Audit

Audit login, configuration changes, strategy approvals, risk overrides, order intents, broker submissions, model promotions, and data-retention operations.
