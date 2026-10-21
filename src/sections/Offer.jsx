import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { bonuses } from '../bonuses';
import { product, formatPrice, getCheckoutUrl } from '../config';
import './Offer.css';
import ResponsiveImage, { imageSizes } from '../components/ResponsiveImage';

export default function Offer() {
  const [search, setSearch] = useState('');
  useEffect(() => { setSearch(window.location.search); }, []);
  const checkout = getCheckoutUrl(product.checkoutUrl, search);
  const price = formatPrice(product.price);
  const showReference = product.referencePriceConfirmed && Number.isFinite(product.referencePrice) && product.referencePrice > product.price;
  const buttonContent = <><ShoppingCart size={25} aria-hidden="true"/><span>QUERO GARANTIR MEU KIT POR {price}!</span></>;

  return <section id="checkout-final" className="final-offer" aria-labelledby="final-offer-title" tabIndex={-1}>
    <svg className="final-offer-wave" viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v10C1100 65 860 8 600 28S230 55 0 13Z" fill="#FAF7EF"/></svg>
    <Star className="final-offer-star final-offer-star--one" size={40} aria-hidden="true"/>
    <Star className="final-offer-star final-offer-star--two" size={26} aria-hidden="true"/>
    <Heart className="final-offer-heart" size={30} aria-hidden="true"/>

    <div className="final-offer-container">
      <div className="final-offer-heading">
        <p className="final-offer-eyebrow"><Sparkles size={16} aria-hidden="true"/>OFERTA ESPECIAL PARA VOCÊ!</p>
        <h2 id="final-offer-title">Leve o <span className="final-offer-name">Salmos na Ponta do Lápis</span> + <span className="final-offer-bonuses">4 bônus especiais!</span></h2>
        <p className="final-offer-subheadline">Mais de 200 atividades bíblicas para imprimir, acompanhadas de quatro materiais extras para enriquecer o aprendizado, a criatividade e a fé das crianças!</p>
      </div>

      <div className="final-offer-kit" role="group" aria-label="Kit completo: material principal e quatro bônus digitais">
        {product.images.productWithBonuses && <figure className="final-kit-main">
          <a className="final-kit-main-cover" href={product.images.productWithBonuses} target="_blank" rel="noopener noreferrer" aria-label="Ampliar apresentação do material principal em uma nova aba">
            <ResponsiveImage sizes={imageSizes.offerMain} src={product.images.productWithBonuses} alt="Salmos na Ponta do Lápis: apresentação original do material principal, tablet e páginas de atividades" width="1199" height="1244" loading="lazy" decoding="async"/>
          </a>
          <figcaption>MATERIAL PRINCIPAL</figcaption>
        </figure>}
        {bonuses.map((bonus, index) => <figure key={bonus.id} className={`final-kit-bonus final-kit-bonus--${index + 1}`}>
          <a className="final-kit-cover" href={bonus.image} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar capa de ${bonus.title} na oferta em uma nova aba`}>
            <ResponsiveImage sizes={imageSizes.offerBonus} src={bonus.image} alt={bonus.alt} width="1024" height="1536" loading="lazy" decoding="async"/>
          </a>
          <figcaption><span>BÔNUS {index + 1}</span><strong>{bonus.title}</strong></figcaption>
        </figure>)}
      </div>

      <div className="final-offer-price-card">
        {showReference && <p className="final-offer-reference">De <del>{formatPrice(product.referencePrice)}</del></p>}
        <p className="final-offer-only">Por apenas</p>
        <p className="final-offer-price"><strong>{price}</strong></p>
        {checkout
          ? <a className="final-offer-buy" href={checkout}>{buttonContent}</a>
          : <button className="final-offer-buy" type="button" disabled aria-describedby="final-checkout-note">{buttonContent}</button>}
        {!checkout && <p className="final-offer-checkout-note" id="final-checkout-note">Compra ainda não habilitada.</p>}
        <p className="final-offer-digital">Produto 100% digital <span aria-hidden="true">•</span> Recebimento por e-mail após confirmação do pagamento</p>
        <p className="final-offer-included">Mais de 200 atividades bíblicas + 4 bônus digitais inclusos</p>
      </div>
    </div>
  </section>;
}
