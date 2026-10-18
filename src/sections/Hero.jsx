import { BookOpen, Heart, Pencil, FileText, Printer, ArrowDown, Check, Sparkles } from 'lucide-react';
import { BuyButton, Scene } from '../components/UI';
import './Hero.css';

const floatingCards = [
  { key: 'faith', Icon: BookOpen, title: 'Palavra que inspira', text: 'Os Salmos mais pertinho.', tone: 'blue' },
  { key: 'letters', Icon: Pencil, title: 'Traços com carinho', text: 'Cada letrinha, uma descoberta.', tone: 'orange' },
  { key: 'discovery', Icon: Sparkles, title: 'Aprender e criar', text: 'No tempo de cada criança.', tone: 'yellow' },
  { key: 'together', Icon: Heart, title: 'Propósito no papel', text: 'Um momento para viver juntos.', tone: 'green' },
];

export default function Hero({ onBuy }) {
  return <>
    <section className="hero-section hero-refined" id="inicio" aria-labelledby="hero-title">
      <div className="container hero">
        <div className="hero-copy">
          <span className="eyebrow pill"><BookOpen size={13}/> CALIGRAFIA INFANTIL COM OS SALMOS</span>
          <h1 id="hero-title">Uma letra mais bonita.<span>Uma fé que floresce.</span></h1>
          <p className="hero-subtitle">Com <strong>Salmos na Ponta do Lápis</strong>, a descoberta da escrita encontra o carinho e a beleza da Palavra de Deus.</p>
          <div className="hero-calligraphy" aria-label="Exemplo visual de escrita cursiva: Fé em cada traço.">
            <span className="calligraphy-label">UM TRAÇO DE CADA VEZ</span>
            <span className="calligraphy-word" aria-hidden="true">Fé em cada traço.</span>
            <Pencil className="calligraphy-pencil" size={22} aria-hidden="true"/>
          </div>
          <div className="hero-quick-benefit">
            <span className="quick-benefit-icon"><BookOpen size={23}/></span>
            <div><strong>ESCRITA, FÉ E APRENDIZADO</strong><p>Versículos dos Salmos, letras para praticar e um tempo precioso para descobrir juntos.</p></div>
          </div>
          <BuyButton onBuy={onBuy}>Quero conhecer o material</BuyButton>
          <div className="hero-notes"><span><FileText/>Material digital</span><span><Printer/>Para imprimir</span><span><Heart/>Para fazer juntos</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-backdrop" aria-hidden="true"/>
          <Scene type="hero" eager alt="Personagens bíblicos infantis em 3D descobrindo um livro com crianças e uma ovelhinha"/>
          {floatingCards.map(({ key, Icon, title, text, tone }) => <div className={`hero-float-card float-${key} tone-${tone}`} key={key}>
            <span className="float-icon"><Icon size={18} aria-hidden="true"/></span>
            <div><strong>{title}</strong><span>{text}</span></div>
          </div>)}
          <span className="hero-mini-star star-blue" aria-hidden="true">✧</span>
          <span className="hero-mini-star star-gold" aria-hidden="true">✦</span>
          <span className="hero-art-caption">pequenas letras, lindas descobertas</span>
        </div>
      </div>
      <div className="hero-bottom"><span><Check size={14}/>Um lápis. Uma página. Uma linda descoberta.</span><a href="#material" aria-label="Explorar o material"><ArrowDown size={18}/></a></div>
    </section>
    <div className="ribbon"><div className="container"><span><BookOpen/>Palavra que inspira</span><i aria-hidden="true">✦</i><span><Pencil/>Escrita com significado</span><i aria-hidden="true">✦</i><span><Heart/>Conexão em família</span><i aria-hidden="true">✦</i><span><Printer/>Do PDF para o papel</span></div></div>
  </>;
}
