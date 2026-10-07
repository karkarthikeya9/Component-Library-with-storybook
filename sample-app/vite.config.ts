import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// A separate Vite app that consumes the library straight from `../src`
// (via the `@lib` alias), so no library build step is required to preview it.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
});
