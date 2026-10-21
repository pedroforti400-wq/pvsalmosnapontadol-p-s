import { useState } from 'react';
import ResponsiveImage, { imageSizes } from '../components/ResponsiveImage';
import { product } from '../config';

function ProductArtwork({ src }) {
  const [unavailable, setUnavailable] = useState(!src);

  if (unavailable) return null;

  return <figure className="product-artwork">
    <a className="product-artwork-link" href={src} target="_blank" rel="noopener noreferrer"
      aria-label="Ampliar a imagem do produto e dos quatro bônus em uma nova aba">
      <ResponsiveImage src={src} sizes={imageSizes.hero} loading="eager"
        alt="Salmos na Ponta do Lápis: produto principal, tablet, páginas de atividades e os quatro bônus especiais"
        width="1199" height="1244" fetchPriority="high" decoding="async"
        onError={() => setUnavailable(true)}/>
    </a>
  </figure>;
}

export default function ProductPresentation() {
  return <section id="inicio" className="product-presentation" aria-labelledby="presentation-title">
    <div className="presentation-copy">
      <h1 id="presentation-title">
        Mais de <span className="headline-blue">200 atividades bíblicas</span> para desenvolver a caligrafia e <span className="headline-orange">cultivar a fé</span> desde a infância!
      </h1>
      <p className="presentation-subheadline">
        Conheça o <strong>Salmos na Ponta do Lápis</strong>: um material digital para imprimir, que une exercícios de escrita, criatividade e os ensinamentos dos Salmos.
      </p>
    </div>
    <ProductArtwork key={product.images.productWithBonuses} src={product.images.productWithBonuses}/>
  </section>;
}
