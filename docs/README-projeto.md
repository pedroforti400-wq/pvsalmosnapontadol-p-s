# Salmos na Ponta do Lápis

Página de vendas em React + Vite + CSS, refinada no projeto existente. Não publicada.

## Visualizar no GitHub Codespaces

Selecione a branch `codex/salmos-sales-page` no GitHub e abra **Code → Codespaces → Create codespace**. A configuração `.devcontainer/devcontainer.json` instala as dependências com `npm ci` e declara o encaminhamento da porta 5173.

No terminal, na pasta que contém `package.json`:

```sh
npm run dev -- --host 0.0.0.0 --port 5173
```

Em **Ports → 5173 → Open in Browser**, abra a URL HTTPS encaminhada. Mantenha a visibilidade **Private**. Caso a porta não apareça, use **Forward a Port → 5173**. O servidor e o Codespace precisam permanecer ativos. A abertura de um Codespace pode consumir a franquia ou gerar custos da conta GitHub.

`localhost:5173` no terminal pertence à máquina remota, não à sua máquina. A sessão do Codex usada para esta implementação não expõe um serviço de prévia externa. Os IPs internos do Vite não são um link público. Nenhum deploy foi realizado.

## Desenvolvimento e verificação

Requer Node.js 20.19+ ou 22.12+.

```sh
npm ci
npm test
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

O build está em `dist/` (ignorado pelo Git). Para abrir o preview do build em um ambiente remoto, encaminhe a porta 4173. Não inclua `node_modules/` no repositório.

## Personalizar os dados reais

Edite `src/config.js`:

- `logo`: caminho e dimensões da logo oficial. O PNG transparente em `public/images/logo-oficial-salmos.png` é usado integralmente no cabeçalho, rodapé, amostras e capa ilustrativa. O arquivo fornecido foi preservado sem alterações.

- `price`, `currency`, `offerLabel`: preço e identificação da oferta. O preço de R$ 29,90 permanece ilustrativo.
- `checkoutUrl`: URL HTTPS de compra. Vazio mantém a janela de aviso, sem transação.
- `isDemo`: mantenha `true` até revisar os dados comerciais e o conteúdo final.
- `images.hero`, `biblicalScene`, `writingChild`, `panorama`: ilustrações por contexto. Os caminhos atuais apontam para imagens 3D originais em `public/images/`.
- `images.cover`: capa real opcional. Vazio mantém uma representação identificada como ilustrativa.
- `images.samples`: páginas reais para substituir as amostras usadas nas prévias.
- `images.comparison`: composição fotográfica ilustrativa ANTES/DEPOIS da segunda seção. O aviso não promete resultado garantido; a imagem não representa um cliente real.
- `video.src`: MP4/WebM local ou HTTPS. `video.poster`: capa opcional do vídeo. Sem vídeo, aparece a prévia visual com o aviso de que a apresentação ainda não está disponível.
- `testimonials`: lista de objetos `{ name, role, quote }`, apenas com relatos reais e autorizados. Vazia exibe três cards explicitamente demonstrativos, sem avaliações ou resultados inventados.
- `guaranteeDays`: informe um prazo apenas se a política estiver confirmada. Vazio exibe orientação para conferir as condições do vendedor.
- `contactEmail`: e-mail opcional para o FAQ.

Páginas, capa, licença, entrega, faixa de aprendizagem e condições de reembolso devem ser conferidas pelo produtor antes de ativar vendas. As ilustrações não representam um produto físico enviado ao comprador.

## Organização

- `src/main.jsx`: composição da aplicação e abertura do aviso de compra.
- `src/sections/`: hero, comparação ilustrativa de escrita, vídeo, benefícios, depoimentos, públicos, seção amarela, oferta, panorama, etapas, garantia e FAQ.
- `src/components/`: cabeçalho e rodapé, componentes compartilhados, folha de demonstração e diálogo com gerenciamento de foco.
- `src/content.js`: textos das atividades, benefícios e perguntas frequentes.
- `src/styles.css`: identidade visual, fontes locais, estados e adaptações responsivas.
- `src/Art.jsx`: ilustração vetorial original preservada como fallback.
- `public/images/`: três artes originais geradas para esta página, otimizadas em WebP.

## Revisão visual

A linguagem foi ampliada com personagens 3D, sombras suaves, traços decorativos, prévias inclinadas sobre amarelo vibrante, oferta lilás e cenário bíblico panorâmico. A estrutura visual da referência orienta a alternância das seções; seus textos, imagens, identidade e elementos exclusivos não foram reutilizados.

Verificações: 8 testes automatizados, build Vite e revisão em Chromium nas larguras 1440, 1024, 768, 390 e 320 px. Sem erros de JavaScript, arquivos ausentes ou rolagem horizontal nas larguras verificadas. Foram conferidos o cabeçalho centralizado, a nova segunda seção, a janela de compra, Escape, FAQ e o aviso de vídeo. As fontes são locais e as imagens usam carregamento adiado fora da primeira dobra.
