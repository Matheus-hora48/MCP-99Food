#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const DOCS = process.env.MCP_99FOOD_DOCS ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');

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

const server = new McpServer({ name: 'mcp-99food', version: '0.1.0' });

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

server.registerTool(
  'get_doc',
  {
    description:
      'Retorna o markdown completo de uma página da documentação (por id ou caminho). ' +
      'Com include_images=true, anexa também as imagens da página como conteúdo de imagem.',
    inputSchema: {
      id: z.number().int().optional().describe('ID da página (veja list_docs)'),
      path: z.string().optional().describe('Caminho relativo, ex.: 02-food/.../02-get-order-details.md'),
      include_images: z.boolean().default(false).describe('Anexar as imagens referenciadas pela página'),
    },
  },
  async ({ id, path: p, include_images }) => {
    const page = resolvePage(id, p);
    if (!page) return fail('Página não encontrada. Use list_docs ou search_docs para achar o id.');
    const md = await body(page);
    const out: Array<{ type: 'text'; text: string } | NonNullable<Awaited<ReturnType<typeof imageContent>>>> = [
      { type: 'text', text: `# ${label(page)} (id ${page.id})\n\n${md}` },
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

server.registerTool(
  'search_docs',
  {
    description: 'Busca textual (todas as palavras) em títulos e corpo das páginas. Devolve id, caminho e trechos. Útil para achar campos, códigos de erro, endpoints.',
    inputSchema: {
      query: z.string().min(2),
      limit: z.number().int().min(1).max(30).default(10),
    },
  },
  async ({ query, limit }) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored: Array<{ p: PageMeta; score: number; snippet: string }> = [];
    for (const p of index.pages) {
      const md = await body(p);
      const low = md.toLowerCase();
      const title = label(p).toLowerCase();
      if (!terms.every((t) => low.includes(t) || title.includes(t))) continue;
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 20;
        score += Math.min(low.split(t).length - 1, 15);
      }
      const at = low.indexOf(terms[0]);
      const start = Math.max(0, at - 80);
      const snippet = md.slice(start, start + 240).replace(/\s+/g, ' ');
      scored.push({ p, score, snippet });
    }
    scored.sort((a, b) => b.score - a.score);
    if (!scored.length) return text(`Nada encontrado para "${query}".`);
    const shown = scored.slice(0, limit);
    return text(
      `${scored.length} resultado(s) para "${query}" (mostrando ${shown.length}):\n\n` +
        shown.map((r) => `[${r.p.id}] ${label(r.p)}\n  …${r.snippet}…`).join('\n\n'),
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

server.registerTool(
  'get_openapi_spec',
  {
    description:
      `Specs OpenAPI oficiais baixados da doc (disponíveis: ${specNames.join(', ') || 'nenhum'}; "swagger" = 99Food, "99compras" = Grocery). ` +
      'Sem "endpoint": lista os endpoints (método + path + resumo). Com "endpoint" (trecho do path): devolve o YAML daquela operação.',
    inputSchema: {
      spec: z.string().describe('Nome do spec (ex.: swagger, 99compras)'),
      endpoint: z.string().optional().describe('Trecho do path, ex.: /v1/order/order/detail'),
    },
  },
  async ({ spec, endpoint }) => {
    const file = specs.get(spec.toLowerCase());
    if (!file) return fail(`Spec "${spec}" não encontrado. Disponíveis: ${specNames.join(', ')}`);
    const doc = YAML.parse(await readFile(file, 'utf8')) as { paths?: Record<string, Record<string, { summary?: string }>> };
    const paths = doc.paths ?? {};
    if (!endpoint) {
      const lines = Object.entries(paths).flatMap(([p, ops]) =>
        Object.entries(ops).filter(([m]) => /^(get|post|put|delete|patch)$/i.test(m)).map(([m, op]) => `${m.toUpperCase().padEnd(6)} ${p}  — ${op.summary ?? ''}`),
      );
      return text(`${lines.length} operações em ${spec}:\n\n${lines.join('\n')}`);
    }
    const hits = Object.entries(paths).filter(([p]) => p.toLowerCase().includes(endpoint.toLowerCase()));
    if (!hits.length) return fail(`Nenhum path contém "${endpoint}".`);
    return text(hits.map(([p, ops]) => YAML.stringify({ [p]: ops })).join('\n---\n'));
  },
);

await server.connect(new StdioServerTransport());
