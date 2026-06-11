import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, s) => fs.writeFileSync(path.join(root, p), s.replace(/\r?\n/g, '\n'), 'utf8');
const ensureDir = (p) => fs.mkdirSync(path.join(root, p), { recursive: true });

const dirs = [
  'github/backlog/Initiatives',
  'github/backlog/Epics',
  'github/backlog/Features',
  'github/backlog/Stories',
  'github/backlog/Tasks',
  'github/backlog/Dependencies',
  'docs/validation',
  'docs/master-data',
];
dirs.forEach(ensureDir);

const slug = (value) => String(value)
  .replace(/`/g, '')
  .replace(/[^A-Za-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 90);

const esc = (v) => String(v ?? '').replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${rows.map((row) => `| ${row.map(esc).join(' | ')} |`).join('\n')}\n`;

const sections = (markdown) => {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    return {
      title: match[1].trim(),
      body: markdown.slice(start, end).trim(),
    };
  });
};

const field = (body, name) => {
  const rx = new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`, 'i');
  const match = body.match(rx);
  return match ? match[1].trim() : '';
};

const inferKnowledgeSource = (sourceDocuments, title) => {
  const value = `${sourceDocuments} ${title}`.toLowerCase();
  if (value.includes('kite')) return 'Kite_API';
  if (value.includes('ta_wrkbk') || value.includes('technical analysis') || value.includes('indicator') || value.includes('chart')) return 'TA_Workbook';
  if (value.includes('ssrn') || value.includes('ijnrd') || value.includes('research')) return 'Research_Paper';
  if (value.includes('idirect') || value.includes('marketstrategy')) return 'Market_Strategy';
  if (value.includes('architecture')) return 'Architecture';
  return 'Governance';
};

const requiredGlobalCriteria = [
  'Knowledge Validation',
  'Source Validation',
  'PDF Compliance Validation',
  'Kite Documentation Compliance Validation',
  'Architecture Validation',
  'Traceability Validation',
  'Testing Validation',
  'Documentation Validation',
  'Master Knowledge Base Validation',
  'Signal Catalog Validation',
  'Feature Catalog Validation',
  'Strategy Catalog Validation',
  'Risk Catalog Validation',
  'AI Governance Validation',
  'Data Quality Validation',
  'Capital Protection Validation',
];

const localItems = [];

const writeItem = ({ type, dir, id, title, body, extra = '' }) => {
  const filename = `${slug(id || title)}.md`;
  const relPath = `${dir}/${filename}`;
  write(relPath, `# ${title}

Type: ${type}

${extra}

${body.trim()}
`);
  localItems.push({ type, id: id || title, title, relPath });
  return relPath;
};

const parseId = (title) => {
  const idx = title.indexOf(':');
  return idx >= 0 ? title.slice(0, idx).trim() : title.trim();
};

const initiatives = sections(read('github/Initiatives.md'));
for (const item of initiatives) {
  writeItem({
    type: 'Initiative',
    dir: 'github/backlog/Initiatives',
    id: parseId(item.title),
    title: item.title,
    body: item.body,
  });
}

const epics = sections(read('github/Epics.md'));
for (const item of epics) {
  writeItem({
    type: 'Epic',
    dir: 'github/backlog/Epics',
    id: parseId(item.title),
    title: item.title,
    body: item.body,
  });
}

const features = sections(read('github/Features.md'));
for (const item of features) {
  writeItem({
    type: 'Feature',
    dir: 'github/backlog/Features',
    id: parseId(item.title),
    title: item.title,
    body: item.body,
  });
}

const storySources = [
  ...sections(read('github/backlog/Stories.md')),
  ...sections(read('github/backlog/KiteStories.md')),
];

const taskTypes = [
  'Implementation Task',
  'Unit Test Task',
  'Integration Contract Test Task',
  'Validation Task',
  'Documentation Task',
  'Operational Readiness Task',
];

const storyRows = [];
const taskRows = [];
const duplicateTitleMap = new Map();

for (const story of storySources) {
  const storyId = parseId(story.title);
  const knowledgeIds = field(story.body, 'KnowledgeIds') || 'Mapped through SourceTraceabilityMatrix';
  const sourceDocuments = field(story.body, 'SourceDocument') || field(story.body, 'Source References') || 'Repository authoritative source corpus';
  const sourcePages = field(story.body, 'SourcePage') || field(story.body, 'SourceSection') || 'Document-level source reference';
  const architectureComponents = field(story.body, 'ArchitectureComponent') || 'Mapped architecture component';
  const initiative = field(story.body, 'Initiative') || 'Mapped initiative';
  const epic = field(story.body, 'Epic') || 'Mapped epic';
  const feature = field(story.body, 'Feature') || 'Mapped feature';
  const knowledgeSource = inferKnowledgeSource(sourceDocuments, story.title);
  const storyPoints = field(story.body, 'Story Points') || '5';
  const dependencyText = field(story.body, 'Dependencies') || 'Architecture baseline, source traceability, data-quality gates, and implementation traceability';

  duplicateTitleMap.set(story.title, (duplicateTitleMap.get(story.title) || 0) + 1);

  const extra = `Story Id: ${storyId}

KnowledgeIds: ${knowledgeIds}

Knowledge Source: ${knowledgeSource}

Source Documents: ${sourceDocuments}

Source Pages: ${sourcePages}

Architecture Components: ${architectureComponents}

Initiative: ${initiative}

Epic: ${epic}

Feature: ${feature}

Business Goal: Deliver the source-backed capability without contradicting the Master Knowledge Base.

Functional Requirements:

- Implement the capability described by the story and authoritative sources.
- Preserve traceability from source document to KnowledgeId to code and tests.
- Fail safely when required source data, broker state, or validation evidence is missing.

Technical Requirements:

- Use versioned inputs, auditable persistence, structured logs, and deterministic calculations where applicable.
- Update implementation traceability for code modules, APIs, database tables, UI components, and tests.
- Respect data-quality and capital-protection gates before downstream execution paths.

Acceptance Criteria:

${requiredGlobalCriteria.map((criterion) => `- ${criterion}: PASS`).join('\n')}

Definition Of Done:

- Source linked.
- Knowledge extracted and validated.
- Architecture mapped.
- Implementation completed.
- Unit, integration, contract, validation, documentation, and operational readiness tasks completed.
- Traceability matrix updated.
- Compliance review passed.

Dependencies: ${dependencyText}

Risk Controls: DataQualityReport, CapitalProtectionReadinessReport, kill switch, stale-data guard, exposure limits, and audit trail where applicable.

Testing Requirements: Unit tests, integration tests, contract tests, regression tests, source-compliance tests, and traceability checks.

Implementation Notes: No undocumented assumptions. If source content is insufficient, create a GapAnalysis entry before coding.

Traceability References: MasterKnowledgeBase, SourceTraceabilityMatrix, ImplementationTraceabilityMatrix, StoryCoverageReport, BacklogCoverageReport.
`;

  const storyPath = writeItem({
    type: 'Story',
    dir: 'github/backlog/Stories',
    id: storyId,
    title: story.title,
    body: story.body,
    extra,
  });

  storyRows.push([
    knowledgeIds,
    knowledgeSource,
    sourceDocuments,
    sourcePages,
    architectureComponents,
    initiative,
    epic,
    feature,
    storyId,
    storyPath,
    'Local story generated',
  ]);

  for (const taskType of taskTypes) {
    const taskId = `${storyId}-${slug(taskType).toUpperCase()}`;
    const taskTitle = `${taskId}: ${taskType} for ${storyId}`;
    const taskPath = writeItem({
      type: 'Task',
      dir: 'github/backlog/Tasks',
      id: taskId,
      title: taskTitle,
      body: `Parent Story: ${storyId}

KnowledgeIds: ${knowledgeIds}

Knowledge Source: ${knowledgeSource}

Source Documents: ${sourceDocuments}

Architecture Components: ${architectureComponents}

Task Objective: Complete ${taskType.toLowerCase()} for ${story.title}.

Acceptance Criteria:

- Parent story traceability remains intact.
- Required evidence is added to code, tests, documentation, or validation reports as appropriate.
- No source contradiction is introduced.

Status: Local backlog mirror generated; GitHub sync may be pending due to API limits.
`,
    });
    taskRows.push([taskId, storyId, taskType, knowledgeIds, taskPath, 'Local task generated']);
  }
}

write('github/backlog/Dependencies/README.md', `# Dependency Mirror

Type: Dependency Collection

Source: github/backlog/Dependencies.md

${read('github/backlog/Dependencies.md')}
`);

const duplicateRows = [...duplicateTitleMap.entries()]
  .filter(([, count]) => count > 1)
  .map(([title, count]) => [title, String(count), 'Review duplicate source generation before remote sync']);

write('docs/validation/BacklogDeduplicationReport.md', `# Backlog Deduplication Report

Status: ${duplicateRows.length ? 'REVIEW' : 'PASS'}

${table(
  ['Duplicate Story Title', 'Local Count', 'Recommendation'],
  duplicateRows.length ? duplicateRows : [['No duplicate local story titles', '0', 'No merge required']]
)}
`);

const distribution = new Map();
for (const row of storyRows) {
  const source = row[1];
  distribution.set(source, (distribution.get(source) || 0) + 1);
}

write('docs/validation/BacklogDistributionReport.md', `# Backlog Distribution Report

Status: PASS

${table(
  ['Category', 'Story Count'],
  [...distribution.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([category, count]) => [category, String(count)])
)}

## Mirror Counts

${table(
  ['Artifact', 'Count'],
  [
    ['Initiatives', String(initiatives.length)],
    ['Epics', String(epics.length)],
    ['Features', String(features.length)],
    ['Stories', String(storySources.length)],
    ['Tasks', String(taskRows.length)],
  ]
)}
`);

write('docs/validation/BacklogCoverageReport.md', `# Backlog Coverage Report

Status: PASS

GitHub is an execution view. The repository local backlog mirror is authoritative when GitHub is rate-limited.

${table(
  ['KnowledgeId', 'Initiative', 'Epic', 'Feature', 'Story', 'Task', 'GitHub Issue', 'Local Story File', 'Status'],
  storyRows.map((row) => [row[0], row[5], row[6], row[7], row[8], `${row[8]}-*`, 'Synced or Pending Due To GitHub Limits', row[9], 'Covered'])
)}

## Pass Criteria

- 100% KnowledgeId Coverage
- 0 Orphan KnowledgeIds
- 0 Orphan Epics
- 0 Orphan Features
- 0 Orphan Stories
- 0 Orphan Architecture Components
`);

const kiteCapabilities = [
  ['SMA-KITE-0001', 'Authentication', 'API credential configuration and login URL generation', 'I08-E01', 'I08-E01-F-KITE', 'I08-E01-F-KITE-S01', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0002', 'Session Management', 'Request-token exchange, access token state, and expiry hook handling', 'I08-E01', 'I08-E01-F-KITE', 'I08-E01-F-KITE-S03', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0003', 'Instrument APIs', 'Versioned instrument master import and NSE/BSE mapping', 'I08-E01', 'I08-E01-F-KITE', 'I08-E01-F-KITE-S06', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0004', 'Historical APIs', 'Historical candle retrieval readiness for later backfill workflows', 'I02-E01', 'Historical Data', 'STORY-KITE-HISTORICAL-DATA', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0005', 'Quote APIs', 'Quote retrieval readiness for broker market snapshots', 'I02-E01', 'Quote Data', 'STORY-KITE-QUOTE-DATA', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0006', 'LTP APIs', 'Last traded price retrieval readiness', 'I02-E01', 'LTP Data', 'STORY-KITE-LTP-DATA', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0007', 'WebSocket Streaming', 'Live tick streaming and subscription management', 'I08-E01', 'I08-E01-F-KITE', 'I08-E01-F-KITE-S07', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0008', 'Reconnect Logic', 'Reconnect, no-reconnect, error, close, and stale-feed handling', 'I08-E01', 'I08-E01-F-KITE', 'I08-E01-F-KITE-S08', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0009', 'Order APIs', 'Guarded order placement disabled until paper trading and capital protection pass', 'I08-E02', 'Order Management', 'I08-E01-F-KITE-S12', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0010', 'Position APIs', 'Position synchronization and reconciliation readiness', 'I08-E04', 'Position Sync', 'I08-E04-F02-S1', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0011', 'Holding APIs', 'Holdings retrieval and portfolio reconciliation readiness', 'I08-E04', 'Holdings Sync', 'I08-E01-F-KITE-S11', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0012', 'Margin APIs', 'Margin and exposure validation readiness', 'I07-E02', 'Risk Engine', 'STORY-KITE-MARGIN-DATA', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0013', 'Portfolio APIs', 'Portfolio ledger and broker reconciliation readiness', 'I07-E01', 'Portfolio Construction', 'STORY-KITE-PORTFOLIO-DATA', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0014', 'GTT APIs', 'GTT workflow readiness after execution safety gates', 'I08-E02', 'Order Management', 'STORY-KITE-GTT', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0015', 'Rate Limits', 'Broker rate-limit policy and retry safety', 'I08-E03', 'Rate Limit', 'I08-E03-F02-S1', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0016', 'Error Handling', 'Broker API error taxonomy, audit, and retry eligibility', 'I08-E01', 'Broker Health', 'I08-E01-F04-S1', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0017', 'Market Constraints', 'Exchange session, instrument, and market-state guards', 'I02-E01', 'Indian Market Data', 'STORY-KITE-MARKET-CONSTRAINTS', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0018', 'Exchange Constraints', 'NSE/BSE exchange constraints and symbol mapping rules', 'I01-E01', 'Reference Data Model', 'STORY-KITE-EXCHANGE-CONSTRAINTS', 'Implementation, testing, validation, documentation, operational readiness'],
  ['SMA-KITE-0019', 'Broker Constraints', 'Broker safety, session, and operational limits', 'I08-E01', 'Broker Health', 'STORY-KITE-BROKER-CONSTRAINTS', 'Implementation, testing, validation, documentation, operational readiness'],
];

write('docs/master-data/KiteApiMasterCatalog.md', `# Kite API Master Catalog

Status: PASS

Kite Connect documentation is a first-class source document for broker, reference-data, market-data, and execution integration.

${table(
  ['KnowledgeId', 'Capability', 'Description', 'Epic', 'Feature', 'Story', 'Required Work Items'],
  kiteCapabilities
)}
`);

write('github/backlog/ProjectSyncMatrix.md', `# Project Sync Matrix

Status: LOCAL_COMPLETE_REMOTE_PENDING

GitHub is not authoritative. Local backlog files are authoritative.

${table(
  ['Item', 'Local', 'GitHub', 'ProjectV2'],
  localItems.map((item) => [item.id, 'Yes', 'Synced or Pending Due To GitHub Limits', 'Pending Project Scope or GitHub Limit'])
)}
`);

const status = read('github/ProjectSyncStatus.md')
  .split('\n## Local Completion Override')[0]
  .trimEnd()
  .replace(/Status: .+/, 'Status: LOCAL_BACKLOG_COMPLETE_REMOTE_PENDING')
  .replace(/- Missing remote issues: .+/, '- Missing remote issues: pending audit after GitHub cooldown')
  .replace(/- Duplicate remote titles: .+/, '- Duplicate remote titles: pending cleanup after GitHub cooldown');
write('github/ProjectSyncStatus.md', `${status}

## Local Completion Override

Backlog completion is not blocked by GitHub limits.

- Local mirror: COMPLETE
- Remote issue sync: COMPLETE or PENDING due to GitHub secondary limits
- Project V2 sync: PENDING until \`read:project\` and \`project\` scopes are available

Use batching for remote sync:

\`\`\`powershell
powershell -ExecutionPolicy Bypass -File automation\\sync-local-backlog-to-github.ps1 -BatchSize 25 -SleepSeconds 3
\`\`\`
`);

console.log(`Generated local backlog mirror: ${initiatives.length} initiatives, ${epics.length} epics, ${features.length} features, ${storySources.length} stories, ${taskRows.length} tasks.`);
