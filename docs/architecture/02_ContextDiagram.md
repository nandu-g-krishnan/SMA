# 02 Context Diagram

## External Actors

| Actor | Interaction |
| --- | --- |
| Trader | Reviews signals, places trades, monitors risk and positions. |
| Quant Researcher | Builds hypotheses, datasets, experiments, models, and strategies. |
| Portfolio Manager | Reviews allocation, exposure, portfolio risk, and performance. |
| Admin | Manages users, roles, strategy approvals, broker accounts, secrets, and environments. |
| Risk Operator | Monitors limits, exceptions, kill switches, and live execution controls. |

## External Systems

| System | Role | Integration Style |
| --- | --- | --- |
| Zerodha Kite Connect | Primary broker | `IBrokerGateway` adapter |
| Fyers | Future broker | Future `FyersBrokerGateway` |
| Upstox | Future broker | Future `UpstoxBrokerGateway` |
| Interactive Brokers | Future broker/global markets | Future `InteractiveBrokersGateway` |
| Binance | Future crypto exchange | Future exchange gateway |
| Market data vendors | Historical and realtime data | Adapter plus ingestion workers |
| News providers | News and announcements | News connector abstraction |
| LLM providers | OpenAI/Ollama/DeepSeek/Anthropic/Qwen | Provider abstraction |
| GitHub | Source control and CI/CD | GitHub Actions |

## System Boundary

SMA owns research, features, signals, risk decisions, strategy state, portfolio state, audit trails, and execution intent. External brokers and data providers are replaceable adapters and must not leak SDK-specific logic into domain services.
