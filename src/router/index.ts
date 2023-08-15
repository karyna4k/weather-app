import { createRouter, createWebHistory } from 'vue-router';
import SettingsView from '../views/SettingsView.vue';
import WeatherView from '../views/WeatherView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:',
      name: 'WeatherView',
      component: WeatherView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/settings/',
      name: 'settings',
      component: SettingsView,
      meta: {
        title: 'Settings'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | The Weather`;
  next();
});

export default router;
