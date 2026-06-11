# Capital Protection Readiness Report

Status: PASS

No live order placement may be enabled unless this report remains PASS.

| Check | Required Control | Status |
| --- | --- | --- |
| Max drawdown validated | Portfolio and strategy drawdown limits must be configured and enforced. | PASS |
| Daily loss limits configured | Daily realized and unrealized loss limits must block new risk. | PASS |
| Position sizing engine active | Position sizing must cap trade risk by account, instrument, and strategy. | PASS |
| Circuit breaker active | Platform-level risk circuit breaker must halt trading when critical thresholds fail. | PASS |
| Kill switch active | Operator and automated kill switch must cancel or block orders during unsafe states. | PASS |
| Order validation active | Order intent must pass instrument, quantity, price, session, risk, and authorization checks. | PASS |
| Exposure limits configured | Gross, net, symbol, sector, strategy, and derivative exposure limits must be enforced. | PASS |
| Broker disconnect handling validated | Broker disconnection must stop new orders and trigger reconciliation. | PASS |
| Data feed failure handling validated | Feed failure must mark data stale and block dependent execution paths. | PASS |

