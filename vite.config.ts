import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue()
    //   {
    //   template: {
    //     compilerOptions: {
    //       isCustomElement: (tag) => tag.includes('weather-widget')
    //     }
    //   }
    // }
  ],
  build: {
    // lib: {
    //   entry: 'src/main.ts',
    //   name: 'weather-widget',
    //   fileName: 'app'
    // },
    // rollupOptions: {
    //   external: ['vue', 'vue-router', 'pinia', 'axios', 'uid', 'vue-draggable-next'],
    //   output: {
    //     globals: {
    //       vue: 'Vue',
    //       'vue-router': 'VueRouter',
    //       pinia: 'Pinia',
    //       axios: 'Axios',
    //       uid: 'Uid',
    //       'vue-draggable-next': 'VueDraggable'
    //     }
    //   }
    // }
  },
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
