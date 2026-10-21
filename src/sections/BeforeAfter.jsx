import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import './BeforeAfter.css';
import ResponsiveImage, { imageSizes } from '../components/ResponsiveImage';

const image = {
  src: '/images/terceira-secao-salmos-antes-depois.png',
  width: 1672,
  height: 941,
  alt: 'Simulação de escrita criada com IA: folhas de caderno com caligrafia irregular em ANTES e cursiva organizada em DEPOIS, com o Salmo 27. À direita, textos sobre praticar a caligrafia com aprendizado, fé e propósito.',
};

function ComparisonLightbox({ onClose }) {
  const dialog = useRef(null);

  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className="before-after-dialog" aria-labelledby="before-after-dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="before-after-dialog-content">
      <div className="before-after-dialog-header">
        <h2 id="before-after-dialog-title">Comparação ilustrativa de escrita</h2>
        <button type="button" onClick={onClose} aria-label="Fechar comparação ampliada"><X size={22}/></button>
      </div>
      <div className="before-after-zoom" role="region" aria-label="Imagem ampliada; role para explorar os detalhes" tabIndex={0}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height}/>
      </div>
      <a className="before-after-original" href={image.src} target="_blank" rel="noopener noreferrer">
        Abrir imagem original <ArrowUpRight size={16} aria-hidden="true"/>
      </a>
    </div>
  </dialog>;
}

export default function BeforeAfter() {
  const [enlarged, setEnlarged] = useState(false);

  return <section id="escrita-com-proposito" className="before-after-section" aria-label="Caligrafia e aprendizado com propósito">
    <figure className="before-after-figure">
      <button type="button" className="before-after-trigger" aria-label="Ampliar comparação ilustrativa de escrita"
        aria-haspopup="dialog" onClick={() => setEnlarged(true)}>
        <ResponsiveImage sizes={imageSizes.comparison} className="before-after-image" src={image.src} alt={image.alt} width={image.width} height={image.height}
          loading="lazy" decoding="async"/>
      </button>
    </figure>
    {enlarged && <ComparisonLightbox onClose={() => setEnlarged(false)}/>}
  </section>;
}
