# Developer Workstation Requirements

Status: LOCKED

Purpose: standardize the local development environment for Epic 001 Foundation Platform and the Kite to PostgreSQL market-data milestone.

## Required Toolchain

| Tool | Required Version | Reason |
| --- | --- | --- |
| Windows | Windows 11 23H2 or newer | Primary developer workstation target |
| WSL 2 | Latest Windows-supported WSL 2 | Required by Docker Desktop Linux containers |
| Git | 2.45 or newer | Repository, GitHub, and automation workflows |
| GitHub CLI | 2.50 or newer | GitHub issue and Project V2 synchronization |
| .NET SDK | 10.0.100 or newer .NET 10 SDK feature band | Required by `global.json`, `net10.0`, ASP.NET Core API, and Docker build |
| Node.js | 24.14.0 or newer Node 24 LTS | Supported by Angular 20 and current LTS for frontend tooling |
| npm | Bundled with Node.js 24 LTS | Package manager for Angular workspace |
| Angular CLI | 20.x | Must match Angular 20 application dependencies |
| TypeScript | 5.8.x | Required by Angular 20.0/20.1 compatibility range |
| Docker Desktop | 4.42 or newer | Runs PostgreSQL, Redis, API, and web containers locally |
| Docker Compose | Compose v2, bundled with Docker Desktop | Required by `docker-compose.yml` |
| PostgreSQL | 16.x via Docker image `postgres:16-alpine` | Matches repository compose configuration |
| Redis | 7.x via Docker image `redis:7-alpine` | Matches repository compose configuration |
| Python | 3.13.x | Required for future Python FastAPI and ML services |
| PowerShell | 7.4 LTS or newer, Windows PowerShell 5.1 supported for existing scripts | Runs local automation and validation scripts |
| Visual Studio Code | Current stable | Recommended IDE |
| Visual Studio | 2026 or current stable with ASP.NET workload, optional | Optional full IDE for .NET development |

## Project Version Pins

The repository currently requires:

- `.NET SDK`: `10.0.100` through `global.json`
- `.NET target framework`: `net10.0`
- `Angular`: `20.x`
- `TypeScript`: `~5.8.0`
- `PostgreSQL`: `postgres:16-alpine`
- `Redis`: `redis:7-alpine`

## Required Local Services

Run through Docker Compose:

- PostgreSQL on `${SMA_POSTGRES_PORT:-5432}`
- Redis on `${SMA_REDIS_PORT:-6379}`
- ASP.NET Core API on `${SMA_API_PORT:-5080}`
- Angular web app on `${SMA_WEB_PORT:-4200}`

## Required Environment Variables

Use `.env.example` as the baseline:

- `SMA_ENVIRONMENT`
- `SMA_POSTGRES_DB`
- `SMA_POSTGRES_USER`
- `SMA_POSTGRES_PASSWORD`
- `SMA_POSTGRES_PORT`
- `SMA_REDIS_PORT`
- `SMA_API_PORT`
- `SMA_WEB_PORT`
- `SMA_KITE_API_KEY`
- `SMA_KITE_REDIRECT_URL`

Kite secrets must not be committed.

## Validation Commands

Run these before implementing or closing a story:

```powershell
dotnet --version
node --version
npm --version
docker --version
docker compose version
python --version
gh --version
powershell -ExecutionPolicy Bypass -File automation\validate-traceability.ps1
```

## Implementation Rules

- No implementation story may be closed unless the workstation can build, run, and validate the affected code path.
- No live trading workflow may be enabled from local configuration.
- Docker Compose is the required local integration environment for PostgreSQL and Redis.
- The first implementation milestone remains Kite Login to Instrument Sync to Live Tick Stream to PostgreSQL Tick Storage to 1 Minute Candle Generation.

## Notes

- Install the latest patch release inside each required major/minor line.
- Do not downgrade `.NET`, Angular, PostgreSQL, or Redis without an Architecture Change Request.
- If the machine cannot install .NET 10 SDK, implementation is blocked until the SDK is installed or the architecture baseline is changed through ACR.
