# Salmos na Ponta do Lápis — reconstrução por etapas

React + Vite + CSS no repositório existente. Nenhuma publicação realizada.

## Etapa atual

A aplicação renderiza **somente o cabeçalho com a logo oficial e a primeira seção de apresentação**. A headline e a subheadline são as fornecidas pelo produtor. O fundo contínuo é #FAF7EF; azul, verde, amarelo e laranja aparecem nos destaques. O laranja do texto recebe um tom mais escuro para preservar contraste e legibilidade.

Os componentes das seções anteriores, suas artes, configurações e `src/styles.css` permanecem no repositório e no histórico, mas não são renderizados nem têm seus estilos importados nesta etapa. Não há oferta, compra, rodapé ou novas seções na página atual.

## Arquivo original necessário

A arte completa do produto com os quatro bônus foi mostrada no chat, mas **não está disponível como arquivo neste ambiente nem na branch**. Nenhuma arte substituta foi criada.

Envie o arquivo original, sem cortes nem alterações, para:

```
public/images/produto-com-quatro-bonus.png
```

Esse endereço já está configurado em `product.images.productWithBonuses` no arquivo `src/config.js`. Se o original tiver outra extensão, preserve seu formato e atualize esse campo para corresponder ao arquivo. Não basta renomear uma extensão diferente para PNG.

Depois de adicionar o arquivo, atualize o navegador. A imagem será exibida inteira, com largura responsiva e altura automática, sem sobreposição. Clicar ou tocar abre o próprio original em uma nova aba para ampliar. Enquanto ela estiver ausente, aparece apenas um aviso discreto de pendência, sem imagem genérica ou ícone quebrado.

A logo oficial `public/images/logo-oficial-salmos.png` foi mantida intacta.

## Atualizar a prévia no GitHub Codespaces

No Codespace existente, na pasta com `package.json`, confirme a branch e atualize:

```sh
git switch codex/salmos-sales-page
git pull --ff-only
```

Se o servidor já estiver rodando, recarregue a aba da prévia. Caso contrário:

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

Validação desta etapa: 6 testes aprovados e build Vite concluído. Chromium conferido em 320, 375, 390, 768 e 1440 px, com a logo centralizada, sem rolagem horizontal e sem erros de JavaScript. O link de pular para o conteúdo também foi conferido por teclado.

Os testes cobrem a copy exata, a presença de apenas uma seção, o cabeçalho contendo somente a logo, o link de ampliação e o tratamento da arte ausente. A revisão visual foi feita com o aviso de imagem pendente. A aparência da arte original só poderá ser validada após seu envio.

## Arquivos desta etapa

- `src/main.jsx`: composição restrita à etapa atual.
- `src/sections/ProductPresentation.jsx`: textos e apresentação da imagem original.
- `src/presentation.css`: tipografia local, paleta e responsividade da nova apresentação.
- `src/components/Header.css`: cabeçalho compacto e logo centralizada.
- `src/config.js`: caminho editável da imagem; dados anteriores preservados.
- `tests/app.test.jsx`: verificações da etapa atual.
