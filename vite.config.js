import { defineConfig, normalizePath } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, 'static/')),
          dest: ''
        }
      ]
    })
  ],
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
