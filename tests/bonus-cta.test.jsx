import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Bonuses from '../src/sections/Bonuses';

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, '', '/');
});

describe('CTA ao final dos bônus', () => {
  it.each([false, true])('navega apenas à oferta interna, respeitando movimento reduzido: %s', reduced => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: reduced })));
    render(<><Bonuses/><section id="checkout-final" tabIndex={-1} aria-label="Oferta final"/></>);
    const target = document.getElementById('checkout-final');
    target.scrollIntoView = vi.fn();
    const link = screen.getByRole('link', { name: 'QUERO MEU KIT COMPLETO + 4 BÔNUS!' });
    expect(link).toHaveAttribute('href', '#checkout-final');
    expect(link).not.toHaveAttribute('target');
    expect(document.querySelector('.bonuses-summary').nextElementSibling).toContainElement(link);
    fireEvent.click(link);
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: reduced ? 'instant' : 'smooth', block: 'end' });
    expect(target).toHaveFocus();
    expect(window.location.hash).toBe('#checkout-final');
  });
});
