import { ArrowRight, Sparkles } from 'lucide-react';
import Art from '../Art';
import { product } from '../config';

export function Logo({ className = '', eager = false }) {
  return <img className={`logo-image ${className}`} src={product.logo.src}
    alt={product.name} width={product.logo.width} height={product.logo.height}
    loading={eager ? 'eager' : 'lazy'} decoding="async"/>;
}
export function Brand() {
  return <a href="#inicio" className="brand" aria-label="Salmos na Ponta do Lápis — início">
    <Logo className="brand-logo" eager/>
  </a>;
}
export function BuyButton({ children = 'Quero plantar essas sementes', className = '', onBuy }) {
  return <button className={`button primary ${className}`} onClick={onBuy}>{children}<ArrowRight size={19}/></button>;
}
export function SectionHeading({ eyebrow, children, description, light = false }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}>
    <span className="eyebrow"><Sparkles size={13}/>{eyebrow}</span>
    <h2>{children}</h2>{description && <p>{description}</p>}
  </div>;
}
export function Scene({ type = 'biblicalScene', className = '', eager = false, alt }) {
  const src = type === 'hero' ? product.images.hero || product.images.biblicalScene : product.images[type];
  return <div className={`scene ${className}`}>
    {src ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={event => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling?.removeAttribute('hidden'); }}/>: null}
    <div hidden={Boolean(src)} className="scene-fallback"><Art/></div>
  </div>;
}
export function CurvedArrow({ className = '' }) {
  return <svg className={`curved-arrow ${className}`} viewBox="0 0 150 100" fill="none" aria-hidden="true"><path d="M10 15C85-5 143 18 106 58 88 78 69 79 54 78m0 0 13-13M54 78l18 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
