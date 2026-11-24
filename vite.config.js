import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Многостраничный сайт: каждая HTML-страница — отдельная точка входа.
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        alexoil: resolve(import.meta.dirname, 'alexoil.html'),
        kidsup: resolve(import.meta.dirname, 'kidsup.html'),
        uscode: resolve(import.meta.dirname, 'uscode.html'),
      },
    },
  },
});
