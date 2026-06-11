@echo off
rem Local native startup helper for SMA.
rem Optional infrastructure such as Docker, PostgreSQL, Redis, and live Kite credentials
rem is not required for the current MVP foundation run.

setlocal enabledelayedexpansion
cd /d "%~dp0"
set "SMA_ROOT=%~dp0"
echo ==============================================
echo Starting SMA local MVP environment
echo ==============================================
echo.

%SystemRoot%\System32\where.exe dotnet >nul 2>&1
if errorlevel 1 (
  echo ERROR: .NET SDK is not installed or not on the PATH.
  pause
  exit /b 1
)

%SystemRoot%\System32\where.exe npm >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js/npm is not installed or not on the PATH.
  pause
  exit /b 1
)

echo Optional infrastructure intentionally skipped:
echo - Docker
echo - PostgreSQL
echo - Redis
echo - Live Kite credentials
echo.
echo Starting API on http://localhost:5080
start "SMA API" cmd /k "cd /d ""%SMA_ROOT%apps\api\SMA.Api"" && dotnet run --urls http://localhost:5080"

echo Starting Angular UI on http://localhost:4200
start "SMA Web" cmd /k "cd /d ""%SMA_ROOT%apps\web"" && npm start"

echo.
echo SMA local MVP startup requested.
echo API: http://localhost:5080/health/live
echo UI : http://localhost:4200
echo.
echo Close the opened API and Web terminal windows to stop the app.
pause
endlocal
