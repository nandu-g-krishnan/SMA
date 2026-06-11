# Manual Validation Required

Status: REQUIRED FOR ENVIRONMENT-SPECIFIC VALIDATION

Story: `I01-E01-F01-S1: Store Repository baseline`

## Reason

Optional infrastructure is not required for the current MVP foundation run.

This story does not introduce container packaging, PostgreSQL schema, Redis persistence, live Kite credentials, or database persistence changes. The runnable story evidence is covered by .NET build, Angular build, native local startup, and foundation API smoke checks.

## Commands

```powershell
dotnet build SMA.sln
cd apps\web
npm run build
cd ..\..
run-local.bat
Invoke-RestMethod http://localhost:5080/api/foundation/repository-baseline
```

## Expected Results

- .NET build succeeds.
- Angular build succeeds.
- Local native API and UI startup is requested.
- Repository baseline endpoint returns `storyId = I01-E01-F01-S1` and `knowledgeId = SMA-KNW-0018`.

## Evidence Required

- .NET build output.
- Angular build output.
- Local native startup output.
- API response body from `/api/foundation/repository-baseline`.
