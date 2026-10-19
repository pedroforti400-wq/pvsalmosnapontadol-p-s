import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Guarantee from '../src/sections/Guarantee';
import { product } from '../src/config';

describe('Garantia de satisfação confirmada pelo produtor', () => {
  it('informa o prazo e a política solicitada sem criar um fluxo de reembolso', () => {
    render(<Guarantee/>);
    const region = screen.getByRole('region', { name: 'Sua compra protegida com garantia de 7 dias' });
    expect(product.guaranteeDays).toBe(7);
    expect(within(region).getByText('Se por qualquer motivo você sentir que o material não é o ideal para sua família, você pode solicitar o reembolso dentro de 7 dias. Queremos que sua experiência seja leve, segura e feliz do começo ao fim.')).toBeInTheDocument();
    expect(within(region).getByText('7 DIAS')).toBeInTheDocument();
    expect(within(region).getByText('DE GARANTIA')).toBeInTheDocument();
    expect(within(region).getAllByRole('listitem')).toHaveLength(3);
    expect(within(region).getAllByRole('heading', { level: 3 }).map(el => el.textContent)).toEqual([
      'Compra sem risco', '7 dias para avaliar', 'Mais confiança para comprar',
    ]);
    expect(within(region).getByText('Você pode conhecer o material com tranquilidade e segurança.')).toBeInTheDocument();
    expect(within(region).getByText('Se achar que o conteúdo não atende suas expectativas, é possível solicitar reembolso dentro do prazo.')).toBeInTheDocument();
    expect(within(region).getByText('Nosso objetivo é que você se sinta feliz e segura com sua decisão.')).toBeInTheDocument();
    expect(within(region).queryByRole('link')).not.toBeInTheDocument();
    expect(within(region).queryByRole('button')).not.toBeInTheDocument();
    expect(within(region).queryByRole('img')).not.toBeInTheDocument();
    expect(region.querySelector('img')).toHaveAttribute('alt', '');
  });
});
