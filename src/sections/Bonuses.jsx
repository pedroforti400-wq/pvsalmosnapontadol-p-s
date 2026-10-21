import { ArrowRight, ArrowUpRight, Check, Gift } from 'lucide-react';
import { bonuses, bonusTotalCents, formatBonusPrice } from '../bonuses';
import './Bonuses.css';
import ResponsiveImage, { imageSizes } from '../components/ResponsiveImage';

export default function Bonuses() {
  function scrollToOffer(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById('checkout-final');
    if (!target) return;
    event.preventDefault();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    window.history.replaceState(null, '', '#checkout-final');
    // Alinha o fim da oferta para deixar o preço e o botão de compra visíveis.
    target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'end' });
    target.focus({ preventScroll: true });
  }

  return <section id="bonus" className="bonuses-section" aria-labelledby="bonuses-title">
    <div className="bonuses-container">
      <div className="bonuses-heading">
        <h2 id="bonuses-title">E ainda tem mais: <span>4 bônus especiais</span> para enriquecer a experiência das crianças!</h2>
        <p>Além do material principal, você também recebe quatro bônus exclusivos para fortalecer a criatividade, o aprendizado e os valores cristãos — sem pagar nada a mais por isso.</p>
      </div>

      <div className="bonuses-grid">
        {bonuses.map((bonus, index) => <article key={bonus.id} className={`bonuses-card bonuses-card--${bonus.id}`} aria-labelledby={`bonus-${bonus.id}`}>
          <div className="bonuses-cover-stage">
            <span className="bonuses-number">BÔNUS {String(index + 1).padStart(2, '0')}</span>
            <a className="bonuses-cover-link" href={bonus.image} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar capa de ${bonus.title} em uma nova aba`}>
              <ResponsiveImage sizes={imageSizes.bonus} src={bonus.image} alt={bonus.alt} width="1024" height="1536" loading="lazy" decoding="async"/>
              <ArrowUpRight className="bonuses-expand" size={16} aria-hidden="true"/>
            </a>
          </div>
          <div className="bonuses-copy">
            <h3 id={`bonus-${bonus.id}`}>{bonus.title}</h3>
            <p className="bonuses-description">{bonus.description}</p>
            <div className="bonuses-price">
              <p className="bonuses-original-price">De: <del>{formatBonusPrice(bonus.priceCents)}</del></p>
              <p className="bonuses-free">Por: <strong>GRÁTIS</strong></p>
              <p className="bonuses-included"><Check size={15} aria-hidden="true"/>Incluso na sua compra</p>
            </div>
          </div>
        </article>)}
      </div>

      <div className="bonuses-summary">
        <span className="bonuses-summary-gift" aria-hidden="true"><Gift size={31} strokeWidth={1.6}/></span>
        <div>
          <p className="bonuses-summary-value">Você recebe <strong>{formatBonusPrice(bonusTotalCents)}</strong> em bônus inclusos sem custo adicional.</p>
          <p className="bonuses-summary-support">Tudo isso já incluso na sua compra, para tornar o aprendizado ainda mais rico e completo.</p>
        </div>
      </div>

      <div className="bonuses-cta">
        <p>Gostou dos presentes? Então aproveite essa oportunidade!</p>
        <a className="bonuses-cta-link" href="#checkout-final" onClick={scrollToOffer}>
          <Gift className="bonuses-cta-gift" size={29} aria-hidden="true"/>
          <strong>QUERO MEU KIT COMPLETO + 4 BÔNUS!</strong>
          <ArrowRight className="bonuses-cta-arrow" size={25} aria-hidden="true"/>
        </a>
      </div>
    </div>
  </section>;
}
