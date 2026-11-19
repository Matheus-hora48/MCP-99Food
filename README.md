# mcp-99food

Servidor MCP (stdio) com a documentação completa da **99Food Open Platform**
(<https://developer-food.99app.com/pt-BR/openapi>): 144 páginas em markdown,
35 imagens, os specs OpenAPI oficiais e os tutoriais em PDF (5 anexos). Tudo fica
versionado em `docs/`, então o servidor funciona offline.

## Tools

| Tool | O que faz |
| --- | --- |
| `list_docs` | Lista as páginas (id, caminho, nº de imagens); aceita `filter` |
| `get_doc` | Markdown completo por `id` ou `path`; `include_images=true` anexa as imagens |
| `search_docs` | Busca por palavras em títulos e corpo, com trechos |
| `list_images` / `get_image` | Lista e devolve as imagens (diagramas, prints do portal) |
| `get_openapi_spec` | Lista endpoints dos specs YAML ou devolve a operação de um endpoint, com os `$ref` de `components` expandidos |

## Uso

```bash
npm install
npm run build
```

Abrindo o Claude Code nesta pasta, o `.mcp.json` já registra o servidor (`node dist/index.js`).

Para usar em outro projeto, sem clonar (o `prepare` compila na instalação):

```bash
claude mcp add 99food -- npx -y github:Matheus-hora48/MCP-99Food
```

Ou apontando para um clone local:

```bash
claude mcp add 99food -- node /caminho/do/MCP-99Food/dist/index.js
```

`MCP_99FOOD_DOCS` permite apontar para outra pasta de docs.

## Estrutura de `docs/`

- `INDEX.md`: índice navegável da documentação, com contagem de imagens por página.
- `01-common/`, `02-food/`, `03-grocery/`: markdowns na mesma hierarquia do portal.
- `images/`: imagens, referenciadas nos markdowns por caminho relativo.
- `attachments/`: conteúdo dos zips da doc, já extraído (`swagger.yaml` = 99Food, `99Compras.yaml` = Grocery, PDFs de tutorial e o guia de promoções).
- `index.json`: árvore original, metadados, mapa URL→arquivo de cada imagem e falhas.

## Atualizando a documentação

```bash
npm run crawl            # recoleta tudo e regenera docs/ e docs/INDEX.md
npm run crawl -- --lang en
```

A API de docs do portal (`openplatform-portal-food.99app.com/docs/v1/node/*`) exige
uma assinatura `wsgsig` gerada pelo JS da própria página, então o crawler abre o
portal num Chrome headless (`/usr/bin/google-chrome-stable`, ou `--chrome`/`CHROME_PATH`)
e chama a API de dentro dele. A coleta grava em `docs.tmp/` e só substitui `docs/`
se todas as páginas vierem; se alguma falhar, `docs/` fica intacto.

## Limitações conhecidas

- O texto das páginas vem em inglês mesmo com `pt-BR`; o portal só traduz o menu/UI.
