import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  experimental: {
    payloadExtraction: false,
  },
  css: ["vuetify/styles"],
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vee-validate/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
  ],
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  vite: { ssr: { noExternal: ["vuetify"] } },
  app: {
    head: {
      title: "Appetiser Todo",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  },
});
