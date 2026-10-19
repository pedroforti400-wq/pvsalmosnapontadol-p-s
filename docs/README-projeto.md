# Salmos na Ponta do Lápis — reconstrução por etapas

React + Vite + CSS no repositório existente. Nenhuma publicação realizada.

## Etapa atual

A aplicação renderiza **o cabeçalho com a logo oficial, a primeira seção aprovada e a segunda seção com o carrossel das atividades**. A headline e a subheadline são as fornecidas pelo produtor. O fundo contínuo é #FAF7EF; azul, verde, amarelo e laranja aparecem nos destaques. O laranja do texto recebe um tom mais escuro para preservar contraste e legibilidade.

Os componentes das seções anteriores, suas artes, configurações e `src/styles.css` permanecem no repositório e no histórico, mas não são renderizados nem têm seus estilos importados nesta etapa. Não há oferta comercial, compra ou rodapé nesta etapa. O destino discreto `#checkout-final` informa apenas que a área de oferta está em preparação, sem preço ou checkout falso.

## Imagem principal oficial

A arte oficial foi localizada na branch `codex/salmos-sales-page`, no commit de upload `ab5b19a`, e está integrada pelo caminho `/images/imagem-principal-salmos-com-bonus.png`. O PNG original tem 1122 × 1402 pixels e foi preservado sem alterações.

Arquivo original utilizado:

```
public/images/imagem-principal-salmos-com-bonus.png
```

Esse endereço já está configurado em `product.images.productWithBonuses` no arquivo `src/config.js`. Se o original tiver outra extensão, preserve seu formato e atualize esse campo para corresponder ao arquivo. Não basta renomear uma extensão diferente para PNG.

A imagem é exibida inteira, com largura responsiva e altura automática, sem sobreposição. Clicar ou tocar abre o próprio original em uma nova aba para ampliar. A mensagem provisória e sua caixa pontilhada foram removidas. Se o arquivo não carregar, a página não exibe imagem genérica, ícone quebrado ou espaço reservado.

A logo oficial `public/images/logo-oficial-salmos.png` foi mantida intacta.

## Segunda seção: atividades

O carrossel utiliza os seis arquivos originais `public/images/atividade-01.webp` a `atividade-06.webp`, enviados no commit `d0ba215`. `referencia-carrossel.png` foi usada apenas como referência de composição e não é renderizada no site. Os caminhos, títulos e descrições acessíveis ficam em `src/activities.js`.

O Embla Carousel fornece loop, arraste com mouse e navegação por toque. Há quatro cartões inteiros no desktop, três no tablet e um no celular, com bordas amarelas, sombras, setas e seis indicadores. Clicar em uma atividade abre um diálogo nativo acessível, com fechamento por Escape, botão e clique no fundo; também há um link para o arquivo original.

O autoplay avança a cada 4,5 segundos, apenas com a seção visível. Ele pausa com hover, foco, arraste, atividade ampliada, aba oculta ou pelo controle de pausa. A preferência por movimento reduzido desativa o autoplay e remove a animação da navegação manual. O botão “Quero garantir agora” rola até `#checkout-final` e transfere o foco ao destino; a rolagem é imediata com movimento reduzido.

Os estilos novos são restritos à segunda seção e ao destino provisório. O cabeçalho, a primeira seção, suas artes e seus estilos permanecem intactos.

## Atualizar a prévia no GitHub Codespaces

No Codespace existente, na pasta com `package.json`, confirme a branch e atualize:

```sh
git switch codex/salmos-sales-page
git pull --ff-only
```

Esta etapa adiciona o Embla Carousel. Pare o servidor existente com Ctrl+C, instale as dependências e reinicie:

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 5173
```

Abra **Ports → 5173 → Open in Browser**. Se necessário, use **Forward a Port → 5173**. Mantenha a porta Private e o Codespace ativo. Use a URL encaminhada do Codespaces; o localhost da sua máquina não acessa o servidor remoto.

A configuração `.devcontainer/devcontainer.json` já declara a porta 5173 e instala as dependências. Para criar outro Codespace, selecione esta mesma branch no GitHub e abra **Code → Codespaces**.

## Verificação

```sh
npm test
npm run build
```

Validação desta etapa: 12 testes aprovados e build Vite concluído. Chromium conferido em 320, 375, 390, 768 e 1440 px, com a logo centralizada, sem rolagem horizontal e sem erros de JavaScript. O link de pular para o conteúdo também foi conferido por teclado.

Os testes cobrem a copy exata e a preservação da primeira seção, a presença de somente duas seções de vendas e do destino provisório, o cabeçalho contendo somente a logo, o link de ampliação e a ausência de mensagem provisória quando o arquivo não carrega. O carrossel também tem testes para setas, indicadores, loop, autoplay, pausas, movimento reduzido, ampliação e CTA. Na revisão real do Chromium passaram as setas, os indicadores, o loop no desktop, o autoplay e sua pausa por hover, o controle de pausa, o arraste com mouse, o deslize por toque, a preferência por movimento reduzido e o CTA. A ampliação fechou por Escape e devolveu o foco ao cartão. Nenhum erro de JavaScript ou arquivo ausente foi detectado. A comparação de conteúdo, medidas, cores, fontes, margens e espaçamentos confirmou que o cabeçalho e a primeira seção ficaram idênticos à base anterior nas cinco larguras.

## Arquivos desta etapa

- `src/main.jsx`: composição restrita à etapa atual.
- `src/sections/ProductPresentation.jsx`: primeira seção aprovada, preservada.
- `src/sections/MaterialCarousel.jsx` e `MaterialCarousel.css`: carrossel e ampliação da segunda seção.
- `src/activities.js`: caminhos e descrições das seis atividades.
- `src/presentation.css`: tipografia local, paleta e responsividade da nova apresentação.
- `src/components/Header.css`: cabeçalho compacto e logo centralizada.
- `src/config.js`: caminho editável da imagem; dados anteriores preservados.
- `tests/app.test.jsx` e `tests/carousel.test.jsx`: preservação da apresentação e interações do carrossel.
