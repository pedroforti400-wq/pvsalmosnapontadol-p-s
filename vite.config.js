import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inlineSmallStylesheet from './scripts/inline-styles.mjs';

// O endereço é fornecido pelo próprio Codespaces; não libera hosts arbitrários.
const codespacesHost = process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
  ? `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
  : null;

export default defineConfig({
  plugins: [react(), inlineSmallStylesheet()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    ...(codespacesHost ? {
      allowedHosts: [codespacesHost],
      hmr: { host: codespacesHost, protocol: 'wss', clientPort: 443 },
    } : {}),
  },
  test: {
    include: ['tests/**/*.test.{js,jsx}'],
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
