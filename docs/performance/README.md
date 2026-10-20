# Otimização de performance — Salmos na Ponta do Lápis

Implementação isolada em `codex/salmos-performance`, baseada em `62625c0`. Destino do PR: `codex/salmos-sales-page`. A branch de produção não recebeu alterações. Nenhum comando de publicação ou merge foi executado.

## Medição comparável

O acesso HTTP ao domínio público foi bloqueado pela política de rede do ambiente; a consulta web também não conseguiu abri-lo. Os números abaixo são de builds locais, não são um novo resultado do PageSpeed do domínio. O relatório informado pelo produtor permanece como referência externa (74 / LCP 14,6 s).

Lighthouse 13.5.0, Chromium, viewport 412 × 823, DPR 1,75, slow 4G simulado, CPU 4×, três execuções por versão, perfis limpos, mesmo servidor HTTP local com gzip. A mediana é calculada por métrica. O ambiente local usa HTTP/1.1 sem CDN, e a simulação depende do grafo de rede observado; seus valores absolutos não equivalem aos da Netlify.

| Métrica local | Antes | Depois |
|---|---:|---:|
| Performance | 68,0 pontos | 91,0 pontos |
| FCP | 1,9 s | 1,7 s |
| LCP | 56,8 s | 3,3 s |
| TBT | 267,0 ms | 16,0 ms |
| CLS | 0.0021 | 0.0000 |
| Speed Index | 1,9 s | 1,7 s |
| Transferência inicial | 22,9 MiB | 1,4 MiB |

Redução da transferência: **94,0%**. Notas das três execuções: antes 68, 68, 70; depois 91, 91, 91.

As três execuções finais atingiram 91 pontos no ambiente local. O LCP de aproximadamente 3,3 s ainda fica acima da referência de 2,5 s e merece acompanhamento; não há garantia de nota em campo. Uma nova medição no domínio depende da aprovação e publicação desta versão. Acessibilidade, boas práticas e SEO estão detalhados no JSON; nenhum conteúdo foi alterado para ganhar nota.

## Elemento LCP e descoberta

No build da produção, o elemento LCP é `#inicio .product-artwork-link img`, a imagem principal `imagem-principal-salmos-com-bonus.png` (1199 × 1244; 2.627.399 bytes). O `fetchpriority="high"` já existia. A imagem era descoberta somente depois do JavaScript, sem srcset, junto a downloads eager dos carrosséis.

O build otimizado pré-renderiza esse mesmo elemento e oferece AVIF/WebP responsivo e conserva o original em fallback e ampliação. Há um único preload responsivo de imagem, com o mesmo srcset/sizes do elemento e prioridade alta, corrigindo a descoberta no HTML. A fonte Nunito local também tem um preload, sem requisição duplicada. Nenhuma outra imagem ganhou prioridade alta.

A decomposição de descoberta/download/renderização está em `results.json` (`lcpObservedBreakdown`). Esses subtempos são os observados no trace local sem throttling real; o valor LCP da tabela é a estimativa móvel simulada. Não se devem somar os subtempos observados para explicar os 14,6 s do PageSpeed do domínio, cujo trace não foi fornecido.

## Imagens e qualidade

35 originais conferidos por SHA-256 e preservados. 21 imagens utilizadas ganharam cópias. As 14 restantes são artes/referências históricas não renderizadas e não precisaram de conversão. Não houve geração por IA, recorte, alteração de composição ou filtros de cor. O redimensionamento mantém a proporção e nunca amplia o original.

A logo usa WebP lossless. Atividades usam WebP de qualidade 96 e largura mínima de 720 px para preservar os traços finos também no desktop, mantendo os originais WebP para ampliação e o maior candidato quando recomprimir não traria economia. Os PNGs usam WebP de qualidade 94–96 e AVIF 4:4:4; a compressão das capas, comparação e cenas foi elevada para 85 após revisão de detalhe. Transparência é mantida.

Tamanhos abaixo: original versus cópia(s) efetivamente selecionada(s) em 390 px / DPR 2, com a página inteira preparada. A oferta pode selecionar outro candidato da mesma imagem, dependendo do tamanho e do cache.

| Original | Antes (KiB) | Cópia(s) no celular (KiB) |
|---|---:|---:|
| logo-oficial-salmos.png | 1.477,3 | logo-oficial-salmos-416.webp: 96,4 |
| imagem-principal-salmos-com-bonus.png | 2.565,8 | imagem-principal-salmos-com-bonus-768.avif: 131,1 |
| atividade-01.webp | 201,1 | atividade-01-720.webp: 160,9 |
| atividade-02.webp | 201,8 | atividade-02-720.webp: 163,4 |
| atividade-03.webp | 214,6 | atividade-03-720.webp: 174,4 |
| atividade-04.webp | 189,3 | atividade-04-720.webp: 147,4 |
| atividade-05.webp | 207,1 | atividade-05-720.webp: 162,5 |
| atividade-06.webp | 214,5 | atividade-06-720.webp: 171,5 |
| terceira-secao-salmos-antes-depois.png | 1.659,7 | terceira-secao-salmos-antes-depois-1024.avif: 69,2 |
| depoimento-joely-cardoso.png | 2.890,3 | depoimento-joely-cardoso-840.avif: 112,1 |
| depoimento-juliana-ferreira.png | 3.094,3 | depoimento-juliana-ferreira-840.avif: 138,5 |
| depoimento-juliana-martins.png | 2.916,3 | depoimento-juliana-martins-840.avif: 118,5 |
| depoimento-mariana-costa.png | 2.889,7 | depoimento-mariana-costa-840.avif: 118,3 |
| para-quem-familias.png | 2.208,9 | para-quem-familias-768.avif: 91,6 |
| para-quem-educadores.png | 2.323,1 | para-quem-educadores-768.avif: 114,0 |
| para-quem-ministerios.png | 2.280,0 | para-quem-ministerios-768.avif: 105,0 |
| bonus-bible-goods.png | 2.821,3 | bonus-bible-goods-440.avif: 124,4 |
| bonus-proverbios-na-ponta-do-lapis.png | 2.749,8 | bonus-proverbios-na-ponta-do-lapis-440.avif: 113,2 |
| bonus-tabuada-com-noe.png | 2.841,7 | bonus-tabuada-com-noe-440.avif: 117,6 |
| bonus-emociobook.png | 2.755,2 | bonus-emociobook-440.avif: 125,3 |
| garantia-jesus-criancas.png | 1.732,7 | garantia-jesus-criancas-800.avif: 88,2 |

Todas as variantes, dimensões, bytes, qualidade do encoder e hashes dos originais estão em `results.json`. As cópias aumentam o armazenamento do repositório porque os originais foram mantidos; os downloads normais da página diminuem. Os PNGs originais de alta resolução ficam reservados para ampliação ou fallback; o maior candidato das atividades pode reutilizar o WebP original.

A comparação numérica contra o original redimensionado teve SSIM mínimo 0.994888, incluindo o fallback WebP. A logo redimensionada lossless teve comparação exata. O SSIM foi acompanhado por comparação de capturas, leitura dos textos e verificação de proporções; não é uma promessa de igualdade binária das cópias comprimidas.

## Carregamento, CSS e JavaScript

- Imagem principal e logo carregam imediatamente; somente a principal tem prioridade alta.
- As imagens abaixo da dobra reservam a proporção original e usam `loading="lazy"` inicialmente. IntersectionObserver habilita os recursos perto da tela, após o recurso LCP, e promove o download quando necessário. Sem suporte ao observer, há fallback nativo.
- Os carrosséis preparam o loop completo a 1000 px da área visível, incluindo duplicatas, e aguardam a decodificação antes do movimento. Atividades mantêm `img` direto com srcset. Velocidade 0,45, retomada de 800 ms, arraste, toque, teclado, hover e movimento reduzido foram preservados.
- Preços, garantia, FAQ, textos, logo, proporções, cores e CSS das dez seções foram mantidos. Os links de ampliação e diálogos continuam usando os arquivos originais.
- O CSS gerado é o mesmo arquivo de 40,28 kB / 8,58 kB gzip; no build ele é incorporado ao HTML para remover sua requisição bloqueante. O plugin só atua em build e usa um limite de 64 KiB; não há duas cópias de regras sendo aplicadas.
- O build gera HTML estático a partir dos mesmos dez componentes (`scripts/prerender.mjs`), e o navegador usa `hydrateRoot` para manter todas as interações. A imagem LCP e o conteúdo inicial ficam disponíveis sem aguardar o bootstrap do React. Não há servidor Node em produção; o resultado continua sendo `dist/` estático. A hidratação foi conferida sem erros de console.
- Não houve remoção de React/Embla ou divisão assíncrona de componentes que pudesse alterar o funcionamento. O JS ganhou cerca de 2,4 KiB gzip com o catálogo e o controle de carregamento; Sharp é apenas uma dependência de desenvolvimento.

## Validação

34 testes aprovados, build Vite e `git diff --check`. Chromium em 320, 375, 390, 640, 768, 1024 e 1440 px, incluindo mobile DPR 2 e desktop DPR 1: conteúdo, medidas e estilos preservados, imagens carregadas, sem overflow horizontal. Capturas das seções com imagens comparadas em 375 e 1440 px, em área alta fixa para evitar redimensionamentos temporários da ferramenta. Testes de interação também executados separadamente em 390 × 844. Não houve erros de hidratação. Ampliações, fechamento, FAQ, preço/botão e CTA interno conferidos. Carrosséis conferidos com atraso artificial nos downloads, movimento, hover, pausa e retomada. Não houve downloads de PNGs originais antes de uma ação de ampliação.

## Reproduzir

```sh
npm ci
npm run images:optimize
npm test
npm run build
npm run performance:preview -- dist 4173
```

Em outro terminal, para auditoria opcional sem instalar Lighthouse nas dependências da página:

```sh
npm install --prefix work/performance/tools --no-package-lock lighthouse@13.5.0
CHROME_PATH=/usr/bin/chromium npm run performance:audit -- optimized http://127.0.0.1:4173
```

Ajuste `CHROME_PATH` para o Chrome/Chromium local, ou omita para autodetecção. Relatórios completos ficam em `work/performance/` (ignorado pelo Git). Os relatórios brutos das execuções medianas de LCP desta comparação estão preservados em `before.lighthouse.json.gz` e `after.lighthouse.json.gz`; `results.json` contém as três execuções, configurações, rede, imagens, qualidade e verificações.

Para comparar o antes, use um checkout separado de `62625c0`, instale as dependências e sirva seu build com as mesmas configurações, sem publicar. Não faça push em `codex/salmos-sales-page` para testar.
