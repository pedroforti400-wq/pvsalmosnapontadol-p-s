import { useState } from 'react';
import { product } from '../config';

function ProductArtwork({ src }) {
  const [unavailable, setUnavailable] = useState(!src);

  if (unavailable) {
    return <div className="product-artwork-pending" role="status">
      <p>A imagem original do material com os 4 bônus será exibida aqui.</p>
      <span>Aguardando o arquivo original para completar esta apresentação.</span>
    </div>;
  }

  return <figure className="product-artwork">
    <a className="product-artwork-link" href={src} target="_blank" rel="noopener noreferrer"
      aria-label="Ampliar a imagem do produto e dos quatro bônus em uma nova aba">
      <img src={src}
        alt="Salmos na Ponta do Lápis: produto principal, tablet, páginas de atividades e os quatro bônus especiais"
        width="1122" height="1402" fetchPriority="high" decoding="async"
        onError={() => setUnavailable(true)}/>
    </a>
    <figcaption>Toque ou clique na imagem para ver os detalhes em uma nova aba.</figcaption>
  </figure>;
}

export default function ProductPresentation() {
  return <section id="inicio" className="product-presentation" aria-labelledby="presentation-title">
    <div className="presentation-copy">
      <h1 id="presentation-title">
        Mais de <span className="headline-blue">200 atividades bíblicas</span> para desenvolver a caligrafia e <span className="headline-orange">cultivar a fé</span> desde a infância!
      </h1>
      <p className="presentation-subheadline">
        Conheça o <strong>Salmos na Ponta do Lápis</strong>: um material digital para imprimir, que une exercícios de escrita, criatividade e os ensinamentos dos Salmos. E para tornar essa experiência ainda mais completa, você recebe <strong className="bonus-highlight">4 bônus especiais</strong> para enriquecer o aprendizado dos pequenos!
      </p>
    </div>
    <ProductArtwork key={product.images.productWithBonuses} src={product.images.productWithBonuses}/>
  </section>;
}
