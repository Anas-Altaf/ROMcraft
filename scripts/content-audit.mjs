import fs from 'node:fs';
import path from 'node:path';

export const SECTION_FOLDERS = [
  '00-start-here', '01-foundations', '02-guides', '10-devices',
  '20-roms', '30-troubleshooting', '40-security', '50-lab', '90-site-blueprint',
];

const STATUSES = new Set(['field-tested','field-informed','community-report','official-doc','planned']);
const REQUIRED = ['title','description','contentType','status','updated','tags'];
export const slugify = value => value.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');

export function markdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(full) : entry.isFile() && full.endsWith('.md') ? [full] : [];
  });
}

export function collectDocs(projectRoot) {
  const root = path.join(projectRoot, 'content');
  return markdownFiles(root).map(file => {
    const source = fs.readFileSync(file, 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const meta = frontmatter?.[1] ?? '';
    const field = key => (meta.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1] ?? '').trim().replace(/^['"]|['"]$/g, '');
    const body = frontmatter ? source.slice(frontmatter[0].length) : source;
    const relative = path.relative(root, file).split(path.sep).join('/');
    return { file, relative, source, body, meta, field, hasFrontmatter: Boolean(frontmatter) };
  });
}

function stripCode(md) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
}

export function verifyDocs(projectRoot) {
  const docs = collectDocs(projectRoot);
  const errors = [], warnings = [];
  const map = new Map(docs.map(d=>[d.relative, d]));
  for (const doc of docs) {
    const key = doc.relative;
    if (!doc.hasFrontmatter) errors.push(`${key}: missing YAML frontmatter`);
    for (const attr of REQUIRED) if (!doc.field(attr)) errors.push(`${key}: missing ${attr}`);
    if (doc.field('status') && !STATUSES.has(doc.field('status'))) errors.push(`${key}: unknown status ${doc.field('status')}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(doc.field('updated'))) errors.push(`${key}: invalid updated date`);
    if (/\x07|\x00|\x1b/.test(doc.source)) errors.push(`${key}: control character in text`);
    if (/C:\\Users\\|RF[A-Z0-9]{9,12}|(?<!\w)\d{15}(?!\w)/i.test(doc.source)) errors.push(`${key}: possible personal identifier or local path`);
    if (!/^#\s+.+/m.test(doc.body)) warnings.push(`${key}: article lacks H1`);
    const body = stripCode(doc.body);
    for (const match of body.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
      const href = match[1].trim().split(/\s+["']/)[0].replace(/^<|>$/g,'');
      if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) continue;
      const target = href.split('#')[0].split('?')[0];
      if (!target.endsWith('.md')) continue;
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(key),target));
      if (!map.has(resolved)) errors.push(`${key}: broken relative Markdown link: ${href}`);
    }
    if (/\b(?:fastboot|heimdall)\s+flash\s+/i.test(body) && !/rollback|warning|risk|device-specific/i.test(body)) warnings.push(`${key}: flashing command without nearby safety language`);
  }
  const ignored = ['.gitignore','.env.example','package.json'];
  for (const f of ignored) if (!fs.existsSync(path.join(projectRoot,f))) errors.push(`missing root file: ${f}`);
  const site = [
    'src/app/layout.tsx', 'src/app/page.tsx', 'src/app/[section]/page.tsx',
    'src/app/[section]/[...slug]/page.tsx', 'src/app/search/page.tsx',
    'src/app/robots.ts', 'src/app/sitemap.ts', 'src/app/manifest.ts',
  ];
  for (const f of site) if (!fs.existsSync(path.join(projectRoot,f))) errors.push(`missing application route: ${f}`);
  return { docs: docs.length, sections: SECTION_FOLDERS.length, errors, warnings };
}
