import { BookOpen, Heart, Sprout } from 'lucide-react';
import { audiences } from '../audiences';
import ResponsiveImage, { imageSizes } from '../components/ResponsiveImage';
import './Audiences.css';

const decorations = { families: Heart, educators: Sprout, ministries: BookOpen };

export default function Audiences() {
  return <section id="para-quem" className="audiences-section" aria-labelledby="audiences-title">
    <div className="audiences-container">
      <div className="audiences-heading">
        <p className="audiences-eyebrow">FEITO COM AMOR E PROPÓSITO</p>
        <h2 id="audiences-title">Para quem é o<br/>{' '}
          <span className="audiences-name-green">Salmos</span>{' '}
          <span className="audiences-name-blue">na Ponta do Lápis?</span>
        </h2>
        <p className="audiences-subheadline">Um material especial para quem acredita que aprender a escrever também pode ser uma oportunidade de crescer na fé.</p>
        <div className="audiences-flourish" aria-hidden="true"><span/><Heart size={17}/><span/></div>
      </div>
      <div className="audiences-grid">
        {audiences.map(audience => {
          const Decoration = decorations[audience.id];
          return <article key={audience.id} className={`audiences-card audiences-card--${audience.id}`} aria-labelledby={`audience-${audience.id}`}>
            <div className="audiences-image">
              <ResponsiveImage sizes={imageSizes.audience} src={audience.image} width="1536" height="1024" alt={audience.alt} loading="lazy" decoding="async"/>
              <span className="audiences-emblem" aria-hidden="true"><Decoration size={24} strokeWidth={1.7}/></span>
            </div>
            <div className="audiences-copy">
              <h3 id={`audience-${audience.id}`}>{audience.title}</h3>
              <p>{audience.description}</p>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
