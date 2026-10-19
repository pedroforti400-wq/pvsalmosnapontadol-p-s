import { CalendarDays, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { product } from '../config';
import './Guarantee.css';

const assurances = [
  { Icon: ShieldCheck, title: 'Compra sem risco', text: 'Você pode conhecer o material com tranquilidade e segurança.' },
  { Icon: CalendarDays, title: '7 dias para avaliar', text: 'Se achar que o conteúdo não atende suas expectativas, é possível solicitar reembolso dentro do prazo.' },
  { Icon: Heart, title: 'Mais confiança para comprar', text: 'Nosso objetivo é que você se sinta feliz e segura com sua decisão.' },
];

export default function Guarantee() {
  return <section id="garantia" className="satisfaction-section" aria-labelledby="satisfaction-title">
    <div className="satisfaction-card">
      <div className="satisfaction-visual">
        <div className="satisfaction-art" aria-hidden="true">
          <Star className="satisfaction-star" size={25}/>
          <img src="/images/garantia-jesus-criancas.png" alt="" width="1254" height="1254" loading="lazy" decoding="async"/>
          <Heart className="satisfaction-heart" size={20}/>
        </div>
        <div className="satisfaction-seal">
          <ShieldCheck size={28} strokeWidth={1.6} aria-hidden="true"/>
          <strong>{product.guaranteeDays} DIAS</strong>
          <span>DE GARANTIA</span>
        </div>
      </div>
      <div className="satisfaction-copy">
        <p className="satisfaction-eyebrow"><Sparkles size={16} aria-hidden="true"/>GARANTIA DE SATISFAÇÃO</p>
        <h2 id="satisfaction-title">Sua compra protegida com <span>garantia de {product.guaranteeDays} dias</span></h2>
        <p className="satisfaction-description">Se por qualquer motivo você sentir que o material não é o ideal para sua família, você pode solicitar o reembolso dentro de {product.guaranteeDays} dias. Queremos que sua experiência seja leve, segura e feliz do começo ao fim.</p>
        <ul className="satisfaction-points">
          {assurances.map(({ Icon, title, text }) => <li key={title}>
            <span className="satisfaction-point-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.7}/></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
