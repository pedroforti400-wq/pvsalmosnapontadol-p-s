// Build-time HTML only: Netlify still serves static dist/ and needs no Node server.
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile } from 'node:fs/promises';
// Supply an unbound host so Vite's internal hot channel opens no listening port.
const unboundHost = createHttpServer();
const vite = await createServer({ server: { middlewareMode: true, hmr: { server: unboundHost } }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
try {
  const { default: App } = await vite.ssrLoadModule('/src/main.jsx');
  // The head already has the one responsive LCP hint. Avoid duplicate auto hints.
  const markup = renderToString(createElement(App)).replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*\/>/g, '');
  const file = 'dist/index.html';
  const html = await readFile(file, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error('Expected an empty Vite root.');
  await writeFile(file, html.replace('<div id="root"></div>', `<div id="root" data-prerendered>${markup}</div>`));
  console.log('Pre-rendered the ten approved sections; React hydrates the same components.');
} finally { await vite.close(); }
