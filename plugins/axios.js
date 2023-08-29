import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  axios.defaults.withCredentials = true;

  return {
    provide: {
      axios: axios,
    },
  };
});
