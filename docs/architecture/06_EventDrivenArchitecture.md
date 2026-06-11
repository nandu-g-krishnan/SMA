# 06 Event Driven Architecture

## Messaging

PostgreSQL outbox-ready persistence is the primary event reliability pattern for the current single-VPS modular monolith. Redis may be used for short-lived coordination, realtime state, cache, and rate-limit state.

RabbitMQ or another distributed messaging platform is a future scaling candidate and may be introduced through Architecture Change Request when measured throughput, decoupling, or retry needs justify the added operations cost.

## Event Categories

| Category | Events |
| --- | --- |
| Market Data | `TickReceived`, `CandleClosed`, `HistoricalDataImported`, `DataGapDetected` |
| Analytics | `IndicatorCalculated`, `PatternDetected`, `FeatureStored`, `RegimeClassified` |
| Strategy | `SignalGenerated`, `StrategyVersionApproved`, `StrategyDeploymentChanged` |
| Risk | `RiskCheckRequested`, `RiskCheckPassed`, `RiskCheckFailed`, `KillSwitchActivated` |
| Execution | `OrderIntentCreated`, `BrokerOrderSubmitted`, `BrokerOrderRejected`, `FillReceived`, `PositionReconciled` |
| Research | `ExperimentStarted`, `BacktestCompleted`, `WalkForwardCompleted`, `ModelCompared` |
| AI | `ModelTrainingStarted`, `ModelRegistered`, `InferenceCompleted`, `ModelDriftDetected` |
| News | `NewsIngested`, `SentimentScored`, `EventImpactScored` |

## Event Rules

Events must include event id, correlation id, causation id, aggregate id, timestamp, schema version, payload, source refs where applicable, and retry status.
