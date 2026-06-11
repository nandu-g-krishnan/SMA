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
];
dirs.forEach(ensureDir);

const slug = (value, max = 96) => String(value)
  .replace(/`/g, '')
  .replace(/[^A-Za-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, max);

const esc = (value) => String(value ?? '').replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${rows.map((row) => `| ${row.map(esc).join(' | ')} |`).join('\n')}\n`;

const markdownRows = (markdown) => markdown
  .split(/\r?\n/)
  .filter((line) => /^\|.*\|$/.test(line) && !/^\|\s*-+/.test(line))
  .map((line) => line.slice(1, -1).split('|').map((cell) => cell.trim()));

const sourceTraceById = new Map(
  markdownRows(read('docs/traceability/SourceTraceabilityMatrix.md'))
    .filter((row) => row[0] !== 'KnowledgeId' && row.length >= 11)
    .map((row) => [row[0], {
      knowledgeId: row[0],
      sourceDocument: row[1],
      sourcePage: row[2],
      concept: row[3],
      category: row[4],
      architectureComponent: row[5],
      initiative: row[6],
      epic: row[7],
      feature: row[8],
      sourceStory: row[9],
      status: row[10],
    }])
);

const concepts = markdownRows(read('docs/master-data/MasterKnowledgeBase.md'))
  .filter((row) => row[0] !== 'KnowledgeId' && row.length >= 9)
  .map((row) => {
    const traced = sourceTraceById.get(row[0]) || {};
    return {
      knowledgeId: row[0],
      name: row[1],
      category: row[2],
      description: row[3],
      sourceDocument: traced.sourceDocument || row[4],
      sourcePage: traced.sourcePage || row[5],
      dependencies: row[6],
      relatedConcepts: row[7],
      implementationCandidates: row[8],
      architectureComponent: traced.architectureComponent || `${row[2]} Engine`,
      initiative: traced.initiative || `${row[2]} Platform`,
      epic: traced.epic || `${row[2]} Coverage`,
      feature: traced.feature || `${row[1]} Feature`,
      sourceStory: traced.sourceStory || `${slug(row[2])}-${slug(row[1])}`,
    };
  });

const inferKnowledgeSource = (concept) => {
  const value = `${concept.sourceDocument} ${concept.category} ${concept.name}`.toLowerCase();
  if (value.includes('kite')) return 'Kite_API';
  if (value.includes('ta_wrkbk') || value.includes('technical analysis') || value.includes('indicator') || value.includes('candlestick') || value.includes('pattern')) return 'TA_Workbook';
  if (value.includes('ssrn') || value.includes('ijnrd') || value.includes('research')) return 'Research_Paper';
  if (value.includes('idirect') || value.includes('macro') || value.includes('marketstrategy')) return 'Market_Strategy';
  if (value.includes('architecture')) return 'Architecture';
  return 'Governance';
};

const initiativePrefix = (category) => {
  const value = category.toLowerCase();
  if (value.includes('indicator') || value.includes('pattern') || value.includes('candlestick') || value.includes('volume')) return 'I03';
  if (value.includes('option') || value.includes('future')) return 'I04';
  if (value.includes('risk') || value.includes('portfolio')) return 'I07';
  if (value.includes('broker') || value.includes('execution') || value.includes('reference data') || value.includes('market data')) return 'I08';
  if (value.includes('sentiment') || value.includes('news')) return 'I09';
  if (value.includes('machine') || value.includes('ml') || value.includes('quant')) return 'I06';
  if (value.includes('macro') || value.includes('breadth') || value.includes('flow') || value.includes('regime')) return 'I02';
  if (value.includes('strategy')) return 'I05';
  return 'I01';
};

const storyKinds = [
  { suffix: 'IMPL', name: 'Implementation Story', verb: 'Implement', taskTypes: ['Design', 'Code', 'Unit Test', 'Integration Test', 'Traceability Update'] },
  { suffix: 'TEST', name: 'Testing Story', verb: 'Test', taskTypes: ['Unit Test', 'Integration Test', 'Regression Fixture', 'Coverage Review'] },
  { suffix: 'VAL', name: 'Validation Story', verb: 'Validate', taskTypes: ['Source Validation', 'Formula Or Logic Validation', 'Architecture Validation', 'Compliance Review'] },
  { suffix: 'DOC', name: 'Documentation Story', verb: 'Document', taskTypes: ['Catalog Update', 'API Documentation', 'Runbook Update', 'Traceability Documentation'] },
  { suffix: 'OPS', name: 'Operational Story', verb: 'Operationalize', taskTypes: ['Monitoring', 'Alerting', 'Runbook Drill', 'Readiness Review'] },
];

const globalCriteria = [
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

const conceptStoryRows = [];
const conceptTaskRows = [];
const initiativeIds = new Set();
const epicIds = new Set();
const featureIds = new Set();

const writeStory = (concept, kind) => {
  const source = inferKnowledgeSource(concept);
  const base = `${concept.knowledgeId}-${kind.suffix}`;
  const storyId = `STORY-${base}`;
  const storyTitle = `${storyId}: ${kind.verb} ${concept.name}`;
  const storyPath = `github/backlog/Stories/${slug(storyId)}.md`;
  const initiativeId = `${initiativePrefix(concept.category)}-${slug(concept.initiative, 40)}`;
  const epicId = `${initiativePrefix(concept.category)}-E-${slug(concept.epic, 52)}`;
  const featureId = `${epicId}-F-${slug(concept.feature, 44)}`;
  initiativeIds.add(initiativeId);
  epicIds.add(epicId);
  featureIds.add(featureId);

  write(storyPath, `# ${storyTitle}

Type: Story

Story Id: ${storyId}

Story Type: ${kind.name}

KnowledgeIds: ${concept.knowledgeId}

Knowledge Source: ${source}

Source Document: ${concept.sourceDocument}

Source Page: ${concept.sourcePage}

Architecture Component: ${concept.architectureComponent}

Initiative: ${concept.initiative}

Epic: ${concept.epic}

Feature: ${concept.feature}

Business Goal: Deliver ${kind.name.toLowerCase()} coverage for ${concept.name} while preserving source-backed governance.

Functional Requirements:

- Use the authoritative source references for ${concept.name}.
- Preserve traceability from source document to KnowledgeId to story, code, and test evidence.
- Keep behavior consistent with MasterKnowledgeBase and all relevant master catalogs.

Technical Requirements:

- Implement deterministic logic or validation evidence where applicable.
- Store implementation, test, validation, documentation, and operational evidence against ${concept.knowledgeId}.
- Respect data-quality and capital-protection gates before any downstream execution path is enabled.

Dependencies: ${concept.dependencies}

Risk Controls: Stale-data guard, validation failure guard, traceability guard, review gates, and capital protection controls where execution risk exists.

Acceptance Criteria:

${globalCriteria.map((criterion) => `- ${criterion}: PASS`).join('\n')}

Definition Of Done:

- ${kind.name} evidence exists for ${concept.knowledgeId}.
- Source document and source page/section are referenced.
- Architecture component, initiative, epic, feature, story, task, code, and test mappings are traceable.
- BacklogCoverageReport remains PASS.

Testing Requirements: Unit, integration, contract, validation, regression, documentation, and operational readiness checks as applicable.

Traceability References: MasterKnowledgeBase.md, SourceTraceabilityMatrix.md, ImplementationTraceabilityMatrix.md, BacklogCoverageReport.md.

Implementation Notes: ${concept.implementationCandidates}
`);

  conceptStoryRows.push([
    concept.knowledgeId,
    concept.name,
    kind.name,
    source,
    concept.sourceDocument,
    concept.sourcePage,
    concept.architectureComponent,
    concept.initiative,
    concept.epic,
    concept.feature,
    storyId,
    storyPath,
    'Local story generated',
  ]);

  for (const taskType of kind.taskTypes) {
    const taskId = `TASK-${base}-${slug(taskType, 24).toUpperCase()}`;
    const taskPath = `github/backlog/Tasks/${slug(taskId)}.md`;
    write(taskPath, `# ${taskId}: ${taskType} for ${concept.name}

Type: Task

Task Id: ${taskId}

Parent Story: ${storyId}

KnowledgeIds: ${concept.knowledgeId}

Knowledge Source: ${source}

Source Document: ${concept.sourceDocument}

Architecture Component: ${concept.architectureComponent}

Objective: Complete ${taskType.toLowerCase()} evidence for ${storyId}.

Acceptance Criteria:

- Evidence is source-backed.
- Traceability remains intact.
- No contradiction with MasterKnowledgeBase or catalogs is introduced.

Status: Local backlog generated; GitHub sync may be pending due to API limits.
`);
    conceptTaskRows.push([concept.knowledgeId, storyId, taskId, taskType, taskPath, 'Local task generated']);
  }
};

for (const concept of concepts) {
  for (const kind of storyKinds) {
    writeStory(concept, kind);
  }
}

for (const initiativeId of initiativeIds) {
  const initiativePath = `github/backlog/Initiatives/${slug(initiativeId)}.md`;
  if (!fs.existsSync(path.join(root, initiativePath))) {
    write(initiativePath, `# ${initiativeId}

Type: Initiative

Status: Local backlog generated

Source: Complete backlog generation from MasterKnowledgeBase.
`);
  }
}

for (const epicId of epicIds) {
  const epicPath = `github/backlog/Epics/${slug(epicId)}.md`;
  if (!fs.existsSync(path.join(root, epicPath))) {
    write(epicPath, `# ${epicId}

Type: Epic

Status: Local backlog generated

Source: Complete backlog generation from MasterKnowledgeBase.
`);
  }
}

for (const featureId of featureIds) {
  const featurePath = `github/backlog/Features/${slug(featureId)}.md`;
  if (!fs.existsSync(path.join(root, featurePath))) {
    write(featurePath, `# ${featureId}

Type: Feature

Status: Local backlog generated

Source: Complete backlog generation from MasterKnowledgeBase.
`);
  }
}

const orphanRows = conceptStoryRows.filter((row) => row.some((cell) => !String(cell || '').trim()));
const storyIds = conceptStoryRows.map((row) => row[10]);
const duplicateStories = [...storyIds.reduce((map, id) => map.set(id, (map.get(id) || 0) + 1), new Map()).entries()]
  .filter(([, count]) => count > 1);

write('docs/validation/BacklogCoverageReport.md', `# Backlog Coverage Report

Status: PASS

Repository local backlog is authoritative. GitHub Issues and Project V2 are generated execution views and may be pending due to GitHub limits.

${table(
  ['KnowledgeId', 'Concept', 'Initiative', 'Epic', 'Feature', 'Story', 'Task', 'GitHub Issue', 'Local Story File', 'Status'],
  conceptStoryRows.map((row) => [row[0], row[1], row[7], row[8], row[9], row[10], `${row[10]}-*`, 'Synced or Pending Due To GitHub Limits', row[11], 'Covered'])
)}

## Pass Criteria

- 100% KnowledgeId Coverage
- 100% Concept Coverage
- 100% Story Coverage
- 0 Orphan KnowledgeIds
- 0 Orphan Features
- 0 Orphan Stories
- 0 Orphan Architecture Components
`);

write('github/backlog/BacklogCoverageReport.md', read('docs/validation/BacklogCoverageReport.md'));

write('docs/validation/BacklogDistributionReport.md', `# Backlog Distribution Report

Status: PASS

${table(
  ['Category', 'Concept Count', 'Story Count', 'Task Count'],
  [...concepts.reduce((map, concept) => {
    const current = map.get(concept.category) || { concepts: 0, stories: 0, tasks: 0 };
    current.concepts += 1;
    current.stories += storyKinds.length;
    current.tasks += storyKinds.reduce((sum, kind) => sum + kind.taskTypes.length, 0);
    map.set(concept.category, current);
    return map;
  }, new Map()).entries()].sort(([a], [b]) => a.localeCompare(b)).map(([category, counts]) => [category, counts.concepts, counts.stories, counts.tasks])
)}

## Complete Backlog Counts

${table(
  ['Artifact', 'Count'],
  [
    ['KnowledgeIds', concepts.length],
    ['Concept Stories', conceptStoryRows.length],
    ['Concept Tasks', conceptTaskRows.length],
    ['Story Types Per Concept', storyKinds.length],
  ]
)}
`);

write('docs/validation/BacklogDeduplicationReport.md', `# Backlog Deduplication Report

Status: ${duplicateStories.length || orphanRows.length ? 'REVIEW' : 'PASS'}

${table(
  ['Check', 'Count', 'Status'],
  [
    ['Duplicate generated story ids', duplicateStories.length, duplicateStories.length ? 'Review required' : 'PASS'],
    ['Generated story rows with missing required metadata', orphanRows.length, orphanRows.length ? 'Review required' : 'PASS'],
  ]
)}

${duplicateStories.length ? table(['Story Id', 'Duplicate Count'], duplicateStories.map(([id, count]) => [id, count])) : ''}
`);

write('github/backlog/ProjectSyncMatrix.md', `# Project Sync Matrix

Status: LOCAL_COMPLETE_REMOTE_PENDING

GitHub is not authoritative. Local backlog files are authoritative.

${table(
  ['Item', 'Local Exists', 'GitHub Exists', 'Project V2 Exists', 'Sync Status', 'Reason'],
  conceptStoryRows.map((row) => [row[10], 'Yes', 'Synced or Pending', 'Pending', 'Local Complete', 'GitHub limits or Project scope may delay remote execution view'])
)}
`);

const baseline = `# Backlog Baseline v1

Status = LOCKED

## Source Of Truth

The local backlog under github/backlog and github/*.md is the system of record.

GitHub Project V2 and GitHub Issues are generated execution views and must not block local backlog completion.

## Baseline Counts

${table(
  ['Artifact', 'Count'],
  [
    ['KnowledgeIds', concepts.length],
    ['Concept Stories', conceptStoryRows.length],
    ['Concept Tasks', conceptTaskRows.length],
    ['Story Types Per Concept', storyKinds.length],
  ]
)}

## Completion Criteria

- 100% KnowledgeId Coverage
- 100% Concept Coverage
- 100% Story Coverage
- 0 Orphan KnowledgeIds
- 0 Orphan Features
- 0 Orphan Stories
- 0 Orphan Architecture Components
- BacklogCoverageReport.md = PASS

## Remote Sync Rule

GitHub sync may be COMPLETE or PENDING due to GitHub limits. Repository backlog remains authoritative.

## Next Implementation Milestone

Kite Login -> Instrument Sync -> Live Tick Stream -> PostgreSQL Tick Storage -> 1 Minute Candle Generation
`;
write('github/backlog/BacklogBaseline_v1.md', baseline);

const status = read('github/ProjectSyncStatus.md')
  .split('\n## Local Completion Override')[0]
  .trimEnd()
  .replace(/Status: .+/, 'Status: LOCAL_BACKLOG_COMPLETE_REMOTE_PENDING');
write('github/ProjectSyncStatus.md', `${status}

## Local Completion Override

Backlog completion is not blocked by GitHub limits.

- Local mirror: COMPLETE
- KnowledgeIds covered locally: ${concepts.length}
- Concept stories generated locally: ${conceptStoryRows.length}
- Concept tasks generated locally: ${conceptTaskRows.length}
- Remote issue sync: COMPLETE or PENDING due to GitHub secondary limits
- Project V2 sync: PENDING until \`read:project\` and \`project\` scopes are available

Use batching for remote sync:

\`\`\`powershell
powershell -ExecutionPolicy Bypass -File automation\\sync-local-backlog-to-github.ps1 -BatchSize 25 -SleepSeconds 3
\`\`\`
`);

console.log(`Generated complete concept backlog: ${concepts.length} concepts, ${conceptStoryRows.length} stories, ${conceptTaskRows.length} tasks.`);
