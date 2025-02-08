import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import '@/assets/css/main.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

// import { createElementInstance } from './createElement';
// const config = {
//   component: App,
//   sharedStoreInstance: true,
//   plugins: [pinia, router],
//   externalStyles: [tailwind]
// };

// customElements.define('weather-widget', createElementInstance(config));
