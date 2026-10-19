import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Heart, Pause, Play, X } from 'lucide-react';
import { activities } from '../activities';
import './MaterialCarousel.css';

export const AUTOPLAY_DELAY = 4500;

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function Rays({ className = '' }) {
  return <svg className={`activity-rays ${className}`} viewBox="0 0 52 66" fill="none" aria-hidden="true">
    <path d="M30 8l12 14M8 30l18 6M18 58l16-11" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
  </svg>;
}

function ActivityLightbox({ index, onClose }) {
  const dialog = useRef(null);
  const activity = activities[index];
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

  return <dialog ref={dialog} className="activity-lightbox" aria-labelledby="activity-lightbox-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="activity-lightbox-content">
      <div className="activity-lightbox-heading">
        <h3 id="activity-lightbox-title">{activity.title}</h3>
        <button type="button" onClick={onClose} aria-label="Fechar atividade ampliada"><X size={22}/></button>
      </div>
      <img src={activity.src} alt={activity.alt} width="1055" height="1491"/>
      <a href={activity.src} target="_blank" rel="noopener noreferrer">Ver em tamanho original <ArrowRight size={15}/></a>
    </div>
  </dialog>;
}

export default function MaterialCarousel() {
  const reduced = useReducedMotion();
  const [viewport, api] = useEmblaCarousel({ loop: true, align: 'start', duration: 35 });
  const section = useRef(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [enlarged, setEnlarged] = useState(null);
  const [interaction, setInteraction] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    update();
    api.on('select', update).on('reInit', update).on('pointerDown', startDrag).on('pointerUp', endDrag);
    return () => { api.off('select', update).off('reInit', update).off('pointerDown', startDrag).off('pointerUp', endDrag); };
  }, [api]);

  useEffect(() => {
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const autoplay = !reduced && !paused && !hovered && !focused && !dragging && !hidden && visible && enlarged === null;
  useEffect(() => {
    if (!api || !autoplay) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [api, autoplay, interaction]);

  const navigate = useCallback((direction, index) => {
    if (!api) return;
    if (direction === 'next') api.scrollNext(reduced);
    else if (direction === 'previous') api.scrollPrev(reduced);
    else api.scrollTo(index, reduced);
    setInteraction(value => value + 1);
  }, [api, reduced]);

  function scrollToCheckout(event) {
    const target = document.getElementById('checkout-final');
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, '', '#checkout-final');
    target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' });
    target.focus({ preventScroll: true });
  }

  return <section ref={section} id="atividades" className="activity-section" aria-labelledby="activities-title">
    <div className="activity-section-heading">
      <Heart className="activity-doodle activity-doodle-heart" aria-hidden="true"/>
      <Crown className="activity-doodle activity-doodle-crown" aria-hidden="true"/>
      <p className="activity-eyebrow">POR DENTRO DO MATERIAL</p>
      <div className="activity-title-row"><Rays/><h2 id="activities-title">Veja como as atividades são por dentro</h2><Rays className="activity-rays-right"/></div>
      <p className="activity-subheadline">Páginas pensadas para unir caligrafia, criatividade e a Palavra de Deus de forma leve e encantadora.</p>
    </div>

    <div className="activity-carousel" role="region" aria-roledescription="carrossel" aria-label="Prévias das seis atividades"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault(); navigate(event.key === 'ArrowRight' ? 'next' : 'previous');
        }
      }}>
      <div className="activity-carousel-stage">
        <div ref={viewport} className="activity-viewport" id="activity-viewport">
          <div className="activity-track">
            {activities.map((activity, index) => <div key={activity.src} className="activity-slide"
              role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${activities.length}`}>
              <button type="button" className="activity-card" onClick={() => setEnlarged(index)}
                aria-label={`Ampliar atividade ${index + 1}: ${activity.title}`}>
                <img src={activity.src} alt={activity.alt} width="1055" height="1491" loading="eager" decoding="async" draggable="false"/>
              </button>
            </div>)}
          </div>
        </div>
        <button type="button" className="activity-arrow activity-arrow-prev" aria-label="Atividade anterior" aria-controls="activity-viewport" onClick={() => navigate('previous')}><ChevronLeft/></button>
        <button type="button" className="activity-arrow activity-arrow-next" aria-label="Próxima atividade" aria-controls="activity-viewport" onClick={() => navigate('next')}><ChevronRight/></button>
      </div>
      <div className="activity-carousel-controls">
        <div className="activity-dots" aria-label="Escolher atividade">
          {activities.map((activity, index) => <button type="button" key={activity.src}
            className={`activity-dot ${selected === index ? 'is-selected' : ''}`}
            aria-label={`Ir para atividade ${index + 1}`} aria-current={selected === index ? 'true' : undefined}
            onClick={() => navigate('index', index)}><span/></button>)}
        </div>
        <button type="button" className="activity-autoplay" disabled={reduced} aria-pressed={paused || reduced}
          aria-label={reduced ? 'Movimento automático desativado pela sua preferência' : paused ? 'Retomar movimento automático' : 'Pausar movimento automático'}
          onClick={() => setPaused(value => !value)}>{paused || reduced ? <Play size={14}/> : <Pause size={14}/>}</button>
      </div>
      <span className="activity-sr-only" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">Atividade {selected + 1} de {activities.length}</span>
    </div>

    <div className="activity-cta-row"><Rays/>
      <a href="#checkout-final" className="activity-cta" onClick={scrollToCheckout}>Quero garantir agora <ArrowRight aria-hidden="true" size={24}/></a>
      <Rays className="activity-rays-right"/>
    </div>
    {enlarged !== null && <ActivityLightbox index={enlarged} onClose={() => setEnlarged(null)}/>}
  </section>;
}
