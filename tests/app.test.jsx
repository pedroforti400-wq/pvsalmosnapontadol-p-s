import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/main';
import { getCheckoutUrl, formatPrice } from '../src/config';
describe('Página de vendas', () => {
 it('mostra a oferta e todas as seções de navegação', () => { render(<App/>); expect(screen.getByRole('heading', {level:1})).toHaveTextContent('sementes'); for(const id of ['material','beneficios','como-funciona','oferta','faq']) expect(document.getElementById(id)).toBeTruthy(); expect(screen.getByText('R$ 29,90')).toBeInTheDocument(); });
 it('troca a amostra de atividade', () => {render(<App/>); fireEvent.click(screen.getByRole('tab',{name:'Colorir'})); expect(screen.getByRole('tab',{name:'Colorir'})).toHaveAttribute('aria-selected','true'); expect(screen.getByRole('tabpanel')).toHaveTextContent('Toda criação louva'); fireEvent.click(screen.getByRole('button',{name:'Próxima amostra'})); expect(screen.getByRole('tab',{name:'Tracejar'})).toHaveAttribute('aria-selected','true'); });
 it('impede compra sem checkout e permite fechar o aviso', () => {render(<App/>); fireEvent.click(screen.getByRole('button',{name:'Quero conhecer o material'})); expect(screen.getByRole('dialog')).toHaveTextContent('nenhuma cobrança'); fireEvent.click(screen.getByRole('button',{name:'Fechar'})); expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); });
 it('abre e fecha a navegação móvel ao selecionar uma seção', () => {render(<App/>); const toggle=screen.getByRole('button',{name:'Abrir menu'}); fireEvent.click(toggle); expect(toggle).toHaveAttribute('aria-expanded','true'); fireEvent.click(screen.getByRole('link',{name:'O material'})); expect(toggle).toHaveAttribute('aria-expanded','false'); });
 it('aceita somente checkout HTTPS válido', () => {expect(getCheckoutUrl('')).toBeNull();expect(getCheckoutUrl('javascript:alert(1)')).toBeNull();expect(getCheckoutUrl('http://loja.example')).toBeNull();expect(getCheckoutUrl('https://loja.example/comprar')).toBe('https://loja.example/comprar');expect(formatPrice(29.9)).toMatch(/29,90/);});
});
