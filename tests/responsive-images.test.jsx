import React from 'react';
import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ResponsiveImage, { imageSizes } from '../src/components/ResponsiveImage';
import manifest from '../src/optimized-images.json';

describe('Imagens responsivas sem alterar os originais', () => {
  it('oferece cópias WebP, preserva fallback e respeita a prioridade da imagem crítica', () => {
    const src = '/images/imagem-principal-salmos-com-bonus.png';
    render(<ResponsiveImage src={src} sizes={imageSizes.hero} alt="Kit completo" loading="eager" fetchPriority="high"/>);
    const img = screen.getByRole('img', { name: 'Kit completo' });
    expect(img).toHaveAttribute('data-original-src', src);
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img.getAttribute('srcset')).toContain('.avif ');
    expect(img).toHaveAttribute('sizes', imageSizes.hero);
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain(`imagesrcset="${img.getAttribute('srcset')}"`);
    expect(html).toContain(`imagesizes="${imageSizes.hero}"`);
    expect(html.match(/as="image"/g)).toHaveLength(1);
    expect(html.match(/as="font"/g)).toHaveLength(1);
    fireEvent.error(img);
    expect(img.getAttribute('srcset')).toContain('.avif ');
    Object.defineProperty(img, 'complete', { configurable: true, value: true });
    fireEvent.error(img);
    expect(img.getAttribute('srcset')).toContain('.webp ');
    fireEvent.error(img);
    expect(img).not.toHaveAttribute('srcset');
    expect(img).toHaveAttribute('src', src);
  });

  it('mantém URLs não catalogadas e usa lazy loading nas imagens não críticas', () => {
    render(<ResponsiveImage src="/images/futura.png" alt="Nova arte"/>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/images/futura.png');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img.parentElement.querySelector('source')).toBeNull();
  });

  it('mantém todos os arquivos originais e os destinos responsivos existentes e ordenados', () => {
    expect(Object.keys(manifest)).toHaveLength(21);
    for (const [original, image] of Object.entries(manifest)) {
      expect(existsSync(`public${original}`)).toBe(true);
      const widths = image.variants.map(variant => variant.width);
      expect(widths).toEqual([...widths].sort((a, b) => a - b));
      for (const variant of [...image.variants, ...(image.avifVariants || [])]) {
        expect(existsSync(`public${variant.src}`)).toBe(true);
        expect(variant.width).toBeLessThanOrEqual(image.width);
        expect(/\.(webp|avif)$/.test(variant.src)).toBe(true);
      }
    }
  });
});
