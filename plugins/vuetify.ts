import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import { VDataTable } from "vuetify/labs/VDataTable";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDataTable,
    },
    ssr: true,
    icons: {
      defaultSet: "mdi", // This is already the default value - only for display purposes
    },
  });

  app.vueApp.use(vuetify);
});
