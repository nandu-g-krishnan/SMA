# 11 AI Architecture

## Python Services

| Service | Responsibility |
| --- | --- |
| `ai-service` | Training orchestration, inference gateway, model comparison |
| `regime-service` | Market regime classification |
| `sentiment-service` | News sentiment and event impact scoring |
| `forecast-service` | Forecasting and ranking models |
| `feature-store` | Feature materialization and serving facade |

## Model Lifecycle

Dataset registration, feature extraction, labeling, training, validation, model registry, approval, deployment, inference, drift detection, retraining, rollback.

## Supported Libraries

Scikit-learn, PyTorch, XGBoost, LightGBM, Pandas, NumPy.

## LLM Abstraction

LLM providers are accessed through an interface supporting OpenAI, Ollama, DeepSeek, Anthropic, and Qwen. LLM output is used for research assistance, summaries, explanations, and sentiment augmentation, not direct unsupervised order placement.

## Feature Store Rule

Models consume approved feature-store values. They must not recalculate features directly from raw candles when a feature exists.
