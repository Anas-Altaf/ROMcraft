import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectDocs, slugify, verifyDocs } from '../scripts/content-audit.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('all Markdown articles have valid metadata and resolvable internal links', () => {
  const result = verifyDocs(root);
  assert.equal(result.errors.length, 0, result.errors.join('\n'));
  assert.ok(result.docs >= 60);
});
test('Galaxy A10 evidence and recovery case study are included', () => {
  const docs = collectDocs(root);
  for(const chapter of ['device-dossier','verified-backups','lineageos-23-install','eos-4-install','incident-ledger']) {
    assert.ok(docs.some(d=>d.relative.endsWith(`/`+chapter+'.md')), `Missing ${chapter}`);
  }
});
test('Windows ADB examples do not include control characters', () => {
  for(const doc of collectDocs(root)) assert.ok(!doc.source.includes('\x07'), doc.relative);
});
test('heading slug normalization is predictable', () => {
  assert.equal(slugify('TWRP + Magisk — Recovery Mode'), 'twrp-magisk-recovery-mode');
});
test('no binary firmware content is included', () => {
  for (const doc of collectDocs(root)) assert.ok(doc.relative.endsWith('.md'));
});
