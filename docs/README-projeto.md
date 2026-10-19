# Salmos na Ponta do Lápis — reconstrução por etapas

React + Vite + CSS no repositório existente. Nenhuma publicação realizada.

## Etapa atual

A aplicação renderiza **o cabeçalho com a logo oficial, as três seções aprovadas e a quarta seção de comentários ilustrativos**. A headline e a subheadline são as fornecidas pelo produtor. O fundo contínuo é #FAF7EF; azul, verde, amarelo e laranja aparecem nos destaques. O laranja do texto recebe um tom mais escuro para preservar contraste e legibilidade.

Os componentes das seções anteriores, suas artes, configurações e `src/styles.css` permanecem no repositório e no histórico, mas não são renderizados nem têm seus estilos importados nesta etapa. Não há oferta comercial, compra ou rodapé nesta etapa. O identificador `#checkout-final` permanece em uma âncora invisível de altura zero, sem mensagens provisórias, caixa visível, preço ou checkout falso. O CTA continua rolando e transferindo o foco para esse destino.

## Imagem principal oficial

A arte oficial foi localizada na branch `codex/salmos-sales-page`, no commit de upload `ab5b19a`, e está integrada pelo caminho `/images/imagem-principal-salmos-com-bonus.png`. O PNG original tem 1122 × 1402 pixels e foi preservado sem alterações.

Arquivo original utilizado:

```
public/images/imagem-principal-salmos-com-bonus.png
```

Esse endereço já está configurado em `product.images.productWithBonuses` no arquivo `src/config.js`. Se o original tiver outra extensão, preserve seu formato e atualize esse campo para corresponder ao arquivo. Não basta renomear uma extensão diferente para PNG.

A imagem é exibida inteira, com largura responsiva e altura automática, sem sobreposição. Clicar ou tocar abre o próprio original em uma nova aba para ampliar. A legenda de orientação abaixo da imagem foi removida, assim como seu espaço; a imagem e o link de ampliação foram preservados. A mensagem provisória e sua caixa pontilhada foram removidas. Se o arquivo não carregar, a página não exibe imagem genérica, ícone quebrado ou espaço reservado.

A logo oficial `public/images/logo-oficial-salmos.png` foi mantida intacta.

## Segunda seção: atividades

O carrossel utiliza os seis arquivos originais `public/images/atividade-01.webp` a `atividade-06.webp`, enviados no commit `d0ba215`. `referencia-carrossel.png` foi usada apenas como referência de composição e não é renderizada no site. Os caminhos, títulos e descrições acessíveis ficam em `src/activities.js`.

O Embla Carousel, com o plugin oficial Auto Scroll, fornece movimento horizontal contínuo em loop, arraste livre com mouse e navegação por toque, sem snapping ao soltar. A largura dos cartões foi preservada: quatro por área de visualização no desktop, três no tablet e um no celular. Durante o deslocamento, cartões entram e saem pelas bordas naturalmente. Bordas amarelas, sombras, setas e seis indicadores foram mantidos. Clicar em uma atividade abre um diálogo nativo acessível, com fechamento por Escape, botão e clique no fundo; também há um link para o arquivo original.

O movimento automático é lento e constante (0,45 pixel por passo da animação do Embla), sem temporizador para avançar slides, apenas com a seção visível. Ele pausa durante hover com mouse, foco por teclado, arraste, atividade ampliada ou aba oculta. Após a interação, retoma automaticamente, com uma breve espera de 800 ms. Toque e clique não deixam o carrossel bloqueado por foco residual. O player/controle de pausa foi removido. A preferência por movimento reduzido desativa o movimento automático e remove a animação da navegação manual. O botão “Quero garantir agora” rola até `#checkout-final` e transfere o foco ao destino; a rolagem é imediata com movimento reduzido.

Os estilos novos são restritos à segunda seção e ao destino provisório. O cabeçalho, a primeira seção, suas artes e seus estilos permanecem intactos.

## Terceira seção: arte oficial ANTES / DEPOIS

A seção `#escrita-com-proposito` aparece imediatamente após o carrossel e seu CTA. Utiliza diretamente `/images/terceira-secao-salmos-antes-depois.png`, enviada pelo produtor no commit `28bbf31`, sem recortes, conversão, moldura, filtros ou recriação dos textos. O PNG original tem 1672 × 941 pixels e aparece centralizado, proporcional e ocupando 100% da largura disponível tanto no desktop quanto no celular, até o limite nativo de 1672 px. As margens laterais extras do celular foram removidas; a imagem permanece inteira e a ampliação por toque foi preservada.

A legenda abaixo da arte foi removida integralmente, sem espaço reservado; a mesma frase também não aparece na ampliação. O texto alternativo descritivo preserva a identificação de simulação criada com IA. Não há novos textos de venda repetindo os que já fazem parte da imagem.

Tocar ou clicar abre um diálogo com a imagem em tamanho original e rolagem interna horizontal e vertical para explorar os detalhes. O botão de fechar permanece fora da área de rolagem da imagem. Há fechamento por botão, Escape e clique no fundo, retorno de foco à imagem e link para abrir o original em nova aba. A página não ganha rolagem horizontal.

Os estilos são restritos à terceira seção e sua ampliação. Os arquivos das duas seções anteriores não foram alterados. A âncora invisível `#checkout-final` permanece no fim da página, após a quarta seção. Não foi criada uma quinta seção.

## Quarta seção: comentários ilustrativos

A quarta seção aparece imediatamente depois da comparação de escrita. Usa a headline “Quem vê, se encanta. Quem usa, recomenda.” e a subheadline fornecida. Menina, folhas, flores e detalhes dourados permanecem estáticos; apenas os cartões se deslocam. O conjunto central de Bíblia com coração e o texto superior “COMENTÁRIOS ILUSTRATIVOS” foram removidos, aproximando a headline do início da seção.

O repositório continha apenas `referencia-depoimentos.png` (commit `a3f2df2`), sem cartões separados. Os quatro cartões foram recortados diretamente dessa referência, com nomes, fotos, comentários, rede social e material preservados. As dimensões são 420 × 553, 388 × 553, 389 × 553 e 399 × 553 px. Os WebP são **sem perda**, conferidos pixel a pixel contra os recortes originais. Os arquivos ficam em `public/images/comentarios/`; dados e descrições acessíveis em `src/comments.js`. São comentários ilustrativos fornecidos para a apresentação, não avaliações verificadas.

A faixa usa o mesmo Embla Auto Scroll das atividades e importa os mesmos valores de velocidade (0,45) e retomada (800 ms), sem modificar o componente aprovado. O hook da nova seção está em `src/hooks/useContinuousComments.js`. Ele mantém arraste livre, toque, pausa durante interação, foco por teclado, ampliação, aba oculta e saída da tela, com retomada automática e respeito a movimento reduzido. Não há player ou slideshow por intervalos.

A segunda passagem dos mesmos quatro cartões dá espaço ao loop; não cria comentários novos e é ignorada pelos leitores de tela e pela ordem de tabulação. Os originais continuam disponíveis por teclado. Clicar ou tocar em qualquer cartão abre seu recorte nativo, com botão de fechar, Escape, rolagem interna e link para o arquivo original. No celular, isso permite ler os detalhes preservando a imagem inteira na seção.

Os estilos e a fonte cursiva local Lobster Two são restritos à quarta seção. Os arquivos das três seções anteriores, suas artes e a velocidade das atividades ficaram intactos. A âncora invisível `#checkout-final` permanece após a quarta seção, sem quinta seção de vendas.

## Atualizar a prévia no GitHub Codespaces

No Codespace existente, na pasta com `package.json`, confirme a branch e atualize:

```sh
git switch codex/salmos-sales-page
git pull --ff-only
```

Esta etapa adiciona a fonte local da quarta seção. Pare o servidor existente com Ctrl+C, instale as dependências e reinicie:

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

Validação desta etapa: 19 testes aprovados e build Vite concluído. Chromium conferido em 320, 375, 390, 768 e 1440 px, com a logo centralizada, sem rolagem horizontal e sem erros de JavaScript. O link de pular para o conteúdo também foi conferido por teclado.

Os testes cobrem a copy exata e a preservação da primeira seção, a presença de somente quatro seções e do destino invisível de checkout, o cabeçalho contendo somente a logo, o link de ampliação e a ausência de mensagem provisória quando o arquivo não carrega. O carrossel também tem testes para setas, indicadores, loop, início/parada e retomada do movimento contínuo, ausência do player, foco por teclado, movimento reduzido, ampliação e CTA. A revisão visual compara o cabeçalho, a primeira seção, o título da segunda seção e o CTA com a base anterior em cada largura. A navegação por setas, a ampliação e o destino do CTA permanecem disponíveis. A revisão no Chromium mediu deslocamento constante de 0,45 pixel entre quadros e uma volta completa com 6.000 quadros monitorados, sem lacunas. Foram aprovadas as retomadas após hover, clique em seta, arraste com mouse, deslize e tap no celular; também foram conferidos o foco por teclado e o movimento reduzido. O cabeçalho, a primeira seção, o título da segunda seção e o CTA ficaram idênticos à base anterior nas cinco larguras, sem erros de JavaScript ou arquivos ausentes.

A terceira seção foi conferida com a imagem real nas cinco larguras: proporção, centralização, imagem inteira, ampliação, rolagem interna, fechamento, Escape, foco e continuidade do CTA. A comparação de DOM, medidas e estilos confirmou o cabeçalho e as duas primeiras seções idênticos à base anterior. O hash SHA-256 do PNG é o mesmo no arquivo original e no build: `3625214b7c591667e5930ba17df1e6e1aeead3c13811ae21084b64ee21c34a87`.

Os testes de comentários cobrem os quatro recortes, as duas passagens do loop, copy exata, classificação ilustrativa, pausa e retomada, movimento reduzido, navegação por teclado, ampliação e ausência de player. No Chromium real, foram monitorados 1.150 quadros atravessando uma volta completa, sem lacunas; o deslocamento medido ficou entre 0,44 e 0,46 pixel por quadro. Passaram hover, arraste, toque, retomada, ampliação móvel e movimento reduzido. O topo permaneceu estático; não houve erros de JavaScript ou arquivos ausentes. A comparação de DOM, medidas e estilos confirmou que o cabeçalho e as três seções aprovadas continuam idênticos nas larguras 320, 375, 390, 768 e 1440 px.

## Arquivos desta etapa

- `src/main.jsx`: composição restrita à etapa atual.
- `src/sections/ProductPresentation.jsx`: primeira seção aprovada, preservada.
- `src/sections/MaterialCarousel.jsx` e `MaterialCarousel.css`: carrossel e ampliação da segunda seção.
- `src/activities.js`: caminhos e descrições das seis atividades.
- `src/sections/IllustrativeComments.jsx` e `IllustrativeComments.css`: quarta seção e ampliação dos comentários.
- `src/hooks/useContinuousComments.js`: movimento contínuo da quarta seção.
- `src/comments.js`: nomes e transcrições fornecidas, caminhos e dimensões dos recortes.
- `src/sections/BeforeAfter.jsx` e `BeforeAfter.css`: terceira seção ampliada no desktop e ampliação acessível.
- `src/presentation.css`: tipografia local, paleta e responsividade da nova apresentação.
- `src/components/Header.css`: cabeçalho compacto e logo centralizada.
- `src/config.js`: caminho editável da imagem; dados anteriores preservados.
- `tests/app.test.jsx`, `tests/carousel.test.jsx` e `tests/before-after.test.jsx` e `tests/comments.test.jsx`: preservação das seções aprovadas, carrosséis e ampliações.
