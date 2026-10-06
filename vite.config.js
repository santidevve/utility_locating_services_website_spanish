import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  publicDir: 'public',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        areas: resolve(__dirname, 'areas-de-servicio.html'),
        faq: resolve(__dirname, 'faq.html'),
        presupuesto: resolve(__dirname, 'solicitar-presupuesto.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-static-assets',
      closeBundle() {
        if (fs.existsSync('static')) {
          fs.cpSync('static', 'dist/static', { recursive: true });
        }
      },
    },
  ],
});



