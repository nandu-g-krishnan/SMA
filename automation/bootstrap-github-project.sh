#!/usr/bin/env bash
set -euo pipefail

OWNER="${OWNER:-nandu-g-krishnan}"
REPO="${REPO:-SMA}"
PROJECT_TITLE="${PROJECT_TITLE:-SMA Institutional Trading Platform}"

labels=(
  initiative epic feature story task bug technical-debt research architecture
  backend frontend database ai ml options futures risk portfolio market-data
  news broker kite monitoring security devops high-priority medium-priority low-priority
  blocked ready done
)

project_fields=(
  "KnowledgeId"
  "Source PDF"
  "Source Page"
  "Formula Verified"
  "Backtest Verified"
  "Paper Trade Verified"
  "Live Verified"
  "Compliance Status"
  "Model Version"
  "Risk Review"
)

for label in "${labels[@]}"; do
  gh label create "$label" --repo "$OWNER/$REPO" --color "ededed" --description "SMA $label" --force
done

echo "Labels ensured for $OWNER/$REPO."
echo "Required Project V2 fields:"
for field in "${project_fields[@]}"; do
  echo "- $field"
done
echo "Create Project V2 fields after confirming Project V2 access and token scope."
echo "Project title: $PROJECT_TITLE"
