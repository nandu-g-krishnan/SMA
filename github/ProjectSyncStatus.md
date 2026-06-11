# GitHub Project Sync Status

Status: LOCAL_BACKLOG_COMPLETE_REMOTE_PENDING

Local source of truth:

- `github/Initiatives.md`
- `github/Epics.md`
- `github/Features.md`
- `github/backlog/Stories.md`
- `github/backlog/KiteStories.md`
- `github/backlog/Dependencies.md`
- `github/backlog/BacklogBaseline_v1.md`

Generated sync scope:

| Artifact | Count | GitHub Target |
| --- | ---: | --- |
| Initiatives | 10 | GitHub issues labeled `initiative` |
| Epics | 61 | GitHub issues labeled `epic` |
| Features | 247 | GitHub issues labeled `feature` |
| Stories | 662 | GitHub issues labeled `story` |
| Kite stories | 12 | GitHub issues labeled `story`, `kite`, `broker` |

Project V2 fields required before Project sync is complete:

- KnowledgeId
- Knowledge Source
- Source Document
- Source Page
- Architecture Component
- Initiative
- Epic
- Feature
- Story
- Formula Verified
- Backtest Verified
- Paper Trade Verified
- Live Verified
- Compliance Status
- Priority
- Story Points
- Status
- Model Version
- Risk Review

Current remote status:

- GitHub CLI account: `nandu-g-krishnan`
- Repository target: `nandu-g-krishnan/SMA`
- Labels: ensured
- Issue sync dry-run: PASS
- Issue sync remote: partial; remote currently has 500 issues
- Missing remote issues: pending audit after GitHub cooldown
- Duplicate remote titles: pending cleanup after GitHub cooldown
- Assignment status: pending secondary limit cooldown
- Project V2 discovery: REQUIRES `read:project` and `project` token scopes
- GraphQL reset observed: `2026-06-11 09:32:58 +05:30`
- Last failing item observed after strict sync: `I03-E04-F03-S1: Store Engulfing`
- Last failing item observed after REST sync: `I03-E04-F03-S1: Store Engulfing`
- GitHub secondary content creation limit observed: `2026-06-11 03:54:11 UTC`

To complete Project V2 sync, refresh GitHub CLI auth with Project scopes, then rerun the local sync scripts:

```powershell
gh auth refresh -h github.com -s read:project -s project
powershell -ExecutionPolicy Bypass -File automation\cleanup-github-backlog-duplicates.ps1 -DryRun
powershell -ExecutionPolicy Bypass -File automation\cleanup-github-backlog-duplicates.ps1
powershell -ExecutionPolicy Bypass -File automation\sync-local-backlog-to-github.ps1 -BatchSize 25 -SleepSeconds 3
powershell -ExecutionPolicy Bypass -File automation\audit-github-backlog-sync.ps1
powershell -ExecutionPolicy Bypass -File automation\sync-github-project-v2.ps1
```

GitHub Project remains a generated view. Local backlog files remain authoritative.

## Story Closure Sync

| Story Id | GitHub Issue | Local Status | GitHub Status | Project V2 Status |
| --- | --- | --- | --- | --- |
| I01-E01-F01-S1 | #319 | Closed | Closed | Project field sync pending |

## Local Completion Override

Backlog completion is not blocked by GitHub limits.

- Local mirror: COMPLETE
- KnowledgeIds covered locally: 230
- Concept stories generated locally: 1150
- Concept tasks generated locally: 4830
- Remote issue sync: COMPLETE or PENDING due to GitHub secondary limits
- Project V2 sync: PENDING until `read:project` and `project` scopes are available

Use batching for remote sync:

```powershell
powershell -ExecutionPolicy Bypass -File automation\sync-local-backlog-to-github.ps1 -BatchSize 25 -SleepSeconds 3
```
