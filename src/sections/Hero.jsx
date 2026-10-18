import { BookOpen, Heart, Pencil, FileText, Printer, ArrowDown, Check } from 'lucide-react';
import { BuyButton, Scene, CurvedArrow } from '../components/UI';

export default function Hero({ onBuy }) {
  return <>
    <section className="hero-section" id="inicio"><div className="container hero">
      <div className="hero-copy"><span className="eyebrow pill"><BookOpen size={13}/> CALIGRAFIA INFANTIL COM OS SALMOS</span>
        <h1>Pequenos traços.<br/><span>Grandes sementes<br/>de fé.<svg viewBox="0 0 360 18" aria-hidden="true"><path d="M4 12Q180-2 352 8"/></svg></span></h1>
        <p className="hero-subtitle">Uma letra mais bonita.<br/><strong>A Palavra de Deus mais pertinho.</strong></p>
        <p className="hero-description">Transforme a hora de escrever em um encontro com a fé. Conheça o <strong>Salmos na Ponta do Lápis</strong>: caligrafia, criatividade e momentos que ficam no coração.</p>
        <BuyButton onBuy={onBuy}>Quero conhecer o material</BuyButton>
        <div className="hero-notes"><span><FileText/>Material digital</span><span><Printer/>Para imprimir</span><span><Heart/>Para fazer juntos</span></div>
      </div>
      <div className="hero-art"><div className="hero-halo"/><span className="orbit-word">o aprendizado ganha um novo propósito</span>
        <Scene type="hero" eager alt="Personagens bíblicos infantis em 3D descobrindo um livro com crianças e uma ovelhinha"/>
        <div className="floating-note note-faith"><span><Heart size={19}/></span><div>Pequenas descobertas.<br/><strong>Um amor que acompanha.</strong></div></div>
        <div className="floating-note note-pencil"><Pencil size={20}/><span>Aprender pode ser<br/><strong>um ato de carinho.</strong></span></div>
        <span className="star star-one" aria-hidden="true">✦</span><span className="star star-two" aria-hidden="true">✧</span><span className="hero-dots" aria-hidden="true"/><CurvedArrow className="hero-arrow"/>
      </div>
    </div><div className="hero-bottom"><span><Check size={14}/>Um lápis. Uma página. Uma linda descoberta.</span><a href="#material" aria-label="Explorar o material"><ArrowDown size={18}/></a></div></section>
    <div className="ribbon"><div className="container"><span><BookOpen/>Palavra que inspira</span><i aria-hidden="true">✦</i><span><Pencil/>Escrita com significado</span><i aria-hidden="true">✦</i><span><Heart/>Conexão em família</span><i aria-hidden="true">✦</i><span><Printer/>Do PDF para o papel</span></div></div>
  </>;
}
