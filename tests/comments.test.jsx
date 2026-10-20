import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import IllustrativeComments from '../src/sections/IllustrativeComments';
import { comments } from '../src/comments';
import { CONTINUOUS_SPEED, RESUME_DELAY } from '../src/sections/MaterialCarousel';

const carousel = vi.hoisted(() => {
  const listeners = new Map();
  const motion = { play: vi.fn(), stop: vi.fn() };
  const api = {
    plugins: () => ({ autoScroll: motion }), scrollNext: vi.fn(), scrollPrev: vi.fn(),
    on(event, callback) { if (!listeners.has(event)) listeners.set(event, new Set()); listeners.get(event).add(callback); return api; },
    off(event, callback) { listeners.get(event)?.delete(callback); return api; },
  };
  return { api, motion, emit: event => listeners.get(event)?.forEach(fn => fn()), reset: () => listeners.clear(), viewport: () => {} };
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
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('Quarta seção: comentários ilustrativos', () => {
  it('preserva a copy e os quatro PNGs individuais, sem a frase inferior removida', () => {
    render(<IllustrativeComments/>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Quem vê, se encanta. Quem usa, recomenda.');
    expect(screen.getByText('Conheça o estilo dos comentários e experiências que inspiraram nossa apresentação do Salmos na Ponta do Lápis.')).toBeInTheDocument();
    expect(screen.queryByText('COMENTÁRIOS ILUSTRATIVOS')).not.toBeInTheDocument();
    expect(screen.queryByText('Comentários e perfis criados com IA para fins ilustrativos. Não são avaliações autênticas verificadas.')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Quatro comentários ilustrativos' })).not.toHaveAttribute('aria-describedby');
    expect(comments.map(comment => comment.src)).toEqual([
      '/images/depoimento-joely-cardoso.png',
      '/images/depoimento-juliana-ferreira.png',
      '/images/depoimento-juliana-martins.png',
      '/images/depoimento-mariana-costa.png',
    ]);
    expect(screen.getAllByRole('img')).toHaveLength(4);
    comments.forEach(comment => {
      const trigger = screen.getByRole('button', { name: `Ampliar comentário ilustrativo de ${comment.name}` });
      expect(within(trigger).getByRole('img')).toHaveAttribute('data-original-src', comment.src);
      expect(within(trigger).getByRole('img')).toHaveAccessibleName(new RegExp(comment.name));
    });
    expect(document.querySelector('img[src="/images/referencia-depoimentos.png"]')).toBeNull();
    expect(document.querySelector('img[src*="/images/comentarios/comentario-"]')).toBeNull();
    expect(document.querySelectorAll('.comment-slide')).toHaveLength(8);
    expect(document.querySelectorAll('.comment-slide[aria-hidden="true"]')).toHaveLength(4);
  });

  it('usa movimento contínuo e retoma após hover e arraste, sem temporizador de slides', () => {
    render(<IllustrativeComments/>);
    expect(CONTINUOUS_SPEED).toBe(0.45);
    expect(carousel.motion.play).toHaveBeenLastCalledWith(0);
    act(() => vi.advanceTimersByTime(10000)); expect(carousel.api.scrollNext).not.toHaveBeenCalled();
    const region = screen.getByRole('region', { name: 'Quatro comentários ilustrativos' });
    fireEvent.pointerEnter(region); expect(carousel.motion.stop).toHaveBeenCalled();
    carousel.motion.play.mockClear(); fireEvent.pointerLeave(region);
    expect(carousel.motion.play).toHaveBeenLastCalledWith(RESUME_DELAY);
    act(() => carousel.emit('pointerDown')); carousel.motion.play.mockClear();
    act(() => carousel.emit('pointerUp')); expect(carousel.motion.play).toHaveBeenLastCalledWith(RESUME_DELAY);
  });

  it('desativa o movimento automático com movimento reduzido e mantém navegação por teclado', () => {
    reduced = true; render(<IllustrativeComments/>);
    expect(carousel.motion.play).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole('region', { name: 'Quatro comentários ilustrativos' }), { key: 'ArrowRight' });
    expect(carousel.api.scrollNext).toHaveBeenCalledWith(true);
  });

  it('amplia um recorte, fecha por botão ou Escape e restaura foco e rolagem', () => {
    render(<IllustrativeComments/>);
    const trigger = screen.getByRole('button', { name: 'Ampliar comentário ilustrativo de Joely Cardoso' });
    trigger.focus(); fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Comentário ilustrativo · Joely Cardoso' });
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', comments[0].src);
    expect(within(dialog).getByRole('link', { name: 'Abrir cartão original' })).toHaveAttribute('href', comments[0].src);
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar comentário ampliado' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    fireEvent.click(trigger); fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('remove as ilustrações laterais do topo e não cria player visível', () => {
    render(<IllustrativeComments/>);
    expect(document.querySelectorAll('.comments-heading img')).toHaveLength(0);
    expect(document.querySelector('.comments-book')).toBeNull();
    expect(document.querySelector('.comments-girl')).toBeNull();
    expect(document.querySelector('.comments-botanical')).toBeNull();
    expect(document.querySelector('.comments-track .comments-girl')).toBeNull();
    expect(screen.queryByRole('button', { name: /pausar|retomar|play/i })).not.toBeInTheDocument();
  });
});
