// import { createApp, defineCustomElement } from 'vue';
// import { createPinia } from 'pinia';
import { createPinia } from 'pinia';
import App from './App.vue';
// import router from './router';

// import { defineCustomElement } from "vue";
import { createElementInstance } from './createElementInstance';

// import './assets/tailwind.css';
// import { createElementInstance } from './createElementInstance';

// const pinia = createPinia();
// const app = createApp(App);

// app.use(pinia);
// app.use(router);

// app.mount('#app');

// const WeatherWidget = defineCustomElement(App);
// customElements.define('weather-widget', WeatherWidget);

const pinia = createPinia();

const config = {
  component: App,
  props: { title: String },
  sharedStoreInstance: true,
  plugins: [pinia],
  renderOptions: { ref: 'component' }
};

customElements.define('weather-widget', createElementInstance(config));
