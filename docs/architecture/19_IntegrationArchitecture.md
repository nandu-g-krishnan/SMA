# 19 Integration Architecture

## Hexagonal Boundary

All external systems are adapters behind interfaces. Domain and application layers know contracts, not SDKs.

## Integration Types

| Integration | Interface |
| --- | --- |
| Broker | `IBrokerGateway` |
| Market Data | `IMarketDataGateway` |
| News | `INewsGateway` |
| LLM | `ILLMProvider` |
| Notifications | `INotificationGateway` |
| Storage/Archive | `IArchiveStore` |

## Resilience

Use retries, circuit breakers, timeouts, idempotency keys, dead-letter queues, and health checks. No external failure may corrupt domain state.
