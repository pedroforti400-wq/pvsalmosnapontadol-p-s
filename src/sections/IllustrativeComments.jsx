import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Heart, X } from 'lucide-react';
import { comments } from '../comments';
import useContinuousComments from '../hooks/useContinuousComments';
import './IllustrativeComments.css';

function CommentLightbox({ comment, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; node.showModal();
    return () => {
      node.close(); document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className="comment-dialog" aria-labelledby="comment-dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="comment-dialog-content">
      <div className="comment-dialog-header">
        <h3 id="comment-dialog-title">Comentário ilustrativo · {comment.name}</h3>
        <button type="button" aria-label="Fechar comentário ampliado" onClick={onClose}><X size={22}/></button>
      </div>
      <div className="comment-enlargement" role="region" aria-label="Cartão ampliado; role para explorar os detalhes" tabIndex={0}>
        <img src={comment.src} width={comment.width} height={comment.height}
          style={{ width: comment.width }} alt={`Comentário ilustrativo de ${comment.name}, ${comment.network}: ${comment.quote}`}/>
      </div>
      <a className="comment-original" href={comment.src} target="_blank" rel="noopener noreferrer">Abrir cartão original <ArrowUpRight size={15} aria-hidden="true"/></a>
    </div>
  </dialog>;
}

export default function IllustrativeComments() {
  const [enlarged, setEnlarged] = useState(null);
  const { viewport, container, interactionProps } = useContinuousComments(enlarged !== null);
  // Segunda passagem dos mesmos quatro cartões dá espaço ao loop sem criar novos comentários.
  const slides = [...comments, ...comments];

  return <section id="comentarios-ilustrativos" className="comments-section" aria-labelledby="comments-title">
    <div className="comments-heading">
      <div className="comments-heading-copy">
        <h2 id="comments-title"><span>Quem vê, se encanta.</span>{' '}<span>Quem usa, recomenda.</span></h2>
        <div className="comments-heart-divider" aria-hidden="true"><span/><Heart size={18}/><span/></div>
        <p className="comments-subheadline">Conheça o estilo dos comentários e experiências que inspiraram nossa apresentação do Salmos na Ponta do Lápis.</p>
      </div>
    </div>

    <div ref={container} className="comments-carousel" role="region" aria-roledescription="carrossel"
      aria-label="Quatro comentários ilustrativos" tabIndex={0} {...interactionProps}>
      <div ref={viewport} className="comments-viewport">
        <div className="comments-track">
          {slides.map((comment, index) => {
            const duplicate = index >= comments.length;
            const image = <img className="comment-card-image" src={comment.src} width={comment.width} height={comment.height}
              alt={duplicate ? '' : `Comentário ilustrativo de ${comment.name}, ${comment.network}: ${comment.quote}`}
              decoding="async" loading="eager" draggable="false"/>;
            return <div key={`${comment.name}-${index}`} className="comment-slide"
              role={duplicate ? undefined : 'group'} aria-roledescription={duplicate ? undefined : 'slide'}
              aria-label={duplicate ? undefined : `${index + 1} de ${comments.length}`} aria-hidden={duplicate ? 'true' : undefined}>
              {duplicate
                ? <div className="comment-card" onClick={() => setEnlarged(index % comments.length)}>{image}</div>
                : <button type="button" className="comment-card" aria-haspopup="dialog"
                    aria-label={`Ampliar comentário ilustrativo de ${comment.name}`} onClick={() => setEnlarged(index)}>{image}</button>}
            </div>;
          })}
        </div>
      </div>
    </div>

    <svg className="comments-meadow" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 35C230-35 280 80 530 47s280-49 470-4 250-34 440-8v35H0Z" fill="#e7ebd6"/></svg>
    <Heart className="comments-bottom-heart" size={18} aria-hidden="true"/>
    {enlarged !== null && <CommentLightbox comment={comments[enlarged]} onClose={() => setEnlarged(null)}/>}
  </section>;
}
