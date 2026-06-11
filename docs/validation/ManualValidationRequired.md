# Manual Validation Required

Status: REQUIRED FOR ENVIRONMENT-SPECIFIC VALIDATION

Story: `I01-E01-F01-S1: Store Repository baseline`

## Reason

Docker is not available in the current shell, so Docker build and database-container validation could not be executed locally.

This story does not introduce Dockerfile, Compose, PostgreSQL schema, or database persistence changes. The runnable story evidence is covered by .NET build, Angular build, and the foundation baseline API smoke test.

## Commands

```powershell
docker --version
docker compose version
docker compose build
docker compose up -d postgres redis api
Invoke-RestMethod http://localhost:5080/api/foundation/repository-baseline
docker compose down
```

## Expected Results

- Docker and Docker Compose versions are printed.
- Compose build succeeds.
- PostgreSQL, Redis, and API containers start.
- Repository baseline endpoint returns `storyId = I01-E01-F01-S1` and `knowledgeId = SMA-KNW-0018`.

## Evidence Required

- Command output showing Docker availability.
- Compose build/start output.
- API response body from `/api/foundation/repository-baseline`.
