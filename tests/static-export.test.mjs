import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

test('Next.js is configured for portable static export',()=>{
  const config=read('next.config.ts');
  assert.match(config,/output: ["']export["']/);
  assert.match(config,/trailingSlash: true/);
  assert.match(config,/basePath/);
  assert.doesNotMatch(config,/async headers\s*\(/);
});

test('all runtime request-specific Next.js features are absent',()=>{
  const search=read('src/app/search/page.tsx');
  assert.doesNotMatch(search,/searchParams/);
  assert.match(read('src/components/SearchClient.tsx'),/URLSearchParams\(window.location.search\)/);
  assert.match(read('src/app/feed.xml/route.ts'),/dynamic = ["']force-static["']/);
  assert.match(read('src/app/[section]/[...slug]/page.tsx'),/generateStaticParams/);
  assert.match(read('src/app/[section]/page.tsx'),/generateStaticParams/);
});

test('GitHub Pages workflow publishes out directory using official actions',()=>{
  const workflow=read('.github/workflows/deploy-pages.yml');
  for(const x of ['actions/configure-pages@v5','actions/upload-pages-artifact@v3','actions/deploy-pages@v4','npm run verify','path: out','PAGES_BASE_PATH']) assert.ok(workflow.includes(x),x);
  assert.ok(fs.existsSync(path.join(root,'public/.nojekyll')));
  assert.ok(fs.existsSync(path.join(root,'public/og-card.png')));
});

test('canonical, RSS, and social URLs respect the deployment origin',()=>{
  assert.match(read('src/lib/seo.ts'),/absoluteUrl\(pathname\)/);
  assert.match(read('src/app/layout.tsx'),/absoluteUrl\("\/feed.xml"\)/);
  assert.match(read('src/app/manifest.ts'),/absoluteUrl\("\/"\)/);
});
