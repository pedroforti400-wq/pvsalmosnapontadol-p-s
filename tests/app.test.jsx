import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../src/main';
import { product, getCheckoutUrl } from '../src/config';

vi.mock('embla-carousel-react', () => ({ default: () => [() => {}, undefined] }));

const originalArtwork = product.images.productWithBonuses;
afterEach(() => { product.images.productWithBonuses = originalArtwork; });

describe('Primeira etapa da nova apresentação', () => {
  it('preserva as seções aprovadas e acrescenta a terceira seção com a arte oficial', () => {
    render(<App/>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Mais de 200 atividades bíblicas para desenvolver a caligrafia e cultivar a fé desde a infância!'
    );
    const intro = screen.getByText(/Conheça o/, { selector: 'p' });
    expect(intro.textContent.trim()).toBe(
      'Conheça o Salmos na Ponta do Lápis: um material digital para imprimir, que une exercícios de escrita, criatividade e os ensinamentos dos Salmos.'
    );
    expect(within(intro).getByText(product.name).tagName).toBe('STRONG');
    expect(document.querySelectorAll('main > section')).toHaveLength(3);
    expect(document.querySelectorAll('main > section')[0]).toHaveAttribute('id', 'inicio');
    expect(document.querySelectorAll('main > section')[1]).toHaveAttribute('id', 'atividades');
    expect(document.querySelectorAll('main > section')[2]).toHaveAttribute('id', 'escrita-com-proposito');
    expect(within(document.getElementById('escrita-com-proposito')).getByRole('img')).toHaveAttribute('src', '/images/terceira-secao-salmos-antes-depois.png');
    expect(document.getElementById('checkout-final')).toBeEmptyDOMElement();
    expect(document.getElementById('checkout-final')).toHaveAttribute('tabindex', '-1');
    expect(screen.queryByText('Área de oferta em preparação.')).not.toBeInTheDocument();
    expect(screen.queryByText('Toque ou clique na imagem para ver os detalhes em uma nova aba.')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(within(document.getElementById('inicio')).queryByRole('button')).not.toBeInTheDocument();
    for (const id of ['material', 'beneficios', 'oferta', 'faq']) {
      expect(document.getElementById(id)).toBeNull();
    }
  });

  it('mantém somente a arte oficial no cabeçalho', () => {
    render(<App/>);
    const header = screen.getByRole('banner');
    expect(within(header).getByRole('img', { name: product.name })).toHaveAttribute(
      'src', '/images/logo-oficial-salmos.png'
    );
    expect(header.textContent).toBe('');
    expect(within(header).queryByRole('navigation')).not.toBeInTheDocument();
    expect(within(header).queryByRole('button')).not.toBeInTheDocument();
    expect(document.querySelector('.skip')).toHaveAttribute('href', '#conteudo');
    expect(document.getElementById('conteudo')).toHaveAttribute('tabindex', '-1');
  });

  it('usa a arte original configurada e permite abrir sua resolução completa', () => {
    render(<App/>);
    const link = screen.getByRole('link', { name: /Ampliar a imagem do produto/ });
    expect(link).toHaveAttribute('href', '/images/imagem-principal-salmos-com-bonus.png');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(link).getByRole('img')).toHaveAttribute('src', originalArtwork);
    expect(within(link).queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.product-artwork-pending')).toBeNull();
  });

  it('não mostra mensagem provisória, caixa vazia ou imagem genérica se o arquivo falhar', () => {
    render(<App/>);
    fireEvent.error(screen.getByRole('img', { name: /produto principal, tablet/ }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.product-artwork-pending')).toBeNull();
    expect(screen.queryByText(/A imagem original do material/)).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /produto principal, tablet/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Ampliar a imagem do produto/ })).not.toBeInTheDocument();
    expect(within(document.getElementById('inicio')).queryByRole('img')).not.toBeInTheDocument();
  });

  it('não cria um espaço reservado quando o caminho da imagem está vazio', () => {
    product.images.productWithBonuses = '';
    render(<App/>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(within(document.getElementById('inicio')).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('Configuração preservada para as próximas etapas', () => {
  it('continua rejeitando URLs de checkout inseguras', () => {
    expect(getCheckoutUrl('')).toBeNull();
    expect(getCheckoutUrl('javascript:alert(1)')).toBeNull();
    expect(getCheckoutUrl('http://loja.example')).toBeNull();
    expect(getCheckoutUrl('https://loja.example/comprar')).toBe('https://loja.example/comprar');
  });
});
