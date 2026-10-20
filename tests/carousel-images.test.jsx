import React, { useRef } from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import useCarouselImages from '../src/hooks/useCarouselImages';

afterEach(() => vi.unstubAllGlobals());
it('prepara todos os slides antes de liberar o movimento do loop', async () => {
  let intersect;
  let resolveFirst, resolveLast;
  const decoded = [new Promise(resolve => { resolveFirst = resolve; }), new Promise(resolve => { resolveLast = resolve; })];
  const original = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'decode');
  Object.defineProperty(HTMLImageElement.prototype, 'decode', { configurable: true, value() { return decoded[Number(this.dataset.index)]; } });
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options) { intersect = callback; expect(options.rootMargin).toBe('1000px 0px'); }
    observe() {}
    disconnect() {}
  });
  function Loop() {
    const root = useRef(null);
    const ready = useCarouselImages(root);
    return <div ref={root}><output>{ready ? 'Pronto' : 'Preparando'}</output><img data-index="0" alt="Primeiro" loading="lazy"/><img data-index="1" alt="Último" loading="lazy"/></div>;
  }
  try {
    render(<Loop/>);
    expect(screen.getByText('Preparando')).toBeInTheDocument();
    act(() => intersect([{ isIntersecting: true }]));
    screen.getAllByRole('img').forEach(img => expect(img.loading).toBe('eager'));
    await act(async () => { screen.getAllByRole('img').forEach(img => img.dispatchEvent(new Event('load'))); resolveFirst(); });
    expect(screen.getByText('Preparando')).toBeInTheDocument();
    await act(async () => { resolveLast(); });
    expect(screen.getByText('Pronto')).toBeInTheDocument();
  } finally {
    if (original) Object.defineProperty(HTMLImageElement.prototype, 'decode', original);
    else delete HTMLImageElement.prototype.decode;
  }
});
