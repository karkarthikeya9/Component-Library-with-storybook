import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Library build configuration.
//
// Two entries are emitted:
//  - `index`   -> dist/index.js  (component bundle)
//  - `styles`  -> dist/styles.js (empty) + dist/styles.css (compiled tokens/utilities)
//
// Keeping styles as a separate entry keeps the JS bundle free of CSS imports
// and produces clean `.d.ts` output without a stray CSS import.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        styles: 'src/styles.ts',
      },
      formats: ['es'],
      fileName: (_format, entryName) => (entryName === 'styles' ? 'styles.js' : 'index.js'),
      cssFileName: 'styles',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
  },
});
