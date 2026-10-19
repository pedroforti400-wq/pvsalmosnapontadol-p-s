import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MaterialCarousel, { RESUME_DELAY } from '../src/sections/MaterialCarousel';

const carousel = vi.hoisted(() => {
  let selected = 0;
  const listeners = new Map();
  const emit = event => listeners.get(event)?.forEach(callback => callback());
  const motion = { play: vi.fn(), stop: vi.fn() };
  const api = {
    plugins: () => ({ autoScroll: motion }),
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
  return { api, motion, emit, reset: () => { selected = 0; listeners.clear(); }, viewport: () => {} };
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

  it('usa movimento contínuo e retoma depois do hover e do arraste, sem temporizador de slides', () => {
    render(<MaterialCarousel/>);
    expect(carousel.motion.play).toHaveBeenLastCalledWith(0);
    act(() => vi.advanceTimersByTime(9000));
    expect(carousel.api.scrollNext).not.toHaveBeenCalled();
    const region = screen.getByRole('region', { name: 'Prévias das seis atividades' });
    fireEvent.pointerEnter(region); expect(carousel.motion.stop).toHaveBeenCalled();
    carousel.motion.play.mockClear();
    fireEvent.pointerLeave(region); expect(carousel.motion.play).toHaveBeenLastCalledWith(RESUME_DELAY);
    act(() => carousel.emit('pointerDown'));
    carousel.motion.play.mockClear();
    act(() => carousel.emit('pointerUp')); expect(carousel.motion.play).toHaveBeenLastCalledWith(RESUME_DELAY);
    act(() => carousel.emit('reInit')); expect(carousel.motion.play).toHaveBeenLastCalledWith(RESUME_DELAY);
  });

  it('remove o player e pausa para foco por teclado, retomando quando ele sai', () => {
    render(<MaterialCarousel/>);
    expect(screen.queryByRole('button', { name: /Pausar|Retomar|Movimento automático/ })).not.toBeInTheDocument();
    expect(document.querySelector('.activity-autoplay')).toBeNull();
    const arrow = screen.getByRole('button', { name: 'Próxima atividade' });
    fireEvent.focus(arrow); expect(carousel.motion.stop).toHaveBeenCalled();
    carousel.motion.play.mockClear();
    fireEvent.blur(arrow, { relatedTarget: document.body }); expect(carousel.motion.play).toHaveBeenCalled();
  });

  it('respeita movimento reduzido e mantém a navegação manual sem animação', () => {
    reduced = true; render(<MaterialCarousel/>);
    expect(carousel.motion.play).not.toHaveBeenCalled(); current(1);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima atividade' }));
    expect(carousel.api.scrollNext).toHaveBeenCalledWith(true); current(2);
  });

  it('amplia a atividade e retoma o movimento após fechar por botão ou Escape', () => {
    render(<MaterialCarousel/>);
    const trigger = screen.getByRole('button', { name: /Ampliar atividade 1:/ });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Trace e copie — Salmo 23');
    expect(screen.getByRole('link', { name: /Ver em tamanho original/ })).toHaveAttribute('href', '/images/atividade-01.webp');
    expect(carousel.motion.stop).toHaveBeenCalled(); current(1);
    carousel.motion.play.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar atividade ampliada' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(carousel.motion.play).toHaveBeenCalled();
    fireEvent.click(trigger);
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(carousel.motion.play).toHaveBeenCalled();
  });

  it('direciona o CTA ao destino provisório com rolagem suave e foco acessível', () => {
    render(<><MaterialCarousel/><div id="checkout-final" className="checkout-anchor" tabIndex={-1}/></>);
    const target = document.getElementById('checkout-final'); target.scrollIntoView = vi.fn();
    fireEvent.click(screen.getByRole('link', { name: 'Quero garantir agora' }));
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(target).toHaveFocus(); expect(window.location.hash).toBe('#checkout-final');
  });
});
