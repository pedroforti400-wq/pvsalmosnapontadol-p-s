import { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { CONTINUOUS_SPEED, RESUME_DELAY } from '../sections/MaterialCarousel';

// Mesma política de movimento das atividades, sem alterar o componente aprovado.
export default function useContinuousComments(paused) {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const [motion] = useState(() => AutoScroll({
    speed: CONTINUOUS_SPEED, startDelay: 0, playOnInit: false,
    stopOnInteraction: true, stopOnFocusIn: false,
  }));
  const [viewport, api] = useEmblaCarousel({ loop: true, dragFree: true, align: 'start', duration: 35 }, [motion]);
  const container = useRef(null);
  const pointerFocus = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [interaction, setInteraction] = useState(0);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const restart = () => setInteraction(value => value + 1);
    const start = () => setDragging(true);
    const end = () => { setDragging(false); restart(); };
    api.on('reInit', restart).on('pointerDown', start).on('pointerUp', end);
    return () => { api.off('reInit', restart).off('pointerDown', start).off('pointerUp', end); };
  }, [api]);

  useEffect(() => {
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const moving = !reduced && !paused && !hovered && !focused && !dragging && visible && !hidden;
  useEffect(() => {
    const scroll = api?.plugins().autoScroll;
    if (!scroll) return;
    scroll.stop();
    if (moving) scroll.play(interaction ? RESUME_DELAY : 0);
    return () => scroll.stop();
  }, [api, moving, interaction]);

  return {
    viewport, container,
    interactionProps: {
      onPointerEnter(event) { if (event.pointerType !== 'touch' && event.pointerType !== 'pen') setHovered(true); },
      onPointerLeave(event) {
        if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
          setHovered(false); setInteraction(value => value + 1);
        }
      },
      onPointerDownCapture() { pointerFocus.current = true; setFocused(false); },
      onFocusCapture() { if (!pointerFocus.current) setFocused(true); },
      onBlurCapture(event) { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); },
      onKeyDownCapture() { pointerFocus.current = false; setFocused(true); },
      onKeyDown(event) {
        if (!api || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault(); api.plugins().autoScroll?.stop();
        if (event.key === 'ArrowRight') api.scrollNext(reduced); else api.scrollPrev(reduced);
        setInteraction(value => value + 1);
      },
    },
  };
}
