#!/usr/bin/env node
// Baixa a documentação da Open Platform da 99Food (árvore, markdown e imagens)
// para ./docs. A API exige uma assinatura (wsgsig) gerada pelo JS da própria
// página, então as chamadas são feitas de dentro de um Chrome headless.
//
// Uso: npm run crawl [-- --lang pt-BR] [--chrome /caminho/do/chrome]
import { chromium } from 'playwright-core';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const LANG = opt('lang', 'pt-BR');
const CHROME = opt('chrome', process.env.CHROME_PATH || '/usr/bin/google-chrome-stable');
const SITE = 'https://developer-food.99app.com';
const API = 'https://openplatform-portal-food.99app.com/docs/v1/node';
const OUT = path.join(ROOT, 'docs');
const IMG_DIR = path.join(OUT, 'images');
const ATT_DIR = path.join(OUT, 'attachments');

const slug = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60) || 'sem-titulo';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ locale: LANG });
  await page.goto(`${SITE}/${LANG}/openapi`, { waitUntil: 'networkidle', timeout: 90000 });

  const api = (endpoint, query) =>
    page.evaluate(
      async ([url]) => {
        const r = await fetch(url);
        return r.json();
      },
      [`${API}/${endpoint}?${new URLSearchParams({ lang: LANG, ...query })}`],
    );

  const treeResp = await api('nodetreeget', {});
  if (treeResp.errno) throw new Error(`nodetreeget falhou: ${JSON.stringify(treeResp)}`);
  const tree = treeResp.data.tree;

  // Caminha a árvore guardando o caminho de títulos de cada nó.
  const leaves = [];
  const walk = (nodes, trail) => {
    nodes.forEach((n, idx) => {
      const here = [...trail, { id: n.id, title: n.title, idx: idx + 1 }];
      if (n.is_leaf === 1 || !n.children?.length) leaves.push({ id: n.id, title: n.title, trail: here });
      if (n.children?.length) walk(n.children, here);
    });
  };
  for (const [key, list] of Object.entries(tree)) {
    if (Array.isArray(list)) walk(list, []);
    else console.warn(`[aviso] chave inesperada na árvore: ${key}`);
  }
  console.log(`Árvore: ${leaves.length} páginas`);

  await rm(OUT, { recursive: true, force: true });
  await mkdir(IMG_DIR, { recursive: true });

  const imageMap = new Map(); // url remota -> arquivo local
  const pages = [];

  for (const [i, leaf] of leaves.entries()) {
    let resp;
    for (let attempt = 1; attempt <= 3; attempt++) {
      resp = await api('nodedataget', { id: String(leaf.id) });
      if (!resp.errno) break;
      await sleep(800 * attempt);
    }
    if (resp.errno) {
      console.error(`  [erro] ${leaf.id} ${leaf.title}: ${JSON.stringify(resp)}`);
      continue;
    }
    const md = Buffer.from(resp.data.md_text ?? '', 'base64').toString('utf8');

    const dirs = leaf.trail.slice(0, -1).map((t) => `${String(t.idx).padStart(2, '0')}-${slug(t.title)}`);
    const last = leaf.trail.at(-1);
    const rel = path.posix.join(...dirs, `${String(last.idx).padStart(2, '0')}-${slug(last.title)}.md`);
    pages.push({
      id: leaf.id,
      title: leaf.title,
      breadcrumb: leaf.trail.map((t) => t.title),
      file: rel,
      raw: md,
    });
    process.stdout.write(`\r  ${i + 1}/${leaves.length} ${leaf.title.slice(0, 50).padEnd(50)}`);
  }
  console.log();
  await browser.close();

  // Imagens: markdown ![alt](url) e HTML <img src="url">.
  const IMG_RE = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)|<img\b[^>]*?\bsrc=["']([^"']+)["']/gi;
  const urls = new Set();
  for (const p of pages) for (const m of p.raw.matchAll(IMG_RE)) urls.add(m[1] ?? m[2]);
  console.log(`Imagens distintas: ${urls.size}`);

  const failed = [];
  let done = 0;
  const queue = [...urls];
  const worker = async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        const abs = url.startsWith('//') ? `https:${url}` : url;
        if (!/^https?:/.test(abs)) throw new Error('URL não http(s)');
        const r = await fetch(abs, { headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(60000) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        const ct = r.headers.get('content-type') ?? '';
        const ext =
          path.extname(new URL(abs).pathname).toLowerCase().replace(/[^.a-z0-9]/g, '') ||
          ({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp', 'image/svg+xml': '.svg' }[ct.split(';')[0]] ?? '.bin');
        const name = `${createHash('sha1').update(abs).digest('hex').slice(0, 12)}${ext}`;
        await writeFile(path.join(IMG_DIR, name), buf);
        imageMap.set(url, name);
      } catch (e) {
        failed.push({ url, erro: String(e.message ?? e) });
      }
      process.stdout.write(`\r  ${++done}/${urls.size}`);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  console.log();

  // Anexos: links markdown para .zip (specs YAML/OpenAPI e tutoriais).
  const ZIP_RE = /\[([^\]]*)\]\(\s*(https?:\/\/[^)\s]+\.zip)\s*\)/gi;
  const attMap = new Map(); // url remota -> pasta local relativa a docs/
  await mkdir(ATT_DIR, { recursive: true });
  for (const p of pages) {
    for (const m of p.raw.matchAll(ZIP_RE)) {
      const url = m[2];
      if (attMap.has(url)) continue;
      try {
        // img0.99foodglobal.com não resolve; o mesmo caminho existe em img0.didiglobal.com.
        const candidates = [url, url.replace('//img0.99foodglobal.com/', '//img0.didiglobal.com/')];
        let r;
        for (const u of new Set(candidates)) {
          try {
            r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(120000) });
            if (r.ok) break;
          } catch {
            r = undefined;
          }
        }
        if (!r?.ok) throw new Error(r ? `HTTP ${r.status}` : 'fetch failed');
        const name = createHash('sha1').update(url).digest('hex').slice(0, 10);
        const zipPath = path.join(ATT_DIR, `${name}.zip`);
        await writeFile(zipPath, Buffer.from(await r.arrayBuffer()));
        const dest = path.join(ATT_DIR, name);
        await mkdir(dest, { recursive: true });
        // nomes sem flag UTF-8 vêm em cp850 (PDFs em português)
        execFileSync('unzip', ['-q', '-o', '-O', 'cp850', zipPath, '-x', '__MACOSX/*', '-d', dest]);
        attMap.set(url, `attachments/${name}`);
        console.log(`  anexo ${m[1] || url} -> attachments/${name}`);
      } catch (e) {
        failed.push({ url, erro: String(e.message ?? e) });
      }
    }
  }

  // Grava os markdowns reescrevendo as imagens para caminhos relativos.
  const index = [];
  for (const p of pages) {
    const depth = p.file.split('/').length - 1;
    const prefix = '../'.repeat(depth) + 'images/';
    const body = p.raw
      .replace(IMG_RE, (full, a, b) => {
        const url = a ?? b;
        const local = imageMap.get(url);
        return local ? full.replace(url, prefix + local) : full;
      })
      .replace(ZIP_RE, (full, _t, url) => (attMap.has(url) ? full.replace(url, '../'.repeat(depth) + attMap.get(url) + '/') : full));
    const header = `<!-- fonte: ${SITE}/${LANG}/openapi · id ${p.id} · ${p.breadcrumb.join(' > ')} -->\n\n`;
    const target = path.join(OUT, p.file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, header + body);
    const imgs = [...p.raw.matchAll(IMG_RE)].map((m) => imageMap.get(m[1] ?? m[2])).filter(Boolean);
    index.push({ id: p.id, title: p.title, breadcrumb: p.breadcrumb, file: p.file, images: [...new Set(imgs)], bytes: Buffer.byteLength(body) });
  }

  await writeFile(
    path.join(OUT, 'index.json'),
    JSON.stringify(
      { source: `${SITE}/${LANG}/openapi`, lang: LANG, crawledAt: new Date().toISOString(), tree, pages: index, imageSources: Object.fromEntries(imageMap), attachments: Object.fromEntries(attMap), failedImages: failed },
      null,
      2,
    ),
  );

  execFileSync('node', [path.join(ROOT, 'scripts', 'build-index.mjs')], { stdio: 'inherit' });
  console.log(`\nOK: ${index.length} páginas, ${imageMap.size} imagens, ${attMap.size} anexos, ${failed.length} falhas de imagem`);
  for (const f of failed) console.log(`  falhou: ${f.url} (${f.erro})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
