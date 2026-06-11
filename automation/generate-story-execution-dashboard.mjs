import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const backlogRoot = path.join(root, 'github', 'backlog');
const storiesDir = path.join(backlogRoot, 'Stories');
const completedDir = path.join(backlogRoot, 'Completed');
const implementationDir = path.join(root, 'docs', 'implementation');

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const read = (file) => fs.readFileSync(file, 'utf8');
const write = (file, content) => fs.writeFileSync(file, content.replace(/\r?\n/g, '\n'), 'utf8');
const esc = (value) => String(value ?? '').replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();

ensureDir(implementationDir);
ensureDir(completedDir);

const allowedStatuses = new Set([
  'Not Started',
  'Ready',
  'In Progress',
  'Implementation Complete',
  'Audit Review',
  'Security Review',
  'Acceptance Review',
  'Traceability Review',
  'Ready For Closure',
  'Closed',
  'Blocked',
  'Deferred',
]);

const field = (content, names) => {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const plain = content.match(new RegExp(`^${escaped}:\\s*(.+)$`, 'im'));
    if (plain) return plain[1].trim();
    const bold = content.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'im'));
    if (bold) return bold[1].trim();
  }
  return '';
};

const heading = (content, fallback) => {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.replace(/^[^:]+:\s*/, '').trim() || fallback;
};

const markdownRows = (markdown) => markdown
  .split(/\r?\n/)
  .filter((line) => /^\|.*\|$/.test(line) && !/^\|\s*-+/.test(line))
  .map((line) => line.slice(1, -1).split('|').map((cell) => cell.trim()));

const loadRegistry = () => {
  const registryPath = path.join(backlogRoot, 'StoryRegistry.md');
  if (!fs.existsSync(registryPath)) return new Map();
  const rows = markdownRows(read(registryPath)).filter((row) => row[0] !== 'Story Id');
  return new Map(rows.map((row) => [row[0], {
    storyId: row[0],
    knowledgeIds: row[1],
    epic: row[2],
    feature: row[3],
    githubIssue: row[4],
    localStoryFile: row[5],
    status: row[6],
    implementationStatus: row[7],
    auditStatus: row[8],
    securityStatus: row[9],
    acceptanceStatus: row[10],
    closureStatus: row[11],
  }]));
};

const loadProjectSync = () => {
  const syncPath = path.join(backlogRoot, 'ProjectSyncMatrix.md');
  if (!fs.existsSync(syncPath)) return new Map();
  const rows = markdownRows(read(syncPath)).filter((row) => row[0] !== 'Item');
  return new Map(rows.map((row) => [row[0], {
    githubExists: row[2],
    projectExists: row[3],
    syncStatus: row[4],
    reason: row[5],
  }]));
};

const storyFiles = [
  ...(fs.existsSync(storiesDir) ? fs.readdirSync(storiesDir).filter((name) => name.endsWith('.md')).map((name) => ({ name, dir: storiesDir, baseStatus: 'Not Started' })) : []),
  ...(fs.existsSync(completedDir) ? fs.readdirSync(completedDir).filter((name) => name.endsWith('.md')).map((name) => ({ name, dir: completedDir, baseStatus: 'Closed' })) : []),
];

const completedStoryIds = new Set();
for (const item of storyFiles) {
  if (item.baseStatus !== 'Closed') continue;
  const content = read(path.join(item.dir, item.name));
  completedStoryIds.add(field(content, ['Story Id']) || path.basename(item.name, '.md'));
}

const registry = loadRegistry();
const projectSync = loadProjectSync();

const parseDependencies = (value) => {
  if (!value) return [];
  const storyIds = value.match(/[A-Z]{1,8}\d{0,4}-E\d{1,4}(?:-[A-Z0-9]+)*-S\d+|STORY-[A-Z0-9-]+/g) || [];
  return [...new Set(storyIds)];
};

const rows = storyFiles.map((item) => {
  const file = path.join(item.dir, item.name);
  const content = read(file);
  const storyId = field(content, ['Story Id']) || path.basename(item.name, '.md');
  const registryRow = registry.get(storyId) || {};
  const storyName = heading(content, storyId);
  const dependencies = field(content, ['Dependencies']) || 'No blocking story dependency declared';
  const dependencyIds = parseDependencies(dependencies);
  const blockedBy = dependencyIds.filter((dependencyId) => !completedStoryIds.has(dependencyId));
  const localStoryFile = path.relative(root, file).replace(/\\/g, '/');
  const rawStatus = registryRow.status || item.baseStatus;
  const status = item.baseStatus === 'Closed'
    ? 'Closed'
    : blockedBy.length > 0
      ? 'Blocked'
      : rawStatus === 'Open' || rawStatus === 'Not Started'
        ? 'Ready'
        : allowedStatuses.has(rawStatus)
          ? rawStatus
          : 'Not Started';
  const implementationStatus = registryRow.implementationStatus || (status === 'Closed' ? 'Implementation Complete' : 'Not Started');
  const traceabilityStatus = status === 'Closed' ? 'PASS' : 'Required';
  const sync = projectSync.get(storyId);
  const githubIssue = registryRow.githubIssue || (sync ? sync.githubExists : 'Synced or blocked by GitHub API limits');
  const completion = status === 'Closed'
    ? 100
    : status === 'Ready For Closure'
      ? 90
      : status === 'Traceability Review'
        ? 80
        : status === 'Acceptance Review'
          ? 70
          : status === 'Security Review'
            ? 60
            : status === 'Audit Review'
              ? 50
              : status === 'Implementation Complete'
                ? 40
                : status === 'In Progress'
                  ? 20
                  : 0;

  return {
    storyId,
    storyName,
    knowledgeIds: field(content, ['KnowledgeIds', 'Knowledge IDs']) || registryRow.knowledgeIds || 'Mapped through SourceTraceabilityMatrix',
    initiative: field(content, ['Initiative']) || 'Mapped Initiative',
    epic: field(content, ['Epic']) || registryRow.epic || 'Mapped Epic',
    feature: field(content, ['Feature']) || registryRow.feature || 'Mapped Feature',
    dependencies,
    priority: field(content, ['Priority']) || 'medium-priority',
    status,
    implementationStatus,
    auditStatus: registryRow.auditStatus || 'Required',
    securityStatus: registryRow.securityStatus || 'Required',
    acceptanceStatus: registryRow.acceptanceStatus || 'Required',
    traceabilityStatus,
    githubIssue,
    localStoryFile,
    assignedTo: field(content, ['Assigned To', 'Owner']) || 'Repository Owner',
    blockedBy: blockedBy.join(', ') || 'None',
    completion,
  };
});

rows.sort((a, b) => a.storyId.localeCompare(b.storyId));

const dashboardHeaders = [
  'Story Id',
  'Story Name',
  'KnowledgeIds',
  'Initiative',
  'Epic',
  'Feature',
  'Dependencies',
  'Priority',
  'Status',
  'Implementation Status',
  'Audit Status',
  'Security Status',
  'Acceptance Status',
  'Traceability Status',
  'GitHub Issue',
  'Local Story File',
  'Assigned To',
  'Blocked By',
  'Completion %',
];

const dashboard = `# Story Execution Dashboard

Status: ACTIVE

Source of truth: repository backlog.

Generated: ${new Date().toISOString()}

Allowed status values: ${[...allowedStatuses].join(', ')}

| ${dashboardHeaders.join(' | ')} |
| ${dashboardHeaders.map(() => '---').join(' | ')} |
${rows.map((row) => `| ${[
  row.storyId,
  row.storyName,
  row.knowledgeIds,
  row.initiative,
  row.epic,
  row.feature,
  row.dependencies,
  row.priority,
  row.status,
  row.implementationStatus,
  row.auditStatus,
  row.securityStatus,
  row.acceptanceStatus,
  row.traceabilityStatus,
  row.githubIssue,
  row.localStoryFile,
  row.assignedTo,
  row.blockedBy,
  `${row.completion}%`,
].map(esc).join(' | ')} |`).join('\n')}
`;

write(path.join(implementationDir, 'StoryExecutionDashboard.md'), dashboard);

const count = (predicate) => rows.filter(predicate).length;
const total = rows.length;
const completed = count((row) => row.status === 'Closed');
const blocked = count((row) => row.status === 'Blocked');
const ready = count((row) => row.status === 'Ready');
const failed = count((row) => /failed/i.test(`${row.auditStatus} ${row.securityStatus} ${row.acceptanceStatus} ${row.traceabilityStatus}`));
const coverage = total === 0 ? 0 : Math.round((rows.filter((row) => row.knowledgeIds && row.epic && row.feature && row.localStoryFile).length / total) * 10000) / 100;

const progressTable = (label, key) => {
  const grouped = new Map();
  for (const row of rows) {
    const group = row[key] || `Mapped ${label}`;
    const current = grouped.get(group) || { total: 0, complete: 0 };
    current.total += 1;
    if (row.status === 'Closed') current.complete += 1;
    grouped.set(group, current);
  }
  const headers = [label, 'Total Stories', 'Completed Stories', 'Progress %'];
  const groupRows = [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => [name, value.total, value.complete, `${Math.round((value.complete / value.total) * 10000) / 100}%`]);
  return `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${groupRows.map((row) => `| ${row.map(esc).join(' | ')} |`).join('\n')}`;
};

const metrics = `# Execution Metrics

Status: ACTIVE

Generated: ${new Date().toISOString()}

| Metric | Value |
| --- | ---: |
| Total Stories | ${total} |
| Completed Stories | ${completed} |
| Blocked Stories | ${blocked} |
| Ready Stories | ${ready} |
| Failed Stories | ${failed} |
| Coverage % | ${coverage}% |

## Epic Progress

${progressTable('Epic', 'epic')}

## Initiative Progress

${progressTable('Initiative', 'initiative')}
`;

write(path.join(implementationDir, 'ExecutionMetrics.md'), metrics);

console.log(`Generated StoryExecutionDashboard.md and ExecutionMetrics.md for ${total} stories.`);
console.log(`Ready: ${ready}; Blocked: ${blocked}; Completed: ${completed}; Coverage: ${coverage}%`);
