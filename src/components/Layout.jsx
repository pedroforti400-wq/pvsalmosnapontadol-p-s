import { useState } from 'react';
import { ArrowUpRight, Menu, X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Brand } from './UI';
import { product } from '../config';

export function Header() {
  const [menu, setMenu] = useState(false);
  return <>
    <div className="announcement"><Sparkles size={13}/><span>Um lápis na mão. A Palavra no coração.</span><Sparkles size={13}/></div>
    <header className="site-header"><div className="container nav"><Brand/>
      <nav id="main-nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
        {[['O material', '#material'], ['Por que escolher?', '#beneficios'], ['Como funciona', '#como-funciona'], ['Dúvidas', '#faq']].map(([text, url]) => <a key={url} href={url} onClick={() => setMenu(false)}>{text}</a>)}
      </nav>
      <a className="nav-cta" href="#oferta">Quero meu material <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" aria-controls="main-nav" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)} onKeyDown={e=>{if(e.key==='Escape')setMenu(false);}}>{menu ? <X/> : <Menu/>}</button>
    </div></header>
  </>;
}
export function Footer() {
  return <>
    <section className="closing"><div className="container"><Heart className="closing-heart"/><span className="eyebrow">CADA TRAÇO PODE SER UM COMEÇO</span><h2>Hoje, uma letrinha.<br/>Amanhã, uma linda <em>história de fé.</em></h2><a className="button primary" href="#oferta">Vamos começar essa história? <ArrowRight size={18}/></a><span className="closing-star" aria-hidden="true">✦</span></div></section>
    <footer><div className="container footer-main"><Brand/><p>Palavra que inspira. Carinho que ensina.</p><a href="#inicio">Voltar ao início ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {product.name}.</span><span>Produto digital. Nenhum material físico será enviado.</span></div></footer>
  </>;
}
