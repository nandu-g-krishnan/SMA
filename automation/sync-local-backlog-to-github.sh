#!/usr/bin/env bash
set -euo pipefail

OWNER="${OWNER:-nandu-g-krishnan}"
REPO="${REPO:-SMA}"
DRY_RUN="${DRY_RUN:-1}"
UPDATE_EXISTING="${UPDATE_EXISTING:-0}"

backlog_files=(
  "github/Initiatives.md|initiative"
  "github/Epics.md|epic"
  "github/Features.md|feature"
  "github/backlog/Stories.md|story"
  "github/backlog/KiteStories.md|story,kite,broker"
)

declare -A existing_by_title
if [[ "$DRY_RUN" != "1" ]]; then
  while IFS=$'\034' read -r number title; do
    existing_by_title["$title"]="$number"
  done < <(gh issue list --repo "$OWNER/$REPO" --state all --json number,title --limit 1000 --jq '.[] | "\(.number)\u001c\(.title)"')
fi

for entry in "${backlog_files[@]}"; do
  story_file="${entry%%|*}"
  label="${entry#*|}"
  awk '
    /^## / {
      if (title != "") {
        print title "\034" body
      }
      title = substr($0, 4)
      body = ""
      next
    }
    title != "" { body = body $0 "\n" }
    END {
      if (title != "") {
        print title "\034" body
      }
    }
  ' "$story_file" | while IFS=$'\034' read -r title body; do
    if [[ "$DRY_RUN" == "1" ]]; then
      echo "[DRY RUN] Would create/update GitHub issue: [$label] $title"
      continue
    fi

    existing_number="${existing_by_title[$title]:-}"
    if [[ -n "$existing_number" ]]; then
      if [[ "$UPDATE_EXISTING" == "1" ]]; then
        gh issue edit "$existing_number" --repo "$OWNER/$REPO" --body "$body"
        echo "Updated issue #$existing_number $title"
      else
        echo "Skipped existing issue #$existing_number $title"
      fi
    else
      gh issue create --repo "$OWNER/$REPO" --title "$title" --body "$body" --label "$label"
      echo "Created issue $title"
    fi
  done
done
