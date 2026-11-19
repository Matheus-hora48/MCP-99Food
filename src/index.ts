#!/usr/bin/env node
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = process.env.MCP_99FOOD_DOCS ?? path.join(ROOT, 'docs');
const { version: VERSION } = JSON.parse(await readFile(path.join(ROOT, 'package.json'), 'utf8')) as { version: string };

interface PageMeta {
  id: number;
  title: string;
  breadcrumb: string[];
  file: string;
  images: string[];
  bytes: number;
}
interface Index {
  source: string;
  lang: string;
  crawledAt: string;
  pages: PageMeta[];
}

const index: Index = JSON.parse(await readFile(path.join(DOCS, 'index.json'), 'utf8'));
const byId = new Map(index.pages.map((p) => [p.id, p]));
const bodies = new Map<number, string>();

async function body(p: PageMeta): Promise<string> {
  let b = bodies.get(p.id);
  if (b === undefined) {
    b = await readFile(path.join(DOCS, p.file), 'utf8');
    bodies.set(p.id, b);
  }
  return b;
}

const label = (p: PageMeta) => p.breadcrumb.join(' > ');
const text = (t: string) => ({ content: [{ type: 'text' as const, text: t }] });
const fail = (t: string) => ({ ...text(t), isError: true as const });

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

async function imageContent(name: string) {
  if (!/^[a-f0-9]+\.[a-z]+$/.test(name)) return null; // evita path traversal
  const mime = MIME[path.extname(name)];
  if (!mime) return null;
  try {
    const data = await readFile(path.join(DOCS, 'images', name));
    return { type: 'image' as const, data: data.toString('base64'), mimeType: mime };
  } catch {
    return null;
  }
}

function resolvePage(id?: number, p?: string): PageMeta | undefined {
  if (id !== undefined) return byId.get(id);
  if (p) {
    const norm = p.replace(/^docs\//, '');
    return index.pages.find((x) => x.file === norm);
  }
  return undefined;
}

const server = new McpServer({ name: 'mcp-99food', version: VERSION });

server.registerTool(
  'list_docs',
  {
    description:
      'Lista as páginas da documentação da 99Food Open Platform (id, caminho, título, nº de imagens). ' +
      'Seções: Common (introdução, guia, FAQ), Food (99Food Protocol, Open Delivery, Changelog) e Grocery. ' +
      'Use o filtro opcional para restringir por trecho do caminho (ex.: "order", "grocery", "webhook").',
    inputSchema: { filter: z.string().optional().describe('Trecho (case-insensitive) do breadcrumb ou do arquivo') },
  },
  async ({ filter }) => {
    const f = filter?.toLowerCase();
    const pages = index.pages.filter((p) => !f || label(p).toLowerCase().includes(f) || p.file.toLowerCase().includes(f));
    if (!pages.length) return text('Nenhuma página encontrada.');
    const lines = pages.map((p) => `[${p.id}] ${label(p)}${p.images.length ? `  (🖼 ${p.images.length})` : ''}`);
    return text(`${pages.length} páginas (idioma ${index.lang}, coletado em ${index.crawledAt}):\n\n${lines.join('\n')}`);
  },
);

// ---- Seções (headings) e normalização para busca ----
interface Section {
  level: number;
  title: string;
  /** offset do heading e do fim da seção (até o próximo heading de nível <= level) */
  start: number;
  end: number;
}

/** minúsculas e sem acento, para casar "confirmação" com "confirmacao". */
const norm = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function sections(md: string): Section[] {
  const out: Section[] = [];
  const re = /^(#{1,6})[ \t]*(.+?)[ \t]*#*[ \t]*$/gm;
  let inFence = false;
  let last = 0;
  // ignora "#" dentro de blocos ``` (comentários em exemplos de código)
  for (const line of md.split('\n')) {
    const at = md.indexOf(line, last);
    last = at + line.length;
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    re.lastIndex = 0;
    const m = re.exec(line);
    if (m) out.push({ level: m[1].length, title: m[2].replace(/\*\*/g, '').trim(), start: at, end: md.length });
  }
  for (let i = 0; i < out.length; i++) {
    const next = out.slice(i + 1).find((x) => x.level <= out[i].level);
    if (next) out[i].end = next.start;
  }
  return out;
}

/** Heading mais próximo antes de um offset. */
const headingAt = (secs: Section[], offset: number) => secs.filter((x) => x.start <= offset).at(-1)?.title;

server.registerTool(
  'get_doc',
  {
    description:
      'Retorna o markdown de uma página da documentação (por id ou caminho). ' +
      'Páginas grandes (ex.: Get Order Details, ~40 KB): use outline=true para ver os headings e section para trazer só um trecho. ' +
      'Com include_images=true, anexa também as imagens da página.',
    inputSchema: {
      id: z.number().int().optional().describe('ID da página (veja list_docs)'),
      path: z.string().optional().describe('Caminho relativo, ex.: 02-food/.../02-get-order-details.md'),
      section: z.string().optional().describe('Trecho do título de um heading; devolve só essa seção (com subseções)'),
      outline: z.boolean().default(false).describe('Devolver só a lista de headings da página'),
      include_images: z.boolean().default(false).describe('Anexar as imagens referenciadas pela página'),
    },
  },
  async ({ id, path: p, section, outline, include_images }) => {
    const page = resolvePage(id, p);
    if (!page) return fail('Página não encontrada. Use list_docs ou search_docs para achar o id.');
    const md = await body(page);
    const secs = sections(md);
    const size = (n: number) => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} KB`);
    const outlineText = () => secs.map((x) => `${'  '.repeat(x.level - 1)}- ${x.title}  (${size(x.end - x.start)})`).join('\n');
    if (outline) return text(`# ${label(page)} (id ${page.id}) — ${size(md.length)}\n\n${outlineText()}`);
    let content = md;
    if (section) {
      const want = norm(section);
      const hit = secs.find((x) => norm(x.title) === want) ?? secs.find((x) => norm(x.title).includes(want));
      if (!hit) return fail(`Seção "${section}" não encontrada em [${page.id}]. Headings:\n\n${outlineText()}`);
      content = md.slice(hit.start, hit.end);
    }
    const out: Array<{ type: 'text'; text: string } | NonNullable<Awaited<ReturnType<typeof imageContent>>>> = [
      { type: 'text', text: `# ${label(page)} (id ${page.id})${section ? ` — seção "${section}"` : ''}\n\n${content}` },
    ];
    if (page.images.length && !include_images) {
      out.push({ type: 'text', text: `\n---\nEsta página referencia ${page.images.length} imagem(ns): ${page.images.join(', ')}. Use get_image ou include_images=true.` });
    }
    if (include_images) {
      for (const name of page.images) {
        const img = await imageContent(name);
        if (img) out.push({ type: 'text', text: `Imagem ${name}:` }, img);
      }
    }
    return { content: out };
  },
);

/** Divide a consulta em termos; trechos entre aspas viram uma frase exata. */
function parseQuery(q: string): string[] {
  const terms: string[] = [];
  for (const m of q.matchAll(/"([^"]+)"|(\S+)/g)) {
    const t = norm((m[1] ?? m[2]).trim());
    if (t) terms.push(t);
  }
  return terms;
}

const countOf = (hay: string, needle: string) => {
  let n = 0;
  for (let i = hay.indexOf(needle); i >= 0 && n < 15; i = hay.indexOf(needle, i + needle.length)) n++;
  return n;
};

server.registerTool(
  'search_docs',
  {
    description:
      'Busca textual em títulos e corpo das páginas (todas as palavras; ignora maiúsculas e acentos; "entre aspas" = frase exata). ' +
      'Devolve id, caminho, seção onde achou e trecho. Use scope para separar Food de Grocery. Útil para achar campos, códigos de erro, endpoints.',
    inputSchema: {
      query: z.string().min(2),
      scope: z.string().optional().describe('Trecho do breadcrumb/caminho para restringir, ex.: "99food protocol", "grocery", "open delivery"'),
      limit: z.number().int().min(1).max(30).default(10),
    },
  },
  async ({ query, scope, limit }) => {
    const terms = parseQuery(query);
    if (!terms.length) return fail('Consulta vazia.');
    const sc = scope ? norm(scope) : undefined;
    const scored: Array<{ p: PageMeta; score: number; snippet: string; where?: string }> = [];
    for (const p of index.pages) {
      if (sc && !norm(label(p)).includes(sc) && !norm(p.file).includes(sc)) continue;
      const md = await body(p);
      const low = norm(md);
      const title = norm(label(p));
      if (!terms.every((t) => low.includes(t) || title.includes(t))) continue;
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 20;
        score += countOf(low, t);
      }
      // trecho em volta do termo mais raro presente no corpo (o mais informativo)
      const inBody = terms.filter((t) => low.includes(t)).sort((x, y) => countOf(low, x) - countOf(low, y));
      const at = inBody.length ? low.indexOf(inBody[0]) : 0;
      const start = Math.max(0, at - 80);
      const snippet = md.slice(start, start + 240).replace(/\s+/g, ' ');
      scored.push({ p, score, snippet, where: inBody.length ? headingAt(sections(md), at) : undefined });
    }
    scored.sort((a, b) => b.score - a.score);
    if (!scored.length) return text(`Nada encontrado para "${query}"${scope ? ` em "${scope}"` : ''}.`);
    const shown = scored.slice(0, limit);
    return text(
      `${scored.length} resultado(s) para "${query}" (mostrando ${shown.length}):\n\n` +
        shown.map((r) => `[${r.p.id}] ${label(r.p)}${r.where ? `\n  § ${r.where}` : ''}\n  …${r.snippet}…`).join('\n\n'),
    );
  },
);

server.registerTool(
  'list_images',
  {
    description: 'Lista as imagens da documentação e em quais páginas aparecem.',
    inputSchema: {},
  },
  async () => {
    const map = new Map<string, number[]>();
    for (const p of index.pages) for (const img of p.images) map.set(img, [...(map.get(img) ?? []), p.id]);
    const lines = [...map.entries()].map(([img, ids]) => `${img}  ← ${ids.map((i) => `[${i}] ${byId.get(i)?.title}`).join('; ')}`);
    return text(`${map.size} imagens:\n\n${lines.join('\n')}`);
  },
);

server.registerTool(
  'get_image',
  {
    description: 'Retorna uma imagem da documentação (nome vindo de list_images ou das referências dos markdowns, ex.: 0dffc9d72c28.png).',
    inputSchema: { name: z.string().describe('Nome do arquivo da imagem') },
  },
  async ({ name }) => {
    const img = await imageContent(path.basename(name));
    return img ? { content: [img] } : fail(`Imagem "${name}" não encontrada.`);
  },
);

// ---- Specs OpenAPI (YAML) baixados dos anexos da documentação ----
async function findSpecs(): Promise<Map<string, string>> {
  const specs = new Map<string, string>();
  const root = path.join(DOCS, 'attachments');
  try {
    for (const d of await readdir(root, { withFileTypes: true })) {
      if (!d.isDirectory()) continue;
      for (const f of await readdir(path.join(root, d.name))) {
        if (/\.ya?ml$/i.test(f)) specs.set(path.basename(f).replace(/\.ya?ml$/i, '').toLowerCase(), path.join(root, d.name, f));
      }
    }
  } catch {
    /* sem anexos */
  }
  return specs;
}
const specs = await findSpecs();
const specNames = [...specs.keys()];

type Json = unknown;
interface OpenApiDoc {
  paths?: Record<string, Record<string, { summary?: string }>>;
  [k: string]: Json;
}
const parsedSpecs = new Map<string, OpenApiDoc>();
async function loadSpec(file: string): Promise<OpenApiDoc> {
  let doc = parsedSpecs.get(file);
  if (!doc) {
    doc = YAML.parse(await readFile(file, 'utf8')) as OpenApiDoc;
    parsedSpecs.set(file, doc);
  }
  return doc;
}

/** Segue um JSON Pointer local (#/components/schemas/X). */
function pointer(doc: OpenApiDoc, ref: string): Json | undefined {
  if (!ref.startsWith('#/')) return undefined;
  let cur: Json = doc;
  for (const raw of ref.slice(2).split('/')) {
    const key = raw.replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, Json>)[key];
  }
  return cur;
}

/**
 * Substitui cada {$ref} local pelo conteúdo referenciado. Referências cíclicas
 * (schema que contém a si mesmo) ficam como {$ref, circular: true}.
 */
function resolveRefs(doc: OpenApiDoc, node: Json, stack: string[] = []): Json {
  if (Array.isArray(node)) return node.map((n) => resolveRefs(doc, n, stack));
  if (node === null || typeof node !== 'object') return node;
  const obj = node as Record<string, Json>;
  if (typeof obj.$ref === 'string') {
    const ref = obj.$ref;
    if (stack.includes(ref)) return { $ref: ref, circular: true };
    const target = pointer(doc, ref);
    if (target === undefined) return { $ref: ref, unresolved: true };
    const { $ref: _ignored, ...siblings } = obj;
    const resolved = resolveRefs(doc, target, [...stack, ref]);
    return resolved && typeof resolved === 'object' && !Array.isArray(resolved) ? { ...(resolved as object), ...siblings } : resolved;
  }
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolveRefs(doc, v, stack)]));
}

server.registerTool(
  'get_openapi_spec',
  {
    description:
      `Specs OpenAPI oficiais baixados da doc (disponíveis: ${specNames.join(', ') || 'nenhum'}; "swagger" = 99Food, "99compras" = Grocery). ` +
      'Sem "endpoint": lista os endpoints (método + path + resumo). Com "endpoint" (trecho do path): devolve o YAML daquela operação ' +
      'com os $ref de components já expandidos (desligue com resolve_refs=false).',
    inputSchema: {
      spec: z.string().describe('Nome do spec (ex.: swagger, 99compras)'),
      endpoint: z.string().optional().describe('Trecho do path, ex.: /v1/order/order/detail'),
      resolve_refs: z.boolean().default(true).describe('Expandir $ref (#/components/...) no YAML devolvido'),
    },
  },
  async ({ spec, endpoint, resolve_refs }) => {
    const file = specs.get(spec.toLowerCase());
    if (!file) return fail(`Spec "${spec}" não encontrado. Disponíveis: ${specNames.join(', ')}`);
    const doc = await loadSpec(file);
    const paths = doc.paths ?? {};
    if (!endpoint) {
      const lines = Object.entries(paths).flatMap(([p, ops]) =>
        Object.entries(ops).filter(([m]) => /^(get|post|put|delete|patch)$/i.test(m)).map(([m, op]) => `${m.toUpperCase().padEnd(6)} ${p}  — ${op.summary ?? ''}`),
      );
      return text(`${lines.length} operações em ${spec}:\n\n${lines.join('\n')}`);
    }
    const hits = Object.entries(paths).filter(([p]) => p.toLowerCase().includes(endpoint.toLowerCase()));
    if (!hits.length) return fail(`Nenhum path contém "${endpoint}".`);
    return text(hits.map(([p, ops]) => YAML.stringify({ [p]: resolve_refs ? resolveRefs(doc, ops) : ops })).join('\n---\n'));
  },
);

// ---- Webhooks: headings "### EventN: nome" ----
interface WebhookEvent {
  name: string;
  page: PageMeta;
  section: Section;
}
async function webhookEvents(): Promise<WebhookEvent[]> {
  const out: WebhookEvent[] = [];
  for (const page of index.pages) {
    const md = await body(page);
    for (const section of sections(md)) {
      const m = /^Event\s*\d+\s*:\s*([A-Za-z]\w*)/i.exec(section.title);
      if (m) out.push({ name: m[1], page, section });
    }
  }
  return out;
}

server.registerTool(
  'list_webhooks',
  {
    description:
      'Lista os eventos de webhook (orderNew, orderCancel, deliveryStatus, shopStatus…) com a página de origem, separados por protocolo. ' +
      'Com "event": devolve a seção completa do evento (descrição + exemplo de payload). Assinatura e formato da resposta: get_doc da página "Webhooks" do API Guide.',
    inputSchema: {
      event: z.string().optional().describe('Nome do evento, ex.: orderNew'),
      scope: z.string().optional().describe('Trecho do breadcrumb, ex.: "grocery" ou "99food protocol"'),
    },
  },
  async ({ event, scope }) => {
    const sc = scope ? norm(scope) : undefined;
    const all = (await webhookEvents()).filter((e) => !sc || norm(label(e.page)).includes(sc));
    if (!event) {
      if (!all.length) return text('Nenhum evento encontrado.');
      const lines = all.map((e) => `${e.name.padEnd(28)} [${e.page.id}] ${label(e.page)}`);
      return text(`${all.length} eventos de webhook:\n\n${lines.join('\n')}`);
    }
    const hits = all.filter((e) => norm(e.name) === norm(event));
    if (!hits.length) return fail(`Evento "${event}" não encontrado. Disponíveis: ${[...new Set(all.map((e) => e.name))].join(', ')}`);
    const parts = await Promise.all(hits.map(async (e) => `# ${e.name} — [${e.page.id}] ${label(e.page)}\n\n${(await body(e.page)).slice(e.section.start, e.section.end)}`));
    return text(parts.join('\n\n---\n\n'));
  },
);

// ---- Códigos numéricos em tabelas (errno, motivos de cancelamento, status…) ----
interface CodeRow {
  code: string;
  cells: string[];
  header?: string[];
  heading?: string;
  page: PageMeta;
}
let codeRowsCache: CodeRow[] | undefined;
async function codeRows(): Promise<CodeRow[]> {
  if (codeRowsCache) return codeRowsCache;
  const rows: CodeRow[] = [];
  const cellsOf = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  for (const page of index.pages) {
    const md = await body(page);
    const secs = sections(md);
    const lines = md.split('\n');
    let offset = 0;
    let header: string[] | undefined;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*\|?\s*:?-{3,}/.test(line) && i > 0 && lines[i - 1].includes('|')) header = cellsOf(lines[i - 1]).map((c) => c.replace(/\*\*/g, ''));
      else if (!line.includes('|')) header = undefined;
      const m = /^\s*\|\s*`?(-?\d{2,6})`?\s*\|/.exec(line);
      if (m) rows.push({ code: m[1], cells: cellsOf(line).slice(1), header: header?.slice(1), heading: headingAt(secs, offset), page });
      offset += line.length + 1;
    }
  }
  return (codeRowsCache = rows);
}

server.registerTool(
  'lookup_code',
  {
    description:
      'Procura códigos numéricos nas tabelas da doc: errno de resposta (10001, 10002…), motivos de cancelamento (1010 Item sold out…), ' +
      'status de pedido e afins. Informe "code" (exato) e/ou "query" (texto na descrição ou no título da tabela).',
    inputSchema: {
      code: z.string().optional().describe('Código exato, ex.: 10002 ou 1010'),
      query: z.string().optional().describe('Texto na descrição/seção, ex.: "cancel", "sold out", "status"'),
      scope: z.string().optional().describe('Trecho do breadcrumb, ex.: "grocery"'),
      limit: z.number().int().min(1).max(200).default(40),
    },
  },
  async ({ code, query, scope, limit }) => {
    if (!code && !query) return fail('Informe code e/ou query.');
    const q = query ? norm(query) : undefined;
    const sc = scope ? norm(scope) : undefined;
    const hits = (await codeRows()).filter(
      (r) =>
        (!code || r.code === code.trim()) &&
        (!q || norm([...r.cells, r.heading ?? '', ...(r.header ?? [])].join(' ')).includes(q)) &&
        (!sc || norm(label(r.page)).includes(sc)),
    );
    if (!hits.length) return text('Nenhum código encontrado.');
    // agrupa linhas idênticas que aparecem em várias páginas (ex.: errno comuns)
    const groups = new Map<string, { row: CodeRow; pages: PageMeta[] }>();
    for (const r of hits) {
      const key = `${r.code}|${r.cells.join('|')}|${r.heading ?? ''}`;
      const g = groups.get(key);
      if (g) g.pages.push(r.page);
      else groups.set(key, { row: r, pages: [r.page] });
    }
    const list = [...groups.values()];
    const shown = list.slice(0, limit);
    const fmt = ({ row, pages }: { row: CodeRow; pages: PageMeta[] }) => {
      const cols = row.header ? row.cells.map((c, i) => (row.header![i] ? `${row.header![i]}: ${c}` : c)).join(' · ') : row.cells.join(' · ');
      const where = pages.length > 3 ? `${pages.length} páginas, ex.: [${pages[0].id}] ${label(pages[0])}` : pages.map((p) => `[${p.id}] ${p.title}`).join('; ');
      return `${row.code} — ${cols}\n  § ${row.heading ?? '?'} · ${where}`;
    };
    return text(`${list.length} código(s)${list.length > shown.length ? ` (mostrando ${shown.length})` : ''}:\n\n${shown.map(fmt).join('\n\n')}`);
  },
);

// ---- Resources: cada página como food99://doc/{id} ----
server.registerResource(
  'doc',
  new ResourceTemplate('food99://doc/{id}', {
    list: async () => ({
      resources: index.pages.map((p) => ({ uri: `food99://doc/${p.id}`, name: label(p), mimeType: 'text/markdown' })),
    }),
  }),
  { title: 'Página da documentação 99Food', description: 'Markdown de uma página da 99Food Open Platform', mimeType: 'text/markdown' },
  async (uri, { id }) => {
    const page = byId.get(Number(id));
    if (!page) throw new Error(`Página ${id} não encontrada`);
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: await body(page) }] };
  },
);

// ---- Prompt: roteiro de leitura para implementar uma integração ----
const PROTOCOLS = { food: '99Food Protocol', grocery: 'Grocery', 'open-delivery': 'Open Delivery' } as const;
const TOPICS = { pedidos: ['order', 'logistics'], cardapio: ['menu'], loja: ['store', 'authorization'], financeiro: ['financial'] } as const;
const TOPIC_LABEL = { pedidos: 'pedidos', cardapio: 'cardápio', loja: 'loja', financeiro: 'financeiro' } as const;

server.registerPrompt(
  'roteiro_integracao',
  {
    title: 'Roteiro para implementar uma integração 99Food',
    description: 'Monta a lista de leitura (guia da API, webhooks, endpoints e specs) para implementar um módulo da integração.',
    argsSchema: {
      protocolo: z.enum(['food', 'grocery', 'open-delivery']).describe('food (99Food Protocol), grocery ou open-delivery'),
      tema: z.enum(['pedidos', 'cardapio', 'loja', 'financeiro']).describe('Módulo a implementar'),
    },
  },
  ({ protocolo, tema }) => {
    const proto = norm(PROTOCOLS[protocolo]);
    const inProto = index.pages.filter((p) => norm(label(p)).includes(proto));
    const guide = inProto.filter((p) => /api guide|introduction/i.test(label(p)));
    const topic = inProto.filter((p) => TOPICS[tema].some((t) => norm(p.breadcrumb.slice(0, -1).join(' ')).includes(t)));
    const fmt = (ps: PageMeta[]) => ps.map((p) => `- [${p.id}] ${label(p)}`).join('\n') || '- (nenhuma página encontrada)';
    const spec = protocolo === 'grocery' ? '99compras' : protocolo === 'food' ? 'swagger' : undefined;
    const msg =
      `Vou implementar a parte de **${TOPIC_LABEL[tema]}** da integração com a 99Food usando o **${PROTOCOLS[protocolo]}**. ` +
      `Use as tools do servidor mcp-99food para estudar a documentação antes de propor código.\n\n` +
      `1. Leia o guia geral (autenticação, assinatura, webhooks, rate limit):\n${fmt(guide)}\n\n` +
      `2. Leia as páginas do módulo (em páginas grandes use get_doc com outline=true e depois section):\n${fmt(topic)}\n\n` +
      `3. Rode list_webhooks com scope "${PROTOCOLS[protocolo]}" e leia os eventos do módulo.\n` +
      (spec ? `4. Confira os contratos em get_openapi_spec spec="${spec}" (os $ref já vêm expandidos).\n` : '') +
      `${spec ? 5 : 4}. Use lookup_code para errno e motivos/status que o fluxo precisa tratar.\n\n` +
      `Atenção aos IDs de 64 bits (order_id, app_id): não podem passar por JSON.parse comum. ` +
      `Ao final, resuma o fluxo (estados, chamadas, prazos, como tratar falhas) antes do código.`;
    return { messages: [{ role: 'user', content: { type: 'text', text: msg } }] };
  },
);

await server.connect(new StdioServerTransport());
