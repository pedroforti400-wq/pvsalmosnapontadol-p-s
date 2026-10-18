import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/main';
import { getCheckoutUrl, formatPrice } from '../src/config';
describe('Página de vendas', () => {
 it('mostra a oferta e todas as seções de navegação', () => { render(<App/>); expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Uma letra mais bonita.Uma fé que floresce.'); for(const id of ['material','beneficios','como-funciona','oferta','faq']) expect(document.getElementById(id)).toBeTruthy(); expect(screen.getByText('R$ 29,90')).toBeInTheDocument(); });
 it('troca a amostra de atividade', () => {render(<App/>); fireEvent.click(screen.getByRole('tab',{name:'Colorir'})); expect(screen.getByRole('tab',{name:'Colorir'})).toHaveAttribute('aria-selected','true'); expect(screen.getByRole('tabpanel')).toHaveTextContent('Toda criação louva'); fireEvent.click(screen.getByRole('button',{name:'Próxima amostra'})); expect(screen.getByRole('tab',{name:'Tracejar'})).toHaveAttribute('aria-selected','true'); });
 it('impede compra sem checkout e permite fechar o aviso', () => {render(<App/>); fireEvent.click(screen.getByRole('button',{name:'Quero conhecer o material'})); expect(screen.getByRole('dialog')).toHaveTextContent('nenhuma cobrança'); fireEvent.click(screen.getByRole('button',{name:'Fechar'})); expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); });
 it('abre e fecha a navegação móvel ao selecionar uma seção', () => {render(<App/>); const toggle=screen.getByRole('button',{name:'Abrir menu'}); fireEvent.click(toggle); expect(toggle).toHaveAttribute('aria-expanded','true'); fireEvent.click(screen.getByRole('link',{name:'O material'})); expect(toggle).toHaveAttribute('aria-expanded','false'); });
 it('aceita somente checkout HTTPS válido', () => {expect(getCheckoutUrl('')).toBeNull();expect(getCheckoutUrl('javascript:alert(1)')).toBeNull();expect(getCheckoutUrl('http://loja.example')).toBeNull();expect(getCheckoutUrl('https://loja.example/comprar')).toBe('https://loja.example/comprar');expect(formatPrice(29.9)).toMatch(/29,90/);});
});

describe('Interações da revisão visual', () => {
 it('abre somente uma resposta de FAQ por vez', () => {
  render(<App/>);
  const initial=screen.getByRole('button',{name:/O que é o Salmos na Ponta do Lápis/});
  const next=screen.getByRole('button',{name:/Vou receber um material físico/});
  expect(initial).toHaveAttribute('aria-expanded','true');
  fireEvent.click(next);
  expect(initial).toHaveAttribute('aria-expanded','false');
  expect(next).toHaveAttribute('aria-expanded','true');
  fireEvent.click(next);
  expect(next).toHaveAttribute('aria-expanded','false');
 });
 it('informa com transparência que o vídeo ainda não foi fornecido', () => {
  render(<App/>);
  fireEvent.click(screen.getByRole('button',{name:'Conhecer a demonstração em vídeo'}));
  expect(screen.getByRole('status')).toHaveTextContent('ainda não está disponível');
 });
 it('permite navegar nas amostras usando as setas do teclado', () => {
  render(<App/>);
  const first=screen.getByRole('tab',{name:'Tracejar'});
  first.focus();
  fireEvent.keyDown(first,{key:'ArrowRight'});
  const next=screen.getByRole('tab',{name:'Escrever'});
  expect(next).toHaveFocus();
  expect(next).toHaveAttribute('aria-selected','true');
  fireEvent.keyDown(next,{key:'End'});
  expect(screen.getByRole('tab',{name:'Colorir'})).toHaveFocus();
 });
 it('fecha o aviso por Escape e restaura o foco', () => {
  render(<App/>);
  const trigger=screen.getByRole('button',{name:'Quero conhecer o material'});
  trigger.focus(); fireEvent.click(trigger);
  expect(screen.getByRole('button',{name:'Fechar'})).toHaveFocus();
  fireEvent.keyDown(document,{key:'Escape'});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
 });
});
