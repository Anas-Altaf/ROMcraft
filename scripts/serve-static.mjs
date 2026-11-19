/** Minimal local preview for the generated out/ directory (no Next server). */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
const port = Number(process.env.PORT || 4173);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const mime = new Map(Object.entries({
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.ico':'image/x-icon', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8',
  '.webmanifest':'application/manifest+json', '.woff2':'font/woff2', '.wasm':'application/wasm',
}));
if (!fs.existsSync(path.join(root,'index.html'))) {
  console.error('Missing out/index.html. Run npm run build first.');
  process.exit(1);
}
http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  if (basePath) {
    if (urlPath === basePath) urlPath = '/';
    else if (urlPath.startsWith(`${basePath}/`)) urlPath = urlPath.slice(basePath.length);
    else { res.writeHead(404); res.end('Not found'); return; }
  }
  const relative = urlPath.replace(/^\/+/, '');
  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  const target = fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()
    ? path.join(candidate, 'index.html') : candidate;
  const found = fs.existsSync(target) && fs.statSync(target).isFile();
  const actual = found ? target : path.join(root,'404.html');
  res.writeHead(found ? 200 : 404, {'Content-Type':mime.get(path.extname(actual)) || 'application/octet-stream'});
  fs.createReadStream(actual).pipe(res);
}).listen(port, ()=>console.log(`Static preview: http://localhost:${port}${basePath || ''}/`));
