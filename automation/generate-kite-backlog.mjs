import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, s) => fs.writeFileSync(path.join(root, p), s.replace(/\r?\n/g, '\n'), 'utf8');

const sourceDocument = 'docs/KITE/kite documentation.md';
const sourcePage = 'Kite documentation source section';
const architectureComponent = 'Broker Adapter, Reference Data Platform, Market Data Platform';
const initiative = 'I08 Execution And Broker Platform';
const epic = 'I08-E01 Zerodha integration';
const feature = 'I08-E01-F-KITE Kite Connect foundation';

const kiteStories = [
  {
    id: 'I08-E01-F-KITE-S01',
    knowledgeId: 'SMA-KITE-0001',
    title: 'Implement Kite API credential configuration',
    section: 'Getting Started and Developer Account Setup',
    component: 'Configuration Registry',
    summary: 'Store Kite api_key, redirect URL, and secret references through server-side configuration without exposing api_secret to clients.',
    tests: 'Configuration binding tests, missing-secret tests, environment override tests'
  },
  {
    id: 'I08-E01-F-KITE-S02',
    knowledgeId: 'SMA-KITE-0002',
    title: 'Implement Kite login URL endpoint',
    section: 'Authentication login flow',
    component: 'Broker Authentication Adapter',
    summary: 'Generate the Kite login URL from the server and return it to the UI for user authentication.',
    tests: 'Unit tests for URL generation, redirect URL validation, API version header assertions'
  },
  {
    id: 'I08-E01-F-KITE-S03',
    knowledgeId: 'SMA-KITE-0003',
    title: 'Implement Kite request-token callback',
    section: 'GenerateSession request token exchange',
    component: 'Broker Authentication Adapter',
    summary: 'Accept the Kite request_token callback and exchange it for access/public token data server-side.',
    tests: 'Callback parsing tests, failed-token tests, secure token persistence tests'
  },
  {
    id: 'I08-E01-F-KITE-S04',
    knowledgeId: 'SMA-KITE-0004',
    title: 'Implement Kite session expiry handling',
    section: 'SetSessionExpiryHook and 403 handling',
    component: 'Broker Session Service',
    summary: 'Detect expired sessions, mark broker state unauthenticated, and block dependent broker workflows.',
    tests: 'Session-expiry tests, broker-disabled tests, audit-event tests'
  },
  {
    id: 'I08-E01-F-KITE-S05',
    knowledgeId: 'SMA-KITE-0005',
    title: 'Implement Kite API version header policy',
    section: 'X-Kite-version API versioning',
    component: 'Broker HTTP Client',
    summary: 'Send explicit Kite API version headers for production-safe HTTP requests.',
    tests: 'HTTP client header tests, version configuration tests'
  },
  {
    id: 'I08-E01-F-KITE-S06',
    knowledgeId: 'SMA-KITE-0006',
    title: 'Implement Kite instrument sync',
    section: 'Instruments and symbol metadata',
    component: 'Reference Data Platform',
    summary: 'Import Kite instruments into a versioned instrument master for NSE/BSE mapping and downstream market data.',
    tests: 'Instrument import tests, versioning tests, duplicate symbol tests, NSE/BSE mapping tests'
  },
  {
    id: 'I08-E01-F-KITE-S07',
    knowledgeId: 'SMA-KITE-0007',
    title: 'Implement Kite WebSocket ticker connection',
    section: 'WebSocket live streaming data',
    component: 'Market Data Platform',
    summary: 'Connect one KiteTicker WebSocket session, subscribe to configured instrument tokens, and receive ticks.',
    tests: 'Ticker client tests, subscription tests, single-connection guard tests'
  },
  {
    id: 'I08-E01-F-KITE-S08',
    knowledgeId: 'SMA-KITE-0008',
    title: 'Implement Kite WebSocket reconnect policy',
    section: 'EnableReconnect, OnReconnect, OnNoReconnect, OnError, OnClose',
    component: 'Market Data Platform',
    summary: 'Handle reconnect, no-reconnect, error, close, and connect events with observable broker state.',
    tests: 'Reconnect policy tests, no-reconnect tests, stale-data state tests'
  },
  {
    id: 'I08-E01-F-KITE-S09',
    knowledgeId: 'SMA-KITE-0009',
    title: 'Persist Kite live ticks',
    section: 'OnTick event handler',
    component: 'Market Data Storage',
    summary: 'Persist Kite tick payloads with instrument token, timestamp, price, volume, source, and correlation metadata.',
    tests: 'Tick persistence tests, duplicate tick tests, invalid payload tests'
  },
  {
    id: 'I08-E01-F-KITE-S10',
    knowledgeId: 'SMA-KITE-0010',
    title: 'Generate one minute candles from Kite ticks',
    section: 'Live tick stream to market data milestone',
    component: 'Candle Aggregation Service',
    summary: 'Aggregate validated Kite ticks into deterministic 1 minute OHLCV candles in PostgreSQL.',
    tests: 'Candle aggregation tests, timezone tests, gap tests, duplicate tick tests'
  },
  {
    id: 'I08-E01-F-KITE-S11',
    knowledgeId: 'SMA-KITE-0011',
    title: 'Implement Kite holdings retrieval',
    section: 'GetHoldings portfolio API',
    component: 'Broker Portfolio Adapter',
    summary: 'Retrieve holdings through the server-side Kite adapter for later portfolio reconciliation.',
    tests: 'Holdings mapping tests, unauthorized-session tests, audit tests'
  },
  {
    id: 'I08-E01-F-KITE-S12',
    knowledgeId: 'SMA-KITE-0012',
    title: 'Implement guarded Kite order placement adapter',
    section: 'PlaceOrder API example',
    component: 'Execution Safety Adapter',
    summary: 'Create a disabled-by-default order placement adapter that requires paper trading and capital protection gates before live use.',
    tests: 'Order validation tests, live-disabled tests, capital-protection gate tests'
  }
];

const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${rows.map((row) => `| ${row.map((v) => String(v).replace(/\|/g, '/')).join(' | ')} |`).join('\n')}\n`;

const storyBlock = (story) => `## ${story.id}: ${story.title}

**Initiative:** ${initiative}

**Epic:** ${epic}

**Feature:** ${feature}

**KnowledgeIds:** ${story.knowledgeId}

**SourceDocument:** ${sourceDocument}

**SourcePage:** ${sourcePage}

**SourceSection:** ${story.section}

**ArchitectureComponent:** ${story.component}

**Story Points:** 5

**Description:** ${story.summary}

**Mandatory Acceptance Criteria:**

- Source PDF or documentation source is identified.
- Source section is referenced.
- Extracted knowledge is stored in MasterKnowledgeBase.
- Formula, logic, and parameters are verified where applicable.
- Code matches extracted knowledge.
- No undocumented assumptions are introduced.
- Unit tests, integration tests, and regression tests are added where applicable.
- Story maps to KnowledgeId, epic, feature, architecture component, code module, and test.
- Implementation matches Master Knowledge Base.
- Technical review, quant review, and architecture review are complete.

**TestSuite:** ${story.tests}

**Definition Of Done:** Source linked, knowledge extracted, knowledge validated, architecture mapped, code implemented, tests passed, documentation updated, traceability matrix updated, and compliance review passed.
`;

write('github/backlog/KiteStories.md', `# Kite Connect Backlog Stories

Status: LOCAL SOURCE OF TRUTH

These stories are generated from ${sourceDocument}. GitHub Project V2 is a generated view of this local backlog.

${kiteStories.map(storyBlock).join('\n')}
`);

write('github/backlog/KiteBacklogCoverageReport.md', `# Kite Backlog Coverage Report

Status: PASS

${table(
  ['KnowledgeId', 'SourceDocument', 'SourceSection', 'ArchitectureComponent', 'Epic', 'Feature', 'Story', 'Status'],
  kiteStories.map((s) => [s.knowledgeId, sourceDocument, s.section, s.component, epic, feature, s.id, 'Mapped'])
)}
`);

write('github/import/kite-stories.csv', [
  'id,knowledge_id,epic_id,feature_id,title,source_document,source_section,architecture_component,points',
  ...kiteStories.map((s) => `"${s.id}","${s.knowledgeId}","${epic}","${feature}","${s.title}","${sourceDocument}","${s.section}","${s.component}","5"`)
].join('\n') + '\n');

console.log(`Generated ${kiteStories.length} Kite backlog stories.`);
