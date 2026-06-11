using System.Collections.Concurrent;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables(prefix: "SMA__");
builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddSingleton<BrokerSessionState>();
builder.Services.AddSingleton<InstrumentSyncState>();
builder.Services.AddSingleton<TickStore>();
builder.Services.AddSingleton<RepositoryBaselineStore>();
builder.Services.AddSingleton<ReferenceDataModelMonitorStore>();

var app = builder.Build();

app.UseCors("LocalFrontend");
app.UseAuthorization();

app.MapGet("/health/live", () => Results.Ok(new
{
    status = "Healthy",
    service = "SMA.Api",
    check = "live"
}));

app.MapGet("/health/ready", (IConfiguration configuration) =>
{
    var postgres = configuration["Postgres:ConnectionString"];
    var redis = configuration["Redis:ConnectionString"];
    var kiteApiKey = configuration["Kite:ApiKey"];
    var kiteRedirectUrl = configuration["Kite:RedirectUrl"];

    return Results.Ok(new
    {
        status = "Ready",
        service = "SMA.Api",
        dependencies = new
        {
            postgresConfigured = !string.IsNullOrWhiteSpace(postgres),
            redisConfigured = !string.IsNullOrWhiteSpace(redis),
            kiteConfigured = !string.IsNullOrWhiteSpace(kiteApiKey),
            kiteRedirectUrlConfigured = !string.IsNullOrWhiteSpace(kiteRedirectUrl)
        }
    });
});

app.MapGet("/api/foundation/configuration", (IConfiguration configuration) => Results.Ok(new
{
    environment = app.Environment.EnvironmentName,
    targetStack = new[]
    {
        "Angular",
        "ASP.NET Core/.NET",
        "PostgreSQL",
        "Redis",
        "SignalR",
        "Python FastAPI",
        "Kite Connect",
        "Docker",
        "GitHub Actions"
    },
    gates = new
    {
        architectureBaseline = "LOCKED",
        implementationAuthorization = "APPROVED",
        firstMilestone = "Kite Login -> Instrument Sync -> Live Tick Stream -> PostgreSQL Tick Storage -> 1m Candle Generation"
    }
}));

app.MapGet("/api/foundation/repository-baseline", (RepositoryBaselineStore store) => Results.Ok(store.GetBaseline()));

app.MapGet("/api/reference-data/model/monitor", (ReferenceDataModelMonitorStore store) => Results.Ok(store.GetSnapshot()));

app.MapGet("/api/auth/kite/login-url", (IConfiguration configuration) =>
{
    var apiKey = configuration["Kite:ApiKey"];
    var redirectUrl = configuration["Kite:RedirectUrl"];

    if (string.IsNullOrWhiteSpace(apiKey))
    {
        return Results.BadRequest(new
        {
            error = "Kite ApiKey is not configured.",
            source = "docs/KITE/kite documentation.md",
            knowledgeId = "SMA-KNW-0004"
        });
    }

    if (string.IsNullOrWhiteSpace(redirectUrl))
    {
        return Results.BadRequest(new
        {
            error = "Kite RedirectUrl is not configured.",
            source = "docs/KITE/kite documentation.md",
            knowledgeId = "SMA-KNW-0004"
        });
    }

    var loginUrl = $"https://kite.zerodha.com/connect/login?v=3&api_key={Uri.EscapeDataString(apiKey)}";
    return Results.Ok(new KiteLoginResponse(
        loginUrl,
        redirectUrl,
        "3",
        "SMA-KNW-0004",
        "docs/KITE/kite documentation.md"));
});

app.MapGet("/api/auth/kite/callback", (string? request_token, string? status, BrokerSessionState session) =>
{
    if (string.IsNullOrWhiteSpace(request_token))
    {
        return Results.BadRequest(new
        {
            error = "Missing Kite request_token.",
            source = "docs/KITE/kite documentation.md",
            knowledgeId = "SMA-KNW-0005"
        });
    }

    session.RecordRequestToken(request_token, status ?? "success");
    return Results.Ok(new
    {
        authenticated = false,
        session.requestTokenCaptured,
        session.lastStatus,
        session.lastUpdatedUtc,
        next = "Exchange request_token for access token using server-side api_secret. Secret handling is intentionally not exposed to clients.",
        source = "docs/KITE/kite documentation.md",
        knowledgeId = "SMA-KNW-0005"
    });
});

app.MapPost("/api/auth/kite/session-expired", (BrokerSessionState session) =>
{
    session.MarkExpired();
    return Results.Ok(new
    {
        authenticated = false,
        sessionExpired = true,
        session.lastUpdatedUtc,
        source = "docs/KITE/kite documentation.md",
        knowledgeId = "SMA-KNW-0006"
    });
});

app.MapGet("/api/reference/instruments/sync/status", (InstrumentSyncState state) => Results.Ok(state.ToResponse()));

app.MapPost("/api/reference/instruments/sync", (InstrumentSyncState state) =>
{
    state.MarkRequested();
    return Results.Accepted($"/api/reference/instruments/sync/status", state.ToResponse());
});

app.MapPost("/api/market-data/ticks", (TickInput input, TickStore store) =>
{
    if (input.InstrumentToken <= 0 || input.LastPrice <= 0)
    {
        return Results.BadRequest(new
        {
            error = "InstrumentToken and LastPrice are required.",
            source = "docs/KITE/kite documentation.md",
            knowledgeId = "SMA-KNW-0008"
        });
    }

    var tick = input.ToTick();
    store.Add(tick);
    var candle = store.GetOneMinuteCandle(tick.InstrumentToken, tick.TimestampUtc);

    return Results.Ok(new
    {
        stored = true,
        tick,
        oneMinuteCandle = candle,
        source = "docs/KITE/kite documentation.md",
        knowledgeId = "SMA-KNW-0008"
    });
});

app.MapGet("/api/market-data/candles/1m/{instrumentToken:long}", (long instrumentToken, TickStore store) =>
{
    return Results.Ok(new
    {
        instrumentToken,
        candles = store.GetCandles(instrumentToken),
        source = "docs/KITE/kite documentation.md",
        knowledgeId = "SMA-KNW-0009"
    });
});

app.MapGet("/api/market-data/milestone", (BrokerSessionState session, InstrumentSyncState instruments, TickStore ticks) => Results.Ok(new
{
    milestone = "Kite-to-PostgreSQL one-minute candle pipeline",
    lockedSequence = new[]
    {
        "Kite Login",
        "Instrument Sync",
        "Live Tick Stream",
        "PostgreSQL Tick Storage",
        "1 Minute Candle Generation"
    },
    progress = new
    {
        kiteLoginUrlAvailable = true,
        kiteRequestTokenCaptured = session.requestTokenCaptured,
        instrumentSyncRequested = instruments.SyncRequested,
        liveTicksStoredInMemory = ticks.TotalTicks,
        oneMinuteCandlesGenerated = ticks.TotalCandles
    },
    storageMode = "In-memory foundation implementation; PostgreSQL persistence is the next database-platform step.",
    forbiddenUntilComplete = new[]
    {
        "AI",
        "Strategies",
        "Options analytics",
        "Execution",
        "Live trading"
    }
}));

app.Run();

internal sealed class BrokerSessionState
{
    private readonly object gate = new();
    private string? requestToken;

    public bool requestTokenCaptured => !string.IsNullOrWhiteSpace(requestToken);
    public string lastStatus { get; private set; } = "NotStarted";
    public DateTimeOffset? lastUpdatedUtc { get; private set; }

    public void RecordRequestToken(string token, string status)
    {
        lock (gate)
        {
            requestToken = token;
            lastStatus = status;
            lastUpdatedUtc = DateTimeOffset.UtcNow;
        }
    }

    public void MarkExpired()
    {
        lock (gate)
        {
            requestToken = null;
            lastStatus = "Expired";
            lastUpdatedUtc = DateTimeOffset.UtcNow;
        }
    }
}

internal sealed class InstrumentSyncState
{
    public bool SyncRequested { get; private set; }
    public DateTimeOffset? LastRequestedUtc { get; private set; }

    public void MarkRequested()
    {
        SyncRequested = true;
        LastRequestedUtc = DateTimeOffset.UtcNow;
    }

    public object ToResponse() => new
    {
        status = SyncRequested ? "Requested" : "NotStarted",
        phase = "Phase 1A Reference Data Platform",
        lastRequestedUtc = LastRequestedUtc,
        source = "docs/KITE/kite documentation.md",
        knowledgeId = "SMA-KNW-0007",
        deliverables = new[]
        {
            "Instrument master",
            "NSE/BSE symbol mapping",
            "Kite instrument sync",
            "Expiry calendar",
            "Trading calendar",
            "Holiday calendar",
            "Corporate actions framework",
            "Sector/industry classification"
        }
    };
}

internal sealed class TickStore
{
    private readonly ConcurrentDictionary<long, List<MarketTick>> ticksByInstrument = new();

    public int TotalTicks => ticksByInstrument.Values.Sum(ticks => ticks.Count);
    public int TotalCandles => ticksByInstrument.Keys.Sum(GetCandlesInternalCount);

    public void Add(MarketTick tick)
    {
        var ticks = ticksByInstrument.GetOrAdd(tick.InstrumentToken, _ => new List<MarketTick>());
        lock (ticks)
        {
            ticks.Add(tick);
        }
    }

    public OneMinuteCandle? GetOneMinuteCandle(long instrumentToken, DateTimeOffset timestamp)
    {
        var minute = FloorToMinute(timestamp);
        return GetCandles(instrumentToken).FirstOrDefault(candle => candle.StartUtc == minute);
    }

    public IReadOnlyList<OneMinuteCandle> GetCandles(long instrumentToken)
    {
        if (!ticksByInstrument.TryGetValue(instrumentToken, out var ticks))
        {
            return Array.Empty<OneMinuteCandle>();
        }

        lock (ticks)
        {
            return ticks
                .OrderBy(tick => tick.TimestampUtc)
                .GroupBy(tick => FloorToMinute(tick.TimestampUtc))
                .Select(group =>
                {
                    var ordered = group.OrderBy(tick => tick.TimestampUtc).ToArray();
                    return new OneMinuteCandle(
                        instrumentToken,
                        group.Key,
                        ordered.First().LastPrice,
                        ordered.Max(tick => tick.LastPrice),
                        ordered.Min(tick => tick.LastPrice),
                        ordered.Last().LastPrice,
                        ordered.Sum(tick => tick.Volume),
                        ordered.Length);
                })
                .ToArray();
        }
    }

    private int GetCandlesInternalCount(long instrumentToken) => GetCandles(instrumentToken).Count;

    private static DateTimeOffset FloorToMinute(DateTimeOffset value)
    {
        var utc = value.ToUniversalTime();
        return new DateTimeOffset(utc.Year, utc.Month, utc.Day, utc.Hour, utc.Minute, 0, TimeSpan.Zero);
    }
}

internal sealed class RepositoryBaselineStore
{
    private readonly RepositoryBaselineRecord baseline = new(
        "I01-E01-F01-S1",
        "Repository baseline",
        "SMA-KNW-0018",
        "Technical analysis assumptions: market discounts everything, market moves in trends, history repeats",
        "Trading Core Platform",
        "Platform foundation",
        "Repository baseline",
        "Trading Core Platform Foundation",
        new[]
        {
            "4823_Technical Analysis.pdf",
            "Everything_you_need_to_know_about_investing-Advanced_series_eBook.pdf",
            "Idenitfying-Chart-Patterns.pdf"
        },
        new[]
        {
            "docs/master-data/MasterKnowledgeBase.md",
            "docs/traceability/SourceTraceabilityMatrix.md",
            "docs/traceability/ImplementationTraceabilityMatrix.md",
            "docs/architecture/ArchitectureBaseline_v1.md",
            "docs/governance/MasterUniversalStoryImplementationOperatingSystem.md"
        },
        "LOCKED",
        "APPROVED",
        "Traceable repository baseline stored for Epic 001 Foundation Platform.",
        DateTimeOffset.Parse("2026-06-11T00:00:00Z", CultureInfo.InvariantCulture));

    public RepositoryBaselineRecord GetBaseline() => baseline;
}

internal sealed class ReferenceDataModelMonitorStore
{
    private readonly ReferenceDataModelMonitorSnapshot snapshot = new(
        "I01-E01-F04-S1",
        "Monitor Reference data model",
        "SMA-MLQ-0003",
        "Feature Store",
        "Trading Core Platform",
        "Platform foundation",
        "Reference data model",
        "Reference Data Platform",
        new[]
        {
            "rf-v2017-n4-1-pdf.pdf",
            "ssrn-3138630.pdf",
            "ssrn-3247865.pdf"
        },
        new[]
        {
            "docs/master-data/MasterKnowledgeBase.md",
            "docs/master-data/MachineLearningMasterCatalog.md",
            "docs/traceability/SourceTraceabilityMatrix.md",
            "docs/traceability/ImplementationTraceabilityMatrix.md",
            "docs/architecture/ArchitectureBaseline_v1.md",
            "docs/architecture/ArchitectureTraceabilityMatrix.md"
        },
        new[]
        {
            new ReferenceDataModelTarget("Instrument master", "Planned", "Versioned instrument identity and exchange metadata"),
            new ReferenceDataModelTarget("NSE/BSE symbol mapping", "Planned", "Canonical tradingsymbol to exchange mapping"),
            new ReferenceDataModelTarget("Kite instrument sync", "Planned", "Broker instrument dump ingestion path"),
            new ReferenceDataModelTarget("Expiry calendar", "Planned", "Derivative expiry schedule"),
            new ReferenceDataModelTarget("Trading calendar", "Planned", "Exchange session calendar"),
            new ReferenceDataModelTarget("Holiday calendar", "Planned", "Market holiday and settlement exclusions"),
            new ReferenceDataModelTarget("Corporate actions framework", "Planned", "Split, bonus, dividend, and symbol-change adjustment model"),
            new ReferenceDataModelTarget("Sector/industry classification", "Planned", "Reusable sector and industry taxonomy")
        },
        new[]
        {
            "Missing ticks",
            "Duplicate ticks",
            "Timezone handling",
            "Holiday handling",
            "Corporate actions",
            "Splits",
            "Bonus issues"
        },
        new[]
        {
            "No live trading path",
            "No execution endpoint",
            "No order placement",
            "CapitalProtectionReadinessReport remains the live-trading gate"
        },
        "Monitored",
        DateTimeOffset.Parse("2026-06-11T00:00:00Z", CultureInfo.InvariantCulture));

    public ReferenceDataModelMonitorSnapshot GetSnapshot() => snapshot;
}

internal sealed record KiteLoginResponse(
    string LoginUrl,
    string RedirectUrl,
    string ApiVersion,
    string KnowledgeId,
    string SourceDocument);

internal sealed record RepositoryBaselineRecord(
    string StoryId,
    string StoryName,
    string KnowledgeId,
    string KnowledgeConcept,
    string Initiative,
    string Epic,
    string Feature,
    string ArchitectureComponent,
    IReadOnlyList<string> SourceDocuments,
    IReadOnlyList<string> TraceabilityArtifacts,
    string ArchitectureStatus,
    string ImplementationAuthorization,
    string AuditNote,
    DateTimeOffset StoredUtc);

internal sealed record ReferenceDataModelMonitorSnapshot(
    string StoryId,
    string StoryName,
    string KnowledgeId,
    string KnowledgeConcept,
    string Initiative,
    string Epic,
    string Feature,
    string ArchitectureComponent,
    IReadOnlyList<string> SourceDocuments,
    IReadOnlyList<string> TraceabilityArtifacts,
    IReadOnlyList<ReferenceDataModelTarget> Targets,
    IReadOnlyList<string> DataQualityChecks,
    IReadOnlyList<string> CapitalProtectionControls,
    string Status,
    DateTimeOffset MonitoredUtc);

internal sealed record ReferenceDataModelTarget(
    string Name,
    string Status,
    string Evidence);

internal sealed record TickInput(
    long InstrumentToken,
    decimal LastPrice,
    long Volume,
    DateTimeOffset? TimestampUtc,
    string? Source)
{
    public MarketTick ToTick() => new(
        InstrumentToken,
        LastPrice,
        Volume,
        TimestampUtc?.ToUniversalTime() ?? DateTimeOffset.UtcNow,
        string.IsNullOrWhiteSpace(Source) ? "Kite" : Source);
}

internal sealed record MarketTick(
    long InstrumentToken,
    decimal LastPrice,
    long Volume,
    DateTimeOffset TimestampUtc,
    string? Source);

internal sealed record OneMinuteCandle(
    long InstrumentToken,
    DateTimeOffset StartUtc,
    decimal Open,
    decimal High,
    decimal Low,
    decimal Close,
    long Volume,
    int TickCount);
