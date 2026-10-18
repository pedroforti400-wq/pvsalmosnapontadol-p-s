import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../src/main';
import { getCheckoutUrl, formatPrice } from '../src/config';
describe('Página de vendas', () => {
 it('mostra a oferta e todas as seções de navegação', () => { render(<App/>); expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Uma letra mais bonita.Uma fé que floresce.'); for(const id of ['material','beneficios','como-funciona','oferta','faq']) expect(document.getElementById(id)).toBeTruthy(); expect(screen.getByText('R$ 29,90')).toBeInTheDocument(); });
 it('substitui a segunda seção por exemplos ilustrativos de escrita', () => {
  render(<App/>);
  const section=document.getElementById('material');
  expect(document.querySelectorAll('main > section')[1]).toBe(section);
  expect(within(section).getByRole('img')).toHaveAccessibleName(/Comparação ilustrativa: DEPOIS acima/);
  expect(section).toHaveTextContent('Exemplos ilustrativos de escrita. Não representam um resultado garantido.');
  expect(within(section).queryByRole('tablist')).not.toBeInTheDocument();
  expect(within(section).queryByRole('button')).not.toBeInTheDocument();
 });
 it('impede compra sem checkout e permite fechar o aviso', () => {render(<App/>); fireEvent.click(screen.getByRole('button',{name:'Quero meu Salmos na Ponta do Lápis'})); expect(screen.getByRole('dialog')).toHaveTextContent('nenhuma cobrança'); fireEvent.click(screen.getByRole('button',{name:'Fechar'})); expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); });
 it('mantém somente a logo oficial no cabeçalho', () => {
  render(<App/>);
  const header=screen.getByRole('banner');
  expect(within(header).getByRole('img',{name:'Salmos na Ponta do Lápis'})).toHaveAttribute('src','/images/logo-oficial-salmos.png');
  expect(header.textContent).toBe('');
  expect(within(header).queryByRole('navigation')).not.toBeInTheDocument();
  expect(within(header).queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByText('Um lápis na mão. A Palavra no coração.')).not.toBeInTheDocument();
 });
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
 it('fecha o aviso por Escape e restaura o foco', () => {
  render(<App/>);
  const trigger=screen.getByRole('button',{name:'Quero meu Salmos na Ponta do Lápis'});
  trigger.focus(); fireEvent.click(trigger);
  expect(screen.getByRole('button',{name:'Fechar'})).toHaveFocus();
  fireEvent.keyDown(document,{key:'Escape'});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
 });
});
