import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import FAQ from '../src/sections/FAQ';

const questions = [
  'O material é físico ou digital?',
  'Como vou receber meu material?',
  'Preciso imprimir todas as atividades de uma vez?',
  'Quantas atividades estão incluídas?',
  'Os quatro bônus são realmente gratuitos?',
  'Para qual idade o material é indicado?',
  'Posso utilizar o material na escola ou na igreja?',
  'E se eu comprar e não gostar?',
];

describe('FAQ com uma resposta aberta por vez', () => {
  it('mostra o cabeçalho e as oito perguntas inicialmente recolhidas, com relações acessíveis', () => {
    render(<FAQ/>);
    const faq = screen.getByRole('region', { name: 'Perguntas Frequentes' });
    expect(within(faq).getByText('AINDA TEM ALGUMA DÚVIDA?')).toBeInTheDocument();
    expect(within(faq).getByText('Tudo o que você precisa saber sobre o Salmos na Ponta do Lápis.')).toBeInTheDocument();
    const buttons = within(faq).getAllByRole('button');
    expect(buttons.map(button => button.textContent)).toEqual(questions);
    const panels = buttons.map(button => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button.querySelector('.lucide-plus')).not.toBeNull();
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      expect(panel).toHaveAttribute('role', 'region');
      expect(panel).toHaveAttribute('aria-labelledby', button.id);
      expect(panel).toHaveAttribute('aria-hidden', 'true');
      expect(panel).toHaveAttribute('inert');
      return panel.id;
    });
    expect(new Set(panels).size).toBe(8);
    expect(within(faq).queryAllByRole('region')).toHaveLength(0);
  });

  it('abre, troca e recolhe respostas, sincronizando ícones e estado acessível', () => {
    render(<FAQ/>);
    const first = screen.getByRole('button', { name: questions[0] });
    const last = screen.getByRole('button', { name: questions[7] });
    fireEvent.click(first);
    const digitalAnswer = screen.getByRole('region', { name: questions[0] });
    expect(digitalAnswer).toHaveTextContent('O Salmos na Ponta do Lápis é um produto 100% digital. Você recebe os arquivos em PDF para baixar e imprimir, sem precisar esperar uma entrega física.');
    expect(digitalAnswer).not.toHaveAttribute('inert');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(first.querySelector('.lucide-minus')).not.toBeNull();
    fireEvent.click(last);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(digitalAnswer).toHaveAttribute('aria-hidden', 'true');
    expect(digitalAnswer).toHaveAttribute('inert');
    expect(first.querySelector('.lucide-plus')).not.toBeNull();
    expect(screen.queryByRole('region', { name: questions[0] })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: questions[7] })).toHaveTextContent('Você conta com 7 dias de garantia de satisfação. Caso o material não atenda às suas expectativas, poderá solicitar o reembolso dentro desse prazo, conforme as condições da oferta.');
    expect(document.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(1);
    fireEvent.click(last);
    expect(document.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(0);
    expect(screen.queryByRole('region', { name: questions[7] })).not.toBeInTheDocument();
  });

  it('preserva as condições de entrega, licença e bônus nos textos fornecidos', () => {
    render(<FAQ/>);
    for (const [question, answer] of [
      [questions[1], 'Após a confirmação do pagamento, você receberá no e-mail informado durante a compra as instruções para acessar seu material.'],
      [questions[4], 'Sim! Ao adquirir o Salmos na Ponta do Lápis nesta oferta, você também recebe Bible Goods, Provérbios na Ponta do Lápis, Tabuada com Noé e Emociobook, sem custo adicional.'],
      [questions[6], 'O conteúdo pode ser útil em atividades educativas cristãs, em família, na escola ou no ministério infantil. O uso coletivo e a reprodução dos arquivos devem respeitar as condições de licença do produto.'],
    ]) {
      fireEvent.click(screen.getByRole('button', { name: question }));
      expect(screen.getByRole('region', { name: question })).toHaveTextContent(answer);
    }
  });

  it('navega pelas perguntas com setas, Home e End sem abrir respostas ao mover o foco', () => {
    render(<FAQ/>);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    fireEvent.keyDown(buttons[0], { key: 'ArrowUp' });
    expect(buttons[7]).toHaveFocus();
    fireEvent.keyDown(buttons[7], { key: 'ArrowDown' });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(buttons[0], { key: 'End' });
    expect(buttons[7]).toHaveFocus();
    fireEvent.keyDown(buttons[7], { key: 'Home' });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });
    expect(buttons[1]).toHaveFocus();
    expect(document.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(0);
  });
});
