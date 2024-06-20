import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from 'vuetify/lib/util/colors'

export default defineNuxtPlugin(nuxtApp => {

  try {
    const vuetify = createVuetify({
      ssr: true,
      components,
      directives,
      theme: {
        dark: false,
        themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
          }
        },
      },
      defaultAssets: {
        font: false,
        icons: 'mdiSvg'
      },
      treeShake: true
    });

    nuxtApp.vueApp.use(vuetify);
  } catch (e) {
    // nuxtApp.$rollbar.error(e)
    console.error(e)
  }
});
