# Salmos na Ponta do Lápis

Página de vendas em português, criada com React, Vite e CSS. Não foi publicada.

## Visualizar

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

Abra o endereço Local mostrado pelo Vite (normalmente http://localhost:5173). Em um ambiente remoto, encaminhe a porta 5173 pelo painel de portas do seu editor.

```sh
npm test
npm run build
npm run preview
```

O último comando permite conferir o build em http://localhost:4173. Os arquivos finais ficam em `dist/`.

## Personalizar

Edite `src/config.js`:

- `price`: preço numérico. `currency`: moeda.
- `checkoutUrl`: endereço HTTPS do checkout. Vazio mantém um aviso de demonstração, sem cobrança. Todos os botões de compra usam este valor.
- `images.hero`: imagem principal; `images.cover`: capa; `images.samples`: três imagens de demonstração. Coloque arquivos em `public/` e use caminhos como `/produto/capa.webp`.
- `contactEmail`: e-mail para exibir o link de contato.
- `offerLabel`, `guaranteeDays`: condições comerciais verificadas. Garantia não definida não exibe promessa de prazo.
- `isDemo`: mantenha `true` até confirmar todos os dados.

Conteúdo e perguntas frequentes: `src/main.jsx`. Design responsivo: `src/styles.css`. Ilustração vetorial original com sombras e gradientes: `src/Art.jsx`.

A referência foi usada para orientar a hierarquia e a alternância de seções, sem reutilizar suas imagens ou identidade. A capa, as amostras e o preço de R$ 29,90 são ilustrativos. Antes de ativar vendas, substitua por dados e páginas reais e revise também os textos da oferta, entrega, licença, faixa de aprendizagem e reembolso. Os itens apresentados são propostas editoriais, não uma certificação do conteúdo do produto. Não há depoimentos ou contadores fictícios.

A página usa fontes do Google Fonts, com fontes locais de fallback; o restante dos recursos visuais está no projeto. Sem integrações de rastreamento ou armazenamento de dados.

## Verificações

`npm test` cobre alternância das amostras, oferta, modo demonstrativo de compra, menu móvel e validação de URL HTTPS. `npm run build` valida o empacotamento de produção. Resultado nesta execução: 5 testes aprovados, build de produção concluído e servidor local respondendo HTTP 200. A captura em Chromium não concluiu neste ambiente; a revisão visual em desktop e celular continua pendente antes da publicação.

## Prévia em ambiente remoto — diagnóstico e alternativa

O endereço `localhost:5173` mostrado no terminal pertence à máquina remota. Ele não abre a página na sua máquina sem encaminhamento de porta. O Vite deve permanecer ativo:

```sh
npm run dev -- --host 0.0.0.0 --port 5173
```

Nesta sessão do Codex, a execução foi validada em `0.0.0.0:5173`: HTML, cliente Vite, componentes React, configuração e CSS responderam HTTP 200. A sessão não disponibiliza uma ferramenta de encaminhamento nem uma URL de prévia de entrada. Os IPs internos mostrados pelo Vite não são URLs acessíveis ao navegador do usuário. O processo pode terminar quando o ambiente for suspenso.

### Alternativa sem publicação: GitHub Codespaces

Foi incluído `.devcontainer/devcontainer.json`, com dependências instaladas por `npm ci` na criação do contêiner e encaminhamento da porta 5173. Esta configuração se aplica ao Codespaces/Dev Containers; ela não habilita um serviço de prévia na sessão atual do Codex.

1. Com estes arquivos no seu repositório do GitHub, abra **Code → Codespaces → Create codespace**.
2. No terminal do Codespace, execute o comando Vite acima na pasta do projeto.
3. Abra a aba **Ports**, selecione **5173** e use **Open in Browser**. Se a porta não aparecer automaticamente, use **Forward a Port** e informe `5173`.
4. Use a URL HTTPS exibida pelo Codespaces. Mantenha a visibilidade da porta como **Private** e entre com sua conta do GitHub.

A URL encaminha o servidor de desenvolvimento remoto e funciona enquanto o Codespace e o Vite estiverem ativos. Isso não publica um site de produção. A criação de um Codespace pode consumir a franquia ou gerar custos da sua conta GitHub. Nenhum Codespace foi criado por esta tarefa.
