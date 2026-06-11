import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const backlogRoot = path.join(root, 'github', 'backlog');
const storyDirs = [
  { dir: path.join(backlogRoot, 'Stories'), defaultStatus: 'Open' },
  { dir: path.join(backlogRoot, 'Completed'), defaultStatus: 'Closed' },
];

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const read = (file) => fs.readFileSync(file, 'utf8');
const write = (file, content) => fs.writeFileSync(file, content.replace(/\r?\n/g, '\n'), 'utf8');
const esc = (value) => String(value ?? '').replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();

[
  'Initiatives',
  'Epics',
  'Features',
  'Stories',
  'Tasks',
  'Completed',
  'Archive',
].forEach((dir) => ensureDir(path.join(backlogRoot, dir)));

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

const titleId = (content, fallback) => {
  const heading = content.match(/^#\s+([^:\r\n]+)(?::|\r?\n)/m);
  return heading?.[1]?.trim() || fallback;
};

const files = [];
for (const storyDir of storyDirs) {
  if (!fs.existsSync(storyDir.dir)) continue;
  for (const entry of fs.readdirSync(storyDir.dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.md')) continue;
    if (entry.name.toLowerCase() === '.gitkeep') continue;
    const file = path.join(storyDir.dir, entry.name);
    files.push({
      file,
      relative: path.relative(root, file).replace(/\\/g, '/'),
      defaultStatus: storyDir.defaultStatus,
    });
  }
}

files.sort((a, b) => a.relative.localeCompare(b.relative));

const rows = files.map((item) => {
  const content = read(item.file);
  const storyId = field(content, ['Story Id']) || titleId(content, path.basename(item.file, '.md'));
  const knowledgeIds = field(content, ['KnowledgeIds', 'Knowledge IDs']) || 'Mapped through SourceTraceabilityMatrix';
  const epic = field(content, ['Epic']) || 'Mapped Epic';
  const feature = field(content, ['Feature']) || 'Mapped Feature';
  const status = field(content, ['Lifecycle Status', 'Status']) || item.defaultStatus;
  const githubIssue = field(content, ['GitHub Issue']) || 'Synced or blocked by GitHub API limits';
  const implementationStatus = item.defaultStatus === 'Closed' ? 'Implementation Complete' : 'Not Started';
  const auditStatus = item.defaultStatus === 'Closed' ? 'PASS evidence required' : 'Required';
  const securityStatus = item.defaultStatus === 'Closed' ? 'PASS evidence required' : 'Required';
  const acceptanceStatus = item.defaultStatus === 'Closed' ? 'PASS evidence required' : 'Required';
  const closureStatus = item.defaultStatus === 'Closed' ? 'Closed' : 'Not Ready';

  return [
    storyId,
    knowledgeIds,
    epic,
    feature,
    githubIssue,
    item.relative,
    status,
    implementationStatus,
    auditStatus,
    securityStatus,
    acceptanceStatus,
    closureStatus,
  ];
});

const header = [
  'Story Id',
  'KnowledgeIds',
  'Epic',
  'Feature',
  'GitHub Issue',
  'Local Story File',
  'Status',
  'Implementation Status',
  'Audit Status',
  'Security Status',
  'Acceptance Status',
  'Closure Status',
];

const generatedAt = new Date().toISOString();
const markdown = `# Story Registry

Status: ACTIVE

Generated: ${generatedAt}

Local story count: ${rows.length}

| ${header.join(' | ')} |
| ${header.map(() => '---').join(' | ')} |
${rows.map((row) => `| ${row.map(esc).join(' | ')} |`).join('\n')}
`;

write(path.join(backlogRoot, 'StoryRegistry.md'), markdown);

console.log(`Generated github/backlog/StoryRegistry.md with ${rows.length} stories.`);
