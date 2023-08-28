import { createRouter, createWebHistory } from 'vue-router';

const loadComponent = (view: string) => {
  return () => import(`@/views/${view}.vue`);
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: loadComponent('SettingsView'),
      meta: {
        title: 'Home'
      }
    },

    {
      path: '/weather/',
      name: 'weather',
      component: loadComponent('WeatherView'),
      meta: {
        title: 'Weather'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: loadComponent('NotFound')
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | The Weather App`;
  next();
});

export default router;
