import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/styles"],
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
  ],
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  vite: { ssr: { noExternal: ["vuetify"] } },
});
