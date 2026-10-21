import { useEffect, useRef } from 'react';
import { Heart, X, ArrowRight } from 'lucide-react';

export default function PurchaseDialog({ onClose }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => {closeRef.current = onClose;}, [onClose]);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    function handleKey(event) {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const buttons = [...ref.current.querySelectorAll('button, a[href]')];
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
    document.addEventListener('keydown', handleKey);
    return () => {document.body.style.overflow = oldOverflow;document.removeEventListener('keydown', handleKey);previous?.focus();};
  }, []);
  return <div className="modal-backdrop" onClick={onClose}><section ref={ref} className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description" onClick={e=>e.stopPropagation()}>
    <button className="modal-close" aria-label="Fechar" onClick={onClose}><X/></button><span className="icon-box"><Heart/></span><h2 id="dialog-title">Uma nova descoberta<br/>está chegando.</h2><p id="dialog-description">Esta é uma prévia da página. O checkout ainda não foi habilitado e nenhuma cobrança será realizada.</p><button className="button primary" onClick={onClose}>Continuar conhecendo <ArrowRight size={17}/></button>
  </section></div>;
}
