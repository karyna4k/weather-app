import { createPinia } from 'pinia';
import { createApp, defineCustomElement, getCurrentInstance, h } from 'vue';

export const createElementInstance = ({
  component = null,
  sharedStoreInstance = false,
  plugins = [],
  externalStyles = [],
} = {}) => defineCustomElement({
  name: 'Weather Widget',
  styles: externalStyles,
  setup() {
    const app = createApp({ render: () => h('div') });

    if (!sharedStoreInstance) {
      const pinia = createPinia();
      app.use(pinia);
    }

    plugins.forEach((plugin) => app.use(plugin));

    const inst = getCurrentInstance();
    if (inst) {
      // eslint-disable-next-line no-underscore-dangle
      Object.assign(inst.appContext, app._context);
      Object.assign(
        (inst as unknown as { provides: Record<symbol, unknown> }).provides,
        // eslint-disable-next-line no-underscore-dangle
        (app._context as { provides: Record<symbol, unknown> }).provides,
      );
    }
  },
  render: () => h(component ?? 'div'),
});
