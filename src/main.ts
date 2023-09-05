import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// import { defineCustomElementWrapped } from './defineCustomElementWrapper';
// import App from './App.ce.vue';

import './assets/css/main.css';
import './assets/scss/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

// customElements.define(
//   'app-root',
//   defineCustomElementWrapped(App, {
//     plugins: [pinia, router],
//     styles: App.styles.map((style) => {
//       return style
//         .replace(':root', ':host') // <- rename :root values to :host
//         .replace('body {', '#my-app {'); // <- in case of frameworks like bootstrap that styles directly body
//     })
//   })
// );
