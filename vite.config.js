import { defineConfig } from 'vite';
import { resolve } from 'path';

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
});



