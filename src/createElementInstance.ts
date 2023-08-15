import { createApp, defineCustomElement, getCurrentInstance, h } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

export const createElementInstance = ({
  component = null,
  props = [],
  sharedStoreInstance = false,
  plugins = [],
  renderOptions = {}
} = {}) => {
  return defineCustomElement({
    props: props,
    setup() {
      const app = createApp();
      // if we do not want a shared store instance, which is the default
      // we create a fresh pinia instance when creating each element
      if (!sharedStoreInstance) {
        const pinia = createPinia();
        app.use(pinia);
        app.use(router);
      }
      // if we do want a shared store instance, it should be included as a plugin
      // additional plugins can be used here as well
      plugins.forEach((plugin) => app.use(plugin));

      const inst = getCurrentInstance();
      if (inst !== null) {
        Object.assign(inst.appContext, app._context);
        Object.assign(inst.provides, app._context.provides);
      }
    },
    render: () => h(component, renderOptions)
  });
};
