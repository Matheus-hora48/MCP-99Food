#!/usr/bin/env node
// Gera docs/INDEX.md a partir de docs/index.json (árvore navegável com contagem de imagens).
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const idx = JSON.parse(await readFile(path.join(DOCS, 'index.json'), 'utf8'));

const lines = [
  '# Documentação 99Food Open Platform — índice',
  '',
  `Fonte: <${idx.source}> · idioma \`${idx.lang}\` · coletado em ${idx.crawledAt}`,
  '',
  `${idx.pages.length} páginas · ${Object.keys(idx.imageSources).length} imagens · ${Object.keys(idx.attachments ?? {}).length} anexos`,
  '',
];
let last = [];
for (const p of idx.pages) {
  const dirs = p.breadcrumb.slice(0, -1);
  dirs.forEach((d, i) => {
    if (last[i] !== d) lines.push(`${'#'.repeat(Math.min(i + 2, 6))} ${d}`, '');
  });
  last = dirs;
  const imgs = p.images.length ? ` — 🖼 ${p.images.length} imagem(ns)` : '';
  lines.push(`- [${p.title}](${p.file}) · id ${p.id}${imgs}`);
  if (p === idx.pages.at(-1) || idx.pages[idx.pages.indexOf(p) + 1].breadcrumb.slice(0, -1).join('>') !== dirs.join('>')) lines.push('');
}
if (idx.attachments && Object.keys(idx.attachments).length) {
  lines.push('## Anexos (specs OpenAPI e tutoriais)', '');
  for (const [url, dir] of Object.entries(idx.attachments)) lines.push(`- [\`${dir}/\`](${dir}/) ← ${url}`);
  lines.push('');
}
if (idx.failedImages?.length) {
  lines.push('## Não baixados', '');
  for (const f of [...new Map(idx.failedImages.map((x) => [x.url, x])).values()]) lines.push(`- ${f.url} (${f.erro})`);
  lines.push('');
}
await writeFile(path.join(DOCS, 'INDEX.md'), lines.join('\n'));
console.log('docs/INDEX.md gerado');
