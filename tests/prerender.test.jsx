// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../src/main';

describe('HTML estático dos componentes aprovados', () => {
  it('renderiza as dez seções sem window/document, mantendo copy, preço, garantia e FAQ', () => {
    const html = renderToString(<App/>);
    expect(html.match(/<section /g)).toHaveLength(10);
    expect(html).toContain('Mais de ');
    expect(html).toContain('200 atividades bíblicas');
    expect(html).toContain('27,90');
    expect(html).toContain('Sua compra protegida com ');
    expect(html).toContain('Perguntas Frequentes');
    expect(html.match(/<button[^>]*aria-expanded="false"/g)).toHaveLength(8);
    expect(html.match(/<img[^>]*fetchPriority="high"/g)).toHaveLength(1);
  });
});
