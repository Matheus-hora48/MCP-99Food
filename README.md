# mcp-99food

Servidor MCP (stdio) com a documentação completa da **99Food Open Platform**
(<https://developer-food.99app.com/pt-BR/openapi>): 144 páginas em markdown,
35 imagens, os specs OpenAPI oficiais e os tutoriais em PDF. Tudo fica
versionado em `docs/`, então o servidor funciona offline.

## Tools

| Tool | O que faz |
| --- | --- |
| `list_docs` | Lista as páginas (id, caminho, nº de imagens); aceita `filter` |
| `get_doc` | Markdown completo por `id` ou `path`; `include_images=true` anexa as imagens |
| `search_docs` | Busca por palavras em títulos e corpo, com trechos |
| `list_images` / `get_image` | Lista e devolve as imagens (diagramas, prints do portal) |
| `get_openapi_spec` | Lista endpoints dos specs YAML ou devolve a operação de um endpoint |

## Uso

```bash
npm install
npm run build
```

Registro no Claude Code (já há um `.mcp.json` neste diretório):

```bash
claude mcp add 99food -- node /home/hora/Documentos/mcp-99food/dist/index.js
```

`MCP_99FOOD_DOCS` permite apontar para outra pasta de docs.

## Estrutura de `docs/`

- `INDEX.md`: índice navegável da documentação, com contagem de imagens por página.
- `01-common/`, `02-food/`, `03-grocery/`: markdowns na mesma hierarquia do portal.
- `images/`: imagens, referenciadas nos markdowns por caminho relativo.
- `attachments/`: zips da doc já extraídos (`swagger.yaml` = 99Food, `99Compras.yaml` = Grocery, PDFs de tutorial).
- `index.json`: árvore original, metadados, mapa URL→arquivo de cada imagem e falhas.

## Atualizando a documentação

```bash
npm run crawl            # recoleta tudo e regenera docs/ e docs/INDEX.md
npm run crawl -- --lang en
```

A API de docs do portal (`openplatform-portal-food.99app.com/docs/v1/node/*`) exige
uma assinatura `wsgsig` gerada pelo JS da própria página, então o crawler abre o
portal num Chrome headless (`/usr/bin/google-chrome-stable`, ou `--chrome`/`CHROME_PATH`)
e chama a API de dentro dele.

## Limitações conhecidas

- O texto das páginas vem em inglês mesmo com `pt-BR`; o portal só traduz o menu/UI.
- Um zip de tutorial (`img0.99foodglobal.com/...aXwGURTRUs...zip`) não baixa: o host não resolve. Está listado em `docs/INDEX.md`.
