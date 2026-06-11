FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props ./
COPY apps/api/SMA.Api/SMA.Api.csproj apps/api/SMA.Api/
RUN dotnet restore apps/api/SMA.Api/SMA.Api.csproj
COPY apps/api/SMA.Api apps/api/SMA.Api
RUN dotnet publish apps/api/SMA.Api/SMA.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "SMA.Api.dll"]
