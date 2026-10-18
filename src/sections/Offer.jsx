import { Check, LockKeyhole, Sparkles, Download, Printer, Heart, ShieldCheck } from 'lucide-react';
import { BuyButton, Scene, Logo } from '../components/UI';
import { product, formatPrice, getCheckoutUrl } from '../config';

export default function Offer({ onBuy }) {
  return <section id="oferta" className="offer-section"><div className="container">
    <div className="offer-heading"><span className="eyebrow"><Sparkles size={14}/>{product.offerLabel}</span><h2>O próximo capítulo<br/>começa com um <em>sim.</em></h2></div>
    <div className="offer-grid"><div className="offer-card"><span className="offer-badge"><BookBadge/> SALMOS NA PONTA DO LÁPIS</span><h3>Um pequeno investimento.<br/><span>Um propósito tão bonito.</span></h3><p>Leve a caligrafia com os Salmos para os seus momentos de aprendizado em família.</p>
      <ul className="checklist"><li><Check/>Material digital para baixar</li><li><Check/>Proposta de escrita com temática bíblica</li><li><Check/>Atividades para imprimir e acompanhar</li></ul>
      <div className="price"><span>Pagamento único</span><strong>{formatPrice(product.price)}</strong><span>Sem assinatura ou mensalidade</span></div>
      <BuyButton onBuy={onBuy}>Quero meu Salmos na Ponta do Lápis</BuyButton><div className="secure-note"><LockKeyhole size={13}/>{getCheckoutUrl(product.checkoutUrl)?'Você será direcionado ao checkout':'Prévia da oferta • compra ainda não habilitada'}</div>{product.isDemo&&<small className="demo-note">Preço e composição ilustrativos, sujeitos à confirmação do produtor.</small>}
    </div><div className="offer-visual"><div className="offer-orbit"/><Scene type="writingChild" alt="Criança em 3D escrevendo em seu caderno, com uma ovelhinha ao lado"/><div className="offer-note"><Heart size={21}/><span>Hoje, uma descoberta.<br/><strong>Uma memória para guardar.</strong></span></div><div className="mini-cover">{product.images.cover?<img src={product.images.cover} alt="Capa real do produto" loading="lazy"/>:<><span>APRENDER • CRIAR • CRER</span><Logo className="mini-cover-logo"/><small>Representação ilustrativa</small></>}</div><span className="offer-spark" aria-hidden="true">✧</span></div></div>
    <div className="offer-perks"><span><Download size={16}/>Do digital para sua rotina</span><span><Printer size={16}/>Imprima no seu tempo</span><span><ShieldCheck size={16}/>Confira as condições no checkout</span></div>
  </div></section>;
}
function BookBadge(){return <Sparkles size={13}/>;}
