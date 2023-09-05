import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    cssCodeSplit: false,
    target: 'esnext',
    lib: {
      entry: '/src/main.ts',
      name: 'WeatherWidget',
      fileName: (format) => `weather-widget.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  // define: {
  //   'process.env.NODE_ENV': 'production'
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
