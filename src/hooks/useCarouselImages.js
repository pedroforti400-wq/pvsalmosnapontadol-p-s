import { useEffect, useState } from 'react';

// Warm the entire loop together before it enters the viewport, including wrapped slides.
// Motion waits for decoding so lazy loading cannot advance into an unready image.
export default function useCarouselImages(root) {
  const [ready, setReady] = useState(() => typeof HTMLImageElement === 'undefined' || typeof HTMLImageElement.prototype.decode !== 'function');
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let active = true;
    let observer;
    function warm() {
      observer?.disconnect();
      const images = Array.from(node.querySelectorAll('img'));
      const decoded = images.map(image => {
        const loaded = !image.decode || (image.complete && image.currentSrc && image.naturalWidth > 0) ? Promise.resolve() : new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('image:unavailable', resolve, { once: true });
        });
        image.loading = 'eager';
        image.dispatchEvent(new Event('image:preload'));
        return loaded.then(() => image.decode?.().catch(() => {}));
      });
      Promise.all(decoded).then(() => {
        if (active) setReady(true);
      });
    }
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) warm();
      }, { rootMargin: '1000px 0px' });
      observer.observe(node);
    } else warm();
    return () => { active = false; observer?.disconnect(); };
  }, [root]);
  return ready;
}
