# Salmos na Ponta do Lápis — reconstrução por etapas

React + Vite + CSS no repositório existente. Nenhuma publicação realizada.

## Etapa atual

A aplicação renderiza **o cabeçalho com a logo oficial, as sete seções aprovadas e a oitava seção de oferta final**. A headline e a subheadline são as fornecidas pelo produtor. O fundo contínuo é #FAF7EF; azul, verde, amarelo e laranja aparecem nos destaques. O laranja do texto recebe um tom mais escuro para preservar contraste e legibilidade.

Os componentes das seções anteriores, suas artes, configurações e `src/styles.css` permanecem no repositório e no histórico, mas não são renderizados nem têm seus estilos importados nesta etapa. A oferta final exibe o preço confirmado de R$ 27,90. O checkout real ainda não está configurado, portanto o botão de compra fica desabilitado. Não há rodapé nesta etapa. O identificador `#checkout-final` pertence à oitava seção; o CTA anterior continua rolando e transferindo o foco para esse destino.

## Imagem principal oficial

A arte oficial foi localizada na branch `codex/salmos-sales-page`, no commit de upload `ab5b19a`, e está integrada pelo caminho `/images/imagem-principal-salmos-com-bonus.png`. O arquivo atual tem 1199 × 1244 pixels e foi preservado sem alterações.

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

Os estilos da segunda seção permanecem isolados; o destino do CTA agora é a oferta final. O cabeçalho, a primeira seção, suas artes e seus estilos permanecem intactos.

## Terceira seção: arte oficial ANTES / DEPOIS

A seção `#escrita-com-proposito` aparece imediatamente após o carrossel e seu CTA. Utiliza diretamente `/images/terceira-secao-salmos-antes-depois.png`, enviada pelo produtor no commit `28bbf31`, sem recortes, conversão, moldura, filtros ou recriação dos textos. O PNG original tem 1672 × 941 pixels e aparece centralizado, proporcional e ocupando 100% da largura disponível tanto no desktop quanto no celular, até o limite nativo de 1672 px. As margens laterais extras do celular foram removidas; a imagem permanece inteira e a ampliação por toque foi preservada.

A legenda abaixo da arte foi removida integralmente, sem espaço reservado; a mesma frase também não aparece na ampliação. O texto alternativo descritivo preserva a identificação de simulação criada com IA. Não há novos textos de venda repetindo os que já fazem parte da imagem.

Tocar ou clicar abre um diálogo com a imagem em tamanho original e rolagem interna horizontal e vertical para explorar os detalhes. O botão de fechar permanece fora da área de rolagem da imagem. Há fechamento por botão, Escape e clique no fundo, retorno de foco à imagem e link para abrir o original em nova aba. A página não ganha rolagem horizontal.

Os estilos são restritos à terceira seção e sua ampliação. Os arquivos das duas seções anteriores não foram alterados. O destino `#checkout-final` agora pertence à oferta final, após a sétima seção. A quinta seção de públicos continua após os comentários.

## Quarta seção: comentários ilustrativos

A quarta seção aparece imediatamente depois da comparação de escrita. Usa a headline “Quem vê, se encanta. Quem usa, recomenda.” e a subheadline fornecida. O topo fica centralizado e compacto, sem as ilustrações laterais de menina e ramo, sem a Bíblia decorativa e sem o texto superior “COMENTÁRIOS ILUSTRATIVOS”. O divisor de coração, os detalhes inferiores e a subheadline foram preservados; apenas os cartões se deslocam.

Os quatro cartões usam diretamente os PNGs individuais enviados no commit `974449e`: `depoimento-juliana-ferreira.png`, `depoimento-mariana-costa.png`, `depoimento-juliana-martins.png` e `depoimento-joely-cardoso.png`, em `public/images/`. Todos têm 1122 × 1402 px e são preservados sem conversão, recorte ou alteração. Os cartões têm largura uniforme de 420 px no desktop, limitada ao espaço disponível no celular; as imagens mantêm a proporção com `object-fit: contain`. Dados e descrições acessíveis ficam em `src/comments.js`. Os comentários e perfis foram criados com IA e não são avaliações autênticas verificadas; a região, os textos alternativos e a ampliação continuam identificados como ilustrativos. A frase visível abaixo da faixa foi removida, sem reservar espaço para ela. Os recortes antigos da referência permanecem apenas como arquivos históricos e não são renderizados.

A faixa usa o mesmo Embla Auto Scroll das atividades e importa os mesmos valores de velocidade (0,45) e retomada (800 ms), sem modificar o componente aprovado. O hook da nova seção está em `src/hooks/useContinuousComments.js`. Ele mantém arraste livre, toque, pausa durante interação, foco por teclado, ampliação, aba oculta e saída da tela, com retomada automática e respeito a movimento reduzido. Não há player ou slideshow por intervalos.

A segunda passagem dos mesmos quatro cartões dá espaço ao loop; não cria comentários novos e é ignorada pelos leitores de tela e pela ordem de tabulação. Os originais continuam disponíveis por teclado. Clicar ou tocar em qualquer cartão abre seu PNG na resolução nativa, com botão de fechar, Escape, rolagem interna e link para o arquivo original. No celular, isso permite ler os detalhes preservando a imagem inteira na seção.

Os estilos e a fonte cursiva local Lobster Two são restritos à quarta seção. Os arquivos das três seções anteriores, suas artes e a velocidade das atividades ficaram intactos. O destino `#checkout-final` pertence à oitava seção de oferta; não há seções extras além das oito planejadas.

## Quinta seção: para quem é o material

O componente antigo `src/sections/Audiences.jsx`, que estava fora da renderização atual, foi substituído. Agora há uma única seção `#para-quem` imediatamente após os comentários. A headline, o texto superior e a subheadline usam os textos solicitados. Famílias, educadores e ministérios infantis são os três públicos confirmados pelo produtor.

São três cards com cenas 3D originais em cenários completos: casa com pais e crianças, sala de aula com professora e encontro de ministério infantil. As ilustrações seguem uma direção comum de luz dourada, cores da marca e proporção horizontal 3:2; são imagens ilustrativas, não fotos de clientes. Imagens, textos e descrições acessíveis ficam centralizados em `src/audiences.js`. Os estilos de `Audiences.css` usam classes próprias para preservar as quatro seções anteriores. Há três colunas a partir de 900 px e uma coluna em telas menores, sem carrossel ou novos botões. A oferta final com identificador `#checkout-final` aparece depois da sétima seção de recebimento.

Nenhuma arte, texto, medida ou lógica dos quatro componentes aprovados foi alterada. A revisão compara DOM, medidas e estilos das quatro seções e do cabeçalho em 320, 375, 390, 768 e 1440 px. Não há seção duplicada, novo checkout ou publicação.

## Sexta seção: quatro bônus especiais

A seção `#bonus` aparece uma única vez, imediatamente depois de `#para-quem`. A referência `referencia-quatro-bonus-salmos.png`, enviada no commit `86d1b0f`, foi usada somente para entender os bônus e o conceito visual: não foi recortada, transformada na arte final ou renderizada na página.

As quatro capas foram criadas do zero como ilustrações 3D originais, em PNG de 1024 × 1536 px, com identidade editorial comum e temas próprios. São exibidas inteiras, com `object-fit: contain`, carregamento tardio e link para ampliar o original. Os arquivos são `bonus-bible-goods.png`, `bonus-proverbios-na-ponta-do-lapis.png`, `bonus-tabuada-com-noe.png` e `bonus-emociobook.png`, em `public/images/`.

Textos, caminhos e preços individuais informados pelo produtor ficam em `src/bonuses.js`: R$ 12,99, R$ 17,99, R$ 25,49 e R$ 15,99. Os valores são mantidos em centavos inteiros e o total de R$ 72,46 é calculado a partir dos quatro itens. Cada card mostra o preço riscado, “Por: GRÁTIS” e “Incluso na sua compra”. O resumo final usa a copy solicitada, sem criar um novo checkout ou alterar o preço do produto principal.

São quatro colunas a partir de 1200 px, duas entre 640 e 1199 px e uma em telas menores. `Bonuses.css` usa classes restritas à seção. As cinco seções aprovadas, suas artes e a lógica dos carrosséis não foram modificadas. A oferta final aparece depois das instruções de recebimento e recebe o identificador `#checkout-final`.

## Sétima seção: recebimento por e-mail

O componente antigo `HowItWorks.jsx`, que estava fora da página atual, foi adaptado para uma única seção `#como-funciona` imediatamente após os quatro bônus. Os textos são os fornecidos pelo produtor e ficam em `src/delivery.js`. O título é “Simples, rápido e pronto para imprimir!”; o texto superior é “COMO VOCÊ RECEBE”.

Cinco cards explicam compra, recebimento por e-mail, download dos PDFs, impressão e armazenamento dos arquivos no próprio dispositivo. Os ícones são carrinho, envelope, download, impressora e infinito. A entrega por e-mail ocorre após confirmação do pagamento, sem promessa de envio instantâneo ou prazo específico. O último card fala dos arquivos guardados localmente, sem inventar prazo de acesso a uma plataforma.

O visual usa fundo creme, cards em branco quente, títulos verde-escuro, etiquetas douradas, ícones circulares, sombras suaves e borda dourada no último card. São cinco colunas a partir de 1100 px, três entre 768 e 1099 px e uma coluna no celular. Os efeitos discretos de hover respeitam movimento reduzido. As classes de `HowItWorks.css` são restritas à nova seção, preservando as seis anteriores. A seção de oferta com identificador `#checkout-final` aparece imediatamente depois das instruções, sem alterar estes cinco cards.

## Oitava seção: oferta final

O componente antigo `Offer.jsx`, que não estava renderizado, foi substituído por uma única oferta imediatamente após `#como-funciona`. O identificador `#checkout-final` foi transferido do destino invisível para a seção real, com foco programático preservado. O botão amarelo das atividades não foi alterado.

A oferta usa fundo #FFDA00, transição ondulada a partir do creme, estrelas e coração discretos, composição grande do kit e quadro claro com preço e botão verde. As cinco imagens existentes são usadas integralmente, sem recorte, geração ou conversão: o material principal em `/images/imagem-principal-salmos-com-bonus.png` (1199 × 1244 px) e os quatro PNGs de capas de bônus (1024 × 1536 px). O principal aparece maior ao centro no desktop e acima dos bônus no celular. Perspectiva, bordas e sombras são feitas somente com CSS. Os links das imagens abrem os arquivos originais para ampliar.

Preço e compra são configuráveis em `src/config.js`:

- `product.price: 27.90`: preço atual e texto do botão, formatados juntos em reais.
- `product.referencePrice: 99.90`: referência comercial confirmada explicitamente pelo produtor nesta etapa.
- `product.referencePriceConfirmed: true`: permite exibir o valor riscado. Sem confirmação, o componente não apresenta esse valor.
- `product.checkoutUrl: ''`: **falta preencher com a URL HTTPS real do checkout**. Enquanto estiver vazio ou inválido, o botão permanece desabilitado e a página informa “Compra ainda não habilitada.”. Nenhum link de pagamento foi inventado. Configurar a URL habilita o link de compra automaticamente.

A seção usa os textos fornecidos, informa recebimento por e-mail após confirmação do pagamento e não promete envio instantâneo, acesso vitalício ou garantia não confirmada. Não foi adicionado serviço de pagamento ou envio de e-mail. `Offer.css` tem classes próprias para preservar as sete seções aprovadas. Não há nova dependência ou publicação.

## Atualizar a prévia no GitHub Codespaces

No Codespace existente, na pasta com `package.json`, confirme a branch e atualize:

```sh
git switch codex/salmos-sales-page
git pull --ff-only
```

Para uma instalação nova, instale as dependências e inicie o servidor. No Codespace já preparado, basta atualizar a branch e recarregar a prévia; reinicie o servidor se estiver parado:

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

Validação desta etapa: 22 testes aprovados e build Vite concluído. Chromium conferido em 320, 375, 390, 768 e 1440 px, com a logo centralizada, sem rolagem horizontal e sem erros de JavaScript. O link de pular para o conteúdo também foi conferido por teclado.

Os testes cobrem a copy exata e a preservação da primeira seção, a presença de somente oito seções e do destino único de oferta, o cabeçalho contendo somente a logo, o link de ampliação e a ausência de mensagem provisória quando o arquivo não carrega. O carrossel também tem testes para setas, indicadores, loop, início/parada e retomada do movimento contínuo, ausência do player, foco por teclado, movimento reduzido, ampliação e CTA. A revisão visual compara o cabeçalho, a primeira seção, o título da segunda seção e o CTA com a base anterior em cada largura. A navegação por setas, a ampliação e o destino do CTA permanecem disponíveis. A revisão no Chromium mediu deslocamento constante de 0,45 pixel entre quadros e uma volta completa com 6.000 quadros monitorados, sem lacunas. Foram aprovadas as retomadas após hover, clique em seta, arraste com mouse, deslize e tap no celular; também foram conferidos o foco por teclado e o movimento reduzido. O cabeçalho, a primeira seção, o título da segunda seção e o CTA ficaram idênticos à base anterior nas cinco larguras, sem erros de JavaScript ou arquivos ausentes.

A terceira seção foi conferida com a imagem real nas cinco larguras: proporção, centralização, imagem inteira, ampliação, rolagem interna, fechamento, Escape, foco e continuidade do CTA. A comparação de DOM, medidas e estilos confirmou o cabeçalho e as duas primeiras seções idênticos à base anterior. O hash SHA-256 do PNG é o mesmo no arquivo original e no build: `3625214b7c591667e5930ba17df1e6e1aeead3c13811ae21084b64ee21c34a87`.

Os testes de comentários cobrem os quatro PNGs individuais, as duas passagens do loop, copy exata, classificação ilustrativa, pausa e retomada, movimento reduzido, navegação por teclado, ampliação e ausência de player. No Chromium real, foram monitorados 1.150 quadros atravessando uma volta completa, sem lacunas; o deslocamento medido ficou entre 0,44 e 0,46 pixel por quadro. Passaram hover, arraste, toque, retomada, ampliação móvel e movimento reduzido. O topo permaneceu estático; não houve erros de JavaScript ou arquivos ausentes. A comparação de DOM, medidas e estilos confirmou que o cabeçalho e as três seções aprovadas continuam idênticos nas larguras 320, 375, 390, 768 e 1440 px.

## Arquivos desta etapa

- `src/main.jsx`: composição das oito seções, com as sete primeiras preservadas.
- `src/sections/Offer.jsx` e `Offer.css`: composição do kit, preço e compra da oferta final.
- `tests/offer.test.jsx`: referência comercial condicionada à confirmação e integração segura de checkout.
- `src/sections/HowItWorks.jsx` e `HowItWorks.css`: sétima seção responsiva com cinco cards.
- `src/delivery.js`: instruções de compra, entrega por e-mail, download, impressão e armazenamento.
- `src/sections/Bonuses.jsx` e `Bonuses.css`: cards e resumo da seção dos quatro bônus.
- `src/bonuses.js`: nomes, descrições, capas, preços individuais e total dos bônus.
- `src/sections/Audiences.jsx` e `Audiences.css`: quinta seção responsiva com três públicos.
- `src/audiences.js`: textos, caminhos e descrições das três cenas 3D.
- `src/sections/ProductPresentation.jsx`: primeira seção aprovada, preservada.
- `src/sections/MaterialCarousel.jsx` e `MaterialCarousel.css`: carrossel e ampliação da segunda seção.
- `src/activities.js`: caminhos e descrições das seis atividades.
- `src/sections/IllustrativeComments.jsx` e `IllustrativeComments.css`: quarta seção e ampliação dos comentários.
- `src/hooks/useContinuousComments.js`: movimento contínuo da quarta seção.
- `src/comments.js`: nomes e transcrições fornecidas, caminhos e dimensões dos recortes.
- `src/sections/BeforeAfter.jsx` e `BeforeAfter.css`: terceira seção ampliada no desktop e ampliação acessível.
- `src/presentation.css`: tipografia local, paleta e responsividade da nova apresentação.
- `src/components/Header.css`: cabeçalho compacto e logo centralizada.
- `src/config.js`: imagens, preço atual, preço de referência confirmado e URL real de checkout.
- `tests/app.test.jsx`, `tests/carousel.test.jsx` e `tests/before-after.test.jsx` e `tests/comments.test.jsx`: preservação das seções aprovadas, carrosséis e ampliações.
