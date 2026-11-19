// Testes de ponta a ponta: sobe dist/index.js via stdio e chama as tools como um cliente MCP.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const client = new Client({ name: 'teste', version: '0' });
const call = async (name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  return { ...r, text: r.content.filter((c) => c.type === 'text').map((c) => c.text).join('\n') };
};

before(async () => {
  await client.connect(new StdioClientTransport({ command: 'node', args: ['dist/index.js'] }));
});
after(() => client.close());

test('versão do servidor vem do package.json', async () => {
  const { version } = JSON.parse(await (await import('node:fs/promises')).readFile('package.json', 'utf8'));
  assert.equal(client.getServerVersion().version, version);
});

test('get_openapi_spec expande $ref e marca ciclos', async () => {
  const r = await call('get_openapi_spec', { spec: 'swagger', endpoint: '/v1/order/order/detail' });
  assert.ok(!r.isError);
  const refs = r.text.match(/\$ref/g) ?? [];
  const circular = r.text.match(/circular: true/g) ?? [];
  assert.equal(refs.length, circular.length, 'todo $ref restante deve ser circular');
  assert.match(r.text, /errno/);
  const raw = await call('get_openapi_spec', { spec: 'swagger', endpoint: '/v1/order/order/detail', resolve_refs: false });
  assert.match(raw.text, /#\/components\/schemas\//);
});

test('get_doc: outline e section', async () => {
  const o = await call('get_doc', { path: '02-food/01-99food-protocol-recommended/01-api-guide/05-webhooks.md', outline: true });
  assert.match(o.text, /- Security/);
  const s = await call('get_doc', { path: '02-food/01-99food-protocol-recommended/01-api-guide/05-webhooks.md', section: 'security' });
  assert.match(s.text, /didi-header-sign/);
  assert.doesNotMatch(s.text, /### Limits/);
  const miss = await call('get_doc', { path: '02-food/01-99food-protocol-recommended/01-api-guide/05-webhooks.md', section: 'nao existe' });
  assert.ok(miss.isError);
  assert.match(miss.text, /Headings/);
});

test('search_docs: acentos, frase exata, escopo e seção', async () => {
  const r = await call('search_docs', { query: '"64-bit integer"', limit: 30 });
  assert.match(r.text, /§ /);
  const acento = await call('search_docs', { query: 'Signaturé' });
  assert.doesNotMatch(acento.text, /Nada encontrado/);
  const g = await call('search_docs', { query: 'order detail', scope: 'grocery', limit: 30 });
  for (const line of g.text.split('\n').filter((l) => /^\[\d+\]/.test(l))) assert.match(line, /Grocery/);
});

test('list_webhooks lista e devolve evento', async () => {
  const l = await call('list_webhooks');
  for (const ev of ['orderNew', 'orderCancel', 'deliveryStatus', 'shopStatus']) assert.match(l.text, new RegExp(ev));
  const e = await call('list_webhooks', { event: 'ordernew', scope: '99food protocol' });
  assert.match(e.text, /confirm the order within 5 minutes/);
  assert.doesNotMatch(e.text, /Event2: orderConfirmed/);
});

test('lookup_code acha errno e motivo de cancelamento', async () => {
  const sold = await call('lookup_code', { code: '1010' });
  assert.match(sold.text, /Item sold out/);
  const err = await call('lookup_code', { code: '10002' });
  assert.match(err.text, /Parameter error/);
  assert.ok((await call('lookup_code', {})).isError);
});

test('resources e prompt', async () => {
  const { resources } = await client.listResources();
  assert.ok(resources.length > 100);
  const r = await client.readResource({ uri: resources[0].uri });
  assert.ok(r.contents[0].text.length > 0);
  const p = await client.getPrompt({ name: 'roteiro_integracao', arguments: { protocolo: 'food', tema: 'pedidos' } });
  const msg = p.messages[0].content.text;
  assert.match(msg, /Order API/);
  assert.match(msg, /Webhooks/);
  assert.doesNotMatch(msg, /Grocery/);
});
