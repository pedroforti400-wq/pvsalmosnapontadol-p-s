import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MaterialCarousel, { AUTOPLAY_DELAY } from '../src/sections/MaterialCarousel';

const carousel = vi.hoisted(() => {
  let selected = 0;
  const listeners = new Map();
  const emit = event => listeners.get(event)?.forEach(callback => callback());
  const api = {
    selectedScrollSnap: () => selected,
    scrollNext: vi.fn(() => { selected = (selected + 1) % 6; emit('select'); }),
    scrollPrev: vi.fn(() => { selected = (selected + 5) % 6; emit('select'); }),
    scrollTo: vi.fn(index => { selected = index; emit('select'); }),
    on: (event, callback) => {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(callback); return api;
    },
    off: (event, callback) => { listeners.get(event)?.delete(callback); return api; },
  };
  return { api, emit, reset: () => { selected = 0; listeners.clear(); }, viewport: () => {} };
});
vi.mock('embla-carousel-react', () => ({ default: () => [carousel.viewport, carousel.api] }));

let reduced = false;
beforeEach(() => {
  vi.useFakeTimers(); vi.clearAllMocks(); carousel.reset(); reduced = false;
  vi.stubGlobal('matchMedia', () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback([{ isIntersecting: true }]); }
    disconnect() {}
  });
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', ''); } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); } });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });
const advance = () => act(() => vi.advanceTimersByTime(AUTOPLAY_DELAY));
const current = index => expect(screen.getByRole('button', { name: `Ir para atividade ${index}` })).toHaveAttribute('aria-current', 'true');

describe('Carrossel das atividades', () => {
  it('usa as seis imagens individuais e navega pelas setas, indicadores e loop', () => {
    render(<MaterialCarousel/>);
    expect(screen.getAllByRole('img')).toHaveLength(6);
    screen.getAllByRole('img').forEach((img, index) => expect(img).toHaveAttribute('src', `/images/atividade-0${index + 1}.webp`));
    current(1);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima atividade' })); current(2);
    fireEvent.click(screen.getByRole('button', { name: 'Atividade anterior' })); current(1);
    fireEvent.click(screen.getByRole('button', { name: 'Ir para atividade 6' })); current(6);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima atividade' })); current(1);
  });

  it('avança automaticamente e pausa no hover e durante o arraste', () => {
    render(<MaterialCarousel/>);
    advance(); current(2);
    const region = screen.getByRole('region', { name: 'Prévias das seis atividades' });
    fireEvent.mouseEnter(region); advance(); current(2);
    fireEvent.mouseLeave(region); advance(); current(3);
    act(() => carousel.emit('pointerDown')); advance(); current(3);
    act(() => carousel.emit('pointerUp')); advance(); current(4);
  });

  it('permite pausar e retomar o autoplay e pausa enquanto há foco nos controles', () => {
    render(<MaterialCarousel/>);
    fireEvent.click(screen.getByRole('button', { name: 'Pausar movimento automático' })); advance(); current(1);
    fireEvent.click(screen.getByRole('button', { name: 'Retomar movimento automático' })); advance(); current(2);
    const arrow = screen.getByRole('button', { name: 'Próxima atividade' });
    fireEvent.focus(arrow); advance(); current(2);
    fireEvent.blur(arrow, { relatedTarget: document.body }); advance(); current(3);
  });

  it('respeita movimento reduzido e mantém a navegação manual sem animação', () => {
    reduced = true; render(<MaterialCarousel/>);
    advance(); current(1);
    expect(screen.getByRole('button', { name: 'Movimento automático desativado pela sua preferência' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Próxima atividade' }));
    expect(carousel.api.scrollNext).toHaveBeenCalledWith(true); current(2);
  });

  it('amplia a atividade e pausa o autoplay até fechar por botão ou Escape', () => {
    render(<MaterialCarousel/>);
    const trigger = screen.getByRole('button', { name: /Ampliar atividade 1:/ });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Trace e copie — Salmo 23');
    expect(screen.getByRole('link', { name: /Ver em tamanho original/ })).toHaveAttribute('href', '/images/atividade-01.webp');
    advance(); current(1);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar atividade ampliada' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    fireEvent.click(trigger);
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    advance(); current(2);
  });

  it('direciona o CTA ao destino provisório com rolagem suave e foco acessível', () => {
    render(<><MaterialCarousel/><div id="checkout-final" tabIndex={-1}>Área de oferta em preparação.</div></>);
    const target = document.getElementById('checkout-final'); target.scrollIntoView = vi.fn();
    fireEvent.click(screen.getByRole('link', { name: 'Quero garantir agora' }));
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(target).toHaveFocus(); expect(window.location.hash).toBe('#checkout-final');
  });
});
