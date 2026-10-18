import { Heart, ArrowRight } from 'lucide-react';
import { Brand } from './UI';
import { product } from '../config';
import './Header.css';

export function Header() {
  return <header className="site-header site-header-centered"><Brand/></header>;
}
export function Footer() {
  return <>
    <section className="closing"><div className="container"><Heart className="closing-heart"/><span className="eyebrow">CADA TRAÇO PODE SER UM COMEÇO</span><h2>Hoje, uma letrinha.<br/>Amanhã, uma linda <em>história de fé.</em></h2><a className="button primary" href="#oferta">Vamos começar essa história? <ArrowRight size={18}/></a><span className="closing-star" aria-hidden="true">✦</span></div></section>
    <footer><div className="container footer-main"><Brand/><p>Palavra que inspira. Carinho que ensina.</p><a href="#inicio">Voltar ao início ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {product.name}.</span><span>Produto digital. Nenhum material físico será enviado.</span></div></footer>
  </>;
}
