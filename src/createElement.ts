import { createPinia } from 'pinia';
import { createApp, defineCustomElement, getCurrentInstance, h } from 'vue';

export const createElementInstance = ({
  component = null,
  props = [],
  sharedStoreInstance = false,
  plugins = [],
  externalStyles = []
} = {}) => {
  return defineCustomElement({
    name: 'Weather Widget',
    styles: externalStyles,
    props: props,
    setup() {
      const app = createApp();

      if (!sharedStoreInstance) {
        const pinia = createPinia();
        app.use(pinia);
      }

      plugins.forEach((plugin) => app.use(plugin));

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);
    },
    render: () => h(component)
  });
};
