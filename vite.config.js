import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], test: { include: ['tests/**/*.test.{js,jsx}'], environment: 'jsdom', setupFiles: './tests/setup.js' } });
