import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Offer from '../src/sections/Offer';
import { product } from '../src/config';

const original = { checkoutUrl: product.checkoutUrl, referencePriceConfirmed: product.referencePriceConfirmed };
afterEach(() => Object.assign(product, original));

const cta = /QUERO GARANTIR MEU KIT POR R\$\s27,90!/;

describe('Oferta final: preço e integração de compra', () => {
  it('mantém a compra desabilitada sem checkout e rejeita URLs inseguras', () => {
    product.checkoutUrl = '';
    const { rerender } = render(<Offer/>);
    expect(screen.getByRole('button', { name: cta })).toBeDisabled();
    expect(screen.getByText('Compra ainda não habilitada.')).toBeInTheDocument();
    expect(screen.getByText('R$ 27,90')).toBeInTheDocument();
    expect(screen.getByText(/Recebimento por e-mail após confirmação do pagamento/)).toBeInTheDocument();
    for (const url of ['javascript:alert(1)', 'http://checkout.example/kit']) {
      product.checkoutUrl = url; rerender(<Offer/>);
      expect(screen.getByRole('button', { name: cta })).toBeDisabled();
      expect(screen.queryByRole('link', { name: cta })).not.toBeInTheDocument();
    }
  });

  it('aponta somente para o checkout HTTPS configurado, sem inventar um destino', () => {
    product.checkoutUrl = 'https://checkout.example/kit';
    render(<Offer/>);
    expect(screen.getByRole('link', { name: cta })).toHaveAttribute('href', product.checkoutUrl);
    expect(screen.queryByRole('button', { name: cta })).not.toBeInTheDocument();
    expect(screen.queryByText('Compra ainda não habilitada.')).not.toBeInTheDocument();
  });

  it('mostra o preço de referência riscado somente com confirmação comercial', () => {
    product.referencePriceConfirmed = false;
    const { rerender } = render(<Offer/>);
    expect(screen.queryByText('R$ 99,90')).not.toBeInTheDocument();
    product.referencePriceConfirmed = true;
    rerender(<Offer/>);
    expect(screen.getByText('R$ 99,90').tagName).toBe('DEL');
    expect(screen.getByText('R$ 27,90')).toBeInTheDocument();
    expect(screen.queryByText(/instantâneo|vitalício|garantia de \d+ dias/i)).not.toBeInTheDocument();
  });
});
