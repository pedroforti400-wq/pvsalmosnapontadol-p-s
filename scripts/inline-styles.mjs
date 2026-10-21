// This single-page build has < 10 KiB of compressed CSS. Inline the unchanged
// generated stylesheet to remove its blocking request without duplicating rules.
export default function inlineSmallStylesheet() {
  return {
    name: 'inline-small-stylesheet',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      html.source = String(html.source).replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, tag => {
        const href = tag.match(/href="([^"]+)"/)?.[1];
        const css = href && bundle[href.replace(/^\//, '')];
        if (!css || css.type !== 'asset' || Buffer.byteLength(css.source) > 65536) return tag;
        return `<style data-site-styles>${String(css.source)}</style>`;
      });
    },
  };
}
