import { createPinia } from 'pinia';
import App from './App.ce.vue';
import router from './router';

console.log(App.style);

import './assets/css/main.css';
import './assets/scss/main.scss';
import tailwind from './assets/css/tailwind.css?inline';

import { createElementInstance } from './createElement';

const pinia = createPinia();

const config = {
  component: App,
  sharedStoreInstance: true,
  plugins: [pinia, router],
  externalStyles: [tailwind]
};

customElements.define('weather-widget', createElementInstance(config));
