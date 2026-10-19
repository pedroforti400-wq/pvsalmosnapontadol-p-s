import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import BeforeAfter from '../src/sections/BeforeAfter';

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', ''); } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); } });
});

describe('Terceira seção: imagem original e ampliação', () => {
  it('mantém a arte original sem legenda visível e permite ampliar e fechar pelo botão', () => {
    render(<BeforeAfter/>);
    const section = screen.getByRole('region', { name: 'Caligrafia e aprendizado com propósito' });
    expect(within(section).getByRole('img')).toHaveAttribute('src', '/images/terceira-secao-salmos-antes-depois.png');
    expect(within(section).getByRole('img')).toHaveAccessibleName(/Simulação de escrita criada com IA/);
    expect(section.querySelector('figcaption')).toBeNull();
    expect(screen.queryByText('Simulação de escrita criada com IA. Não representa resultados reais nem garante evolução.')).not.toBeInTheDocument();
    expect(within(section).queryByRole('heading')).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Ampliar comparação ilustrativa de escrita' });
    trigger.focus(); fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Comparação ilustrativa de escrita' });
    expect(within(dialog).queryByText('Simulação de escrita criada com IA. Não representa resultados reais nem garante evolução.')).not.toBeInTheDocument();
    expect(within(dialog).getByRole('img')).toHaveAttribute('width', '1672');
    expect(within(dialog).getByRole('region', { name: /Imagem ampliada/ })).toHaveAttribute('tabindex', '0');
    expect(within(dialog).getByRole('link', { name: 'Abrir imagem original' })).toHaveAttribute('href', '/images/terceira-secao-salmos-antes-depois.png');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar comparação ampliada' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe(''); expect(trigger).toHaveFocus();
  });

  it('permite fechar por Escape ou pelo fundo e restaura a rolagem', () => {
    render(<BeforeAfter/>);
    const trigger = screen.getByRole('button', { name: 'Ampliar comparação ilustrativa de escrita' });
    fireEvent.click(trigger);
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(trigger); fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
