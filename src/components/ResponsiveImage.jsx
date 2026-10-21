import { useEffect, useRef, useState } from 'react';
import optimizedImages from '../optimized-images.json';

export const imageSizes = {
  hero: '(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1185px) calc(100vw - 64px), 1122px',
  logo: '(max-width: 600px) 184px, 208px',
  activity: '(max-width: 423px) calc(100vw - 88px), (max-width: 639px) 336px, (max-width: 900px) calc(33.333vw - 40px), (max-width: 1639px) calc(25vw - 36px), 374px',
  comment: '(max-width: 443px) calc(100vw - 24px), 420px',
  comparison: '(max-width: 1672px) 100vw, 1672px',
  audience: '(max-width: 639px) calc(100vw - 34px), (max-width: 899px) 558px, (max-width: 1319px) calc(33.333vw - 40px), 400px',
  bonus: '220px',
  offerMain: '(max-width: 453px) calc(95vw - 61px), (max-width: 639px) 370px, 500px',
  offerBonus: '(max-width: 455px) calc(50vw - 48px), (max-width: 639px) 180px, 200px',
  guarantee: '(max-width: 479px) calc(100vw - 90px), (max-width: 799px) 320px, (max-width: 999px) calc(41vw - 74px), (max-width: 1264px) calc(44vw - 116px), 440px',
};

// The original remains the fallback; links and enlargement dialogs keep its full resolution.
// Direct img elements preserve the approved layout and painting in transformed loops.
export default function ResponsiveImage({ src, sizes, ...props }) {
  const image = optimizedImages[src];
  const [format, setFormat] = useState(() => image?.avifVariants ? 'avif' : image ? 'webp' : 'original');
  const node = useRef(null);
  const [requested, setRequested] = useState(() => props.loading === 'eager' || (typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'));
  useEffect(() => {
    const img = node.current;
    if (!img || requested) return;
    const critical = document.querySelector('img[fetchpriority="high"]');
    const enable = () => setRequested(true);
    // Do not let speculative below-fold downloads compete with the LCP resource.
    const request = () => {
      if (critical && critical !== img && (!critical.complete || !critical.currentSrc || !critical.naturalWidth)) {
        critical.addEventListener('load', enable, { once: true });
        critical.addEventListener('image:unavailable', enable, { once: true });
      } else enable();
    };
    img.addEventListener('image:preload', request);
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) request();
    }, { rootMargin: '600px 0px' });
    observer.observe(img);
    return () => {
      observer.disconnect(); img.removeEventListener('image:preload', request);
      critical?.removeEventListener('load', enable); critical?.removeEventListener('image:unavailable', enable);
    };
  }, [requested, src]);
  const variants = format === 'avif' ? image?.avifVariants : format === 'webp' ? image?.variants : undefined;
  const candidate = variants?.[0]?.src || src;
  const attributes = {
    ref: node, src: requested ? candidate : undefined, 'data-original-src': src, decoding: 'async', ...props,
    loading: requested && typeof IntersectionObserver !== 'undefined' ? 'eager' : (props.loading || 'lazy'),
    style: image ? { aspectRatio: `${image.width} / ${image.height}`, ...props.style } : props.style,
  };
  const srcSet = requested && variants ? variants.map(({ src, width }) => `${src} ${width}w`).join(', ') : undefined;
  return <img {...attributes} srcSet={srcSet} sizes={variants ? sizes : undefined} onError={event => {
    const img = event.currentTarget;
    // An empty deferred img can queue an error before its source is enabled.
    // Ignore that stale event while a valid candidate is pending or already decoded.
    if (!requested || !img.getAttribute('src') || !img.complete || img.naturalWidth > 0) return;
    // Unsupported codecs or a failed derivative fall back without losing the artwork.
    if (image && format === 'avif') setFormat('webp');
    else if (image && format === 'webp') setFormat('original');
    else {
      event.currentTarget.dispatchEvent(new Event('image:unavailable'));
      props.onError?.(event);
    }
  }}/>;
}
