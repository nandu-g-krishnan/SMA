# 06 Event Driven Architecture

## Messaging

RabbitMQ is the primary queue. PostgreSQL outbox provides transactional event persistence and retry safety.

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
