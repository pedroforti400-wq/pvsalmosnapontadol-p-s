import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../src/main';
import { product, getCheckoutUrl } from '../src/config';

vi.mock('embla-carousel-react', () => ({ default: () => [() => {}, undefined] }));

const originalArtwork = product.images.productWithBonuses;
afterEach(() => { product.images.productWithBonuses = originalArtwork; });

describe('Primeira etapa da nova apresentação', () => {
  it('preserva as nove seções aprovadas e acrescenta um único FAQ após a garantia', () => {
    render(<App/>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Mais de 200 atividades bíblicas para desenvolver a caligrafia e cultivar a fé desde a infância!'
    );
    const intro = within(document.getElementById('inicio')).getByText(/Conheça o/, { selector: 'p' });
    expect(intro.textContent.trim()).toBe(
      'Conheça o Salmos na Ponta do Lápis: um material digital para imprimir, que une exercícios de escrita, criatividade e os ensinamentos dos Salmos.'
    );
    expect(within(intro).getByText(product.name).tagName).toBe('STRONG');
    expect(document.querySelectorAll('main > section')).toHaveLength(10);
    expect(document.querySelectorAll('main > section')[0]).toHaveAttribute('id', 'inicio');
    expect(document.querySelectorAll('main > section')[1]).toHaveAttribute('id', 'atividades');
    expect(document.querySelectorAll('main > section')[2]).toHaveAttribute('id', 'escrita-com-proposito');
    expect(document.querySelectorAll('main > section')[3]).toHaveAttribute('id', 'comentarios-ilustrativos');
    expect(document.querySelectorAll('main > section')[4]).toHaveAttribute('id', 'para-quem');
    expect(document.querySelectorAll('#para-quem')).toHaveLength(1);
    expect(document.querySelectorAll('main > section')[5]).toHaveAttribute('id', 'bonus');
    expect(document.querySelectorAll('#bonus')).toHaveLength(1);
    expect(document.getElementById('para-quem').nextElementSibling).toBe(document.getElementById('bonus'));
    expect(document.querySelectorAll('main > section')[6]).toHaveAttribute('id', 'como-funciona');
    expect(document.querySelectorAll('#como-funciona')).toHaveLength(1);
    expect(document.getElementById('bonus').nextElementSibling).toBe(document.getElementById('como-funciona'));
    expect(document.getElementById('como-funciona').nextElementSibling).toBe(document.getElementById('checkout-final'));
    expect(document.querySelectorAll('main > section')[7]).toHaveAttribute('id', 'checkout-final');
    expect(document.querySelectorAll('#checkout-final')).toHaveLength(1);
    expect(document.querySelectorAll('#garantia')).toHaveLength(1);
    expect(document.getElementById('checkout-final').nextElementSibling).toBe(document.getElementById('garantia'));
    expect(screen.getByRole('region', { name: 'Sua compra protegida com garantia de 7 dias' })).toHaveAttribute('id', 'garantia');
    expect(document.querySelectorAll('#faq')).toHaveLength(1);
    expect(document.getElementById('garantia').nextElementSibling).toBe(document.getElementById('faq'));
    expect(screen.getByRole('region', { name: 'Perguntas Frequentes' })).toHaveAttribute('id', 'faq');
    expect(screen.getByRole('region', { name: 'Leve o Salmos na Ponta do Lápis + 4 bônus especiais!' })).toHaveAttribute('id', 'checkout-final');
    const delivery = within(screen.getByRole('region', { name: 'Simples, rápido e pronto para imprimir!' }));
    expect(delivery.getByText('COMO VOCÊ RECEBE')).toBeInTheDocument();
    expect(delivery.getByText('Após a compra, receba o acesso por e-mail, baixe seu material e comece a aproveitar as atividades!')).toBeInTheDocument();
    expect(delivery.getAllByRole('article')).toHaveLength(5);
    expect(delivery.getAllByRole('heading', { level: 3 }).map(title => title.textContent)).toEqual([
      'Faça sua compra', 'Receba no seu e-mail', 'Baixe o material', 'Imprima e aproveite', 'Guarde seus arquivos',
    ]);
    expect(delivery.getByText('Após a confirmação do pagamento, você receberá no e-mail informado na compra as instruções para acessar seu material.')).toBeInTheDocument();
    expect(delivery.getByText('PARA SEMPRE')).toBeInTheDocument();
    expect(delivery.getByText('Salve os PDFs no seu dispositivo para consultar e imprimir novamente quando precisar.')).toBeInTheDocument();
    expect(delivery.queryByText(/instantâneo|imediato|em \d+ minutos/i)).not.toBeInTheDocument();
    const bonusSection = within(screen.getByRole('region', { name: 'E ainda tem mais: 4 bônus especiais para enriquecer a experiência das crianças!' }));
    expect(bonusSection.getAllByRole('article')).toHaveLength(4);
    expect(bonusSection.getAllByText('GRÁTIS')).toHaveLength(4);
    expect(bonusSection.getAllByText('Incluso na sua compra')).toHaveLength(4);
    expect(bonusSection.getByText('Gostou dos presentes? Então aproveite essa oportunidade!')).toBeInTheDocument();
    expect(bonusSection.getByRole('link', { name: 'QUERO MEU KIT COMPLETO + 4 BÔNUS!' })).toHaveAttribute('href', '#checkout-final');
    expect([...document.querySelectorAll('#bonus del')].map(price => price.textContent.replace(/\s/g, ' '))).toEqual(['R$ 12,99', 'R$ 17,99', 'R$ 25,49', 'R$ 15,99']);
    expect(document.querySelector('.bonuses-summary')).toHaveTextContent('Você recebe R$ 72,46 em bônus inclusos sem custo adicional.');
    expect(bonusSection.getAllByRole('img').map(image => image.getAttribute('src'))).toEqual([
      '/images/bonus-bible-goods.png', '/images/bonus-proverbios-na-ponta-do-lapis.png', '/images/bonus-tabuada-com-noe.png', '/images/bonus-emociobook.png',
    ]);
    expect(document.querySelector('img[src="/images/referencia-quatro-bonus-salmos.png"]')).toBeNull();
    const audiences = within(screen.getByRole('region', { name: 'Para quem é o Salmos na Ponta do Lápis?' }));
    expect(audiences.getByText('FEITO COM AMOR E PROPÓSITO')).toBeInTheDocument();
    expect(audiences.getByText('Um material especial para quem acredita que aprender a escrever também pode ser uma oportunidade de crescer na fé.')).toBeInTheDocument();
    expect(audiences.getAllByRole('article')).toHaveLength(3);
    expect(audiences.getAllByRole('img').map(image => image.getAttribute('src'))).toEqual([
      '/images/para-quem-familias.png', '/images/para-quem-educadores.png', '/images/para-quem-ministerios.png',
    ]);
    expect(within(document.getElementById('escrita-com-proposito')).getByRole('img')).toHaveAttribute('src', '/images/terceira-secao-salmos-antes-depois.png');
    expect(document.getElementById('checkout-final')).toHaveAttribute('aria-labelledby', 'final-offer-title');
    expect(document.getElementById('checkout-final')).toHaveAttribute('tabindex', '-1');
    expect(screen.queryByText('Área de oferta em preparação.')).not.toBeInTheDocument();
    expect(screen.queryByText('Toque ou clique na imagem para ver os detalhes em uma nova aba.')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(within(document.getElementById('inicio')).queryByRole('button')).not.toBeInTheDocument();
    for (const id of ['material', 'beneficios', 'oferta']) {
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
