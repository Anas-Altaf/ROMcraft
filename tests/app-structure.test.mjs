import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

test('Next.js App Router and SEO conventions are present',()=>{
  for (const route of ['layout.tsx','page.tsx','robots.ts','sitemap.ts','manifest.ts','opengraph-image.tsx','feed.xml/route.ts','search/page.tsx','[section]/[...slug]/page.tsx']) {
    assert.ok(fs.existsSync(path.join(root,'src/app',route)),route);
  }
  assert.match(read('src/app/layout.tsx'),/skip-link/);
  assert.match(read('src/app/robots.ts'),/publicSite/);
  assert.match(read('src/app/[section]/[...slug]/page.tsx'),/TechArticle/); // schema helper occurs in source as literal
});
test('search is keyboard accessible and supports section filtering',()=>{
  const file=read('src/components/SearchClient.tsx');
  assert.match(file,/aria-live/);
  assert.match(file,/aria-pressed/);
  assert.match(file,/aria-label="Filter by section"/);
  assert.match(file,/window\.history\.replaceState/);
});
test('theme and mobile menu expose accessible controls',()=>{
  assert.match(read('src/components/SiteHeader.tsx'),/aria-expanded/);
  assert.match(read('src/components/SiteHeader.tsx'),/aria-current/);
  assert.match(read('src/components/ThemeToggle.tsx'),/aria-pressed/);
  assert.match(read('src/app/globals.css'),/prefers-reduced-motion/);
});
test('repository contains no binary firmware or logged private research',()=>{
  function walk(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);}
  const forbidden=/\.(?:img|pcap|pcapng|tar|zip|apk|md5|log|keystore)$/i;
  const matches=walk(root).filter(x=>forbidden.test(x));
  assert.deepEqual(matches, []);
});
test('configuration selects maintained Next.js 16 and React 19',()=>{
  const data=JSON.parse(read('package.json'));
  assert.match(data.dependencies.next,/^16\./);
  assert.match(data.dependencies.react,/^19\./);
  assert.ok(data.scripts.verify);
});
