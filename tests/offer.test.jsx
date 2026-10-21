import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Offer from '../src/sections/Offer';
import { product, getCheckoutUrl } from '../src/config';

const original = { checkoutUrl: product.checkoutUrl, referencePriceConfirmed: product.referencePriceConfirmed };
afterEach(() => {
  Object.assign(product, original);
  window.history.replaceState(null, '', '/');
});

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

  it('repassa os cinco UTMs da página ao checkout, preservando nomes, IDs e caracteres especiais', () => {
    const tracking = {
      utm_source: 'FB',
      utm_campaign: 'Salmos — Mães & Filhos|12345',
      utm_medium: 'Público + Família|67890',
      utm_content: 'Vídeo 1|54321',
      utm_term: 'Instagram_Stories',
    };
    window.history.replaceState(null, '', `/?${new URLSearchParams({ ...tracking, fbclid: 'nao-repassar', redirect: 'https://outro.example' })}`);
    render(<Offer/>);
    const checkout = new URL(screen.getByRole('link', { name: cta }).href);
    expect(checkout.origin + checkout.pathname).toBe(product.checkoutUrl);
    expect(Object.fromEntries(checkout.searchParams)).toEqual(tracking);
  });

  it('preserva parâmetros próprios e fragmento do checkout e não adiciona UTMs vazios ou ausentes', () => {
    const checkout = new URL(getCheckoutUrl('https://checkout.example/kit?cupom=SALMOS&utm_source=original#pagamento', '?utm_source=FB&utm_campaign=&utm_medium=Familia%7C123&outro=ignorar'));
    expect(checkout.searchParams.get('cupom')).toBe('SALMOS');
    expect(checkout.hash).toBe('#pagamento');
    expect(Object.fromEntries(checkout.searchParams)).toEqual({ cupom: 'SALMOS', utm_source: 'FB', utm_medium: 'Familia|123' });
    expect(getCheckoutUrl(product.checkoutUrl, '')).toBe(product.checkoutUrl);
    expect(getCheckoutUrl('javascript:alert(1)', '?utm_source=FB')).toBeNull();
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
