import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    id: "",
    email: "",
  }),

  actions: {
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response) => {
          // Call was successful, continue.
          return response;
        },
        (error) => {
          switch (error.response.status) {
            case 401: // Not Logged in
            case 419: // Session expired
            case 503: // Down for maintenance
              // Bounce the user to the login screen with a redirect back
              this.resetState();
              window.location.href = "/";
              break;
            case 500:
              alert("Oops, something went wrong!  The team has been notified.");
              break;
            default:
              // Allow individual requests to handle other errors
              return Promise.reject(error);
          }
        }
      );
    },

    async getTokens() {
      await $axios.get("sanctum/csrf-cookie");
    },

    async login(email, password) {
      await $axios.post("/login", {
        email: email,
        password: password,
      });
    },

    async getUser() {
      let res = await $axios.get("api/users");

      this.$state.user = res.data;
      this.$state.id = res.data.id;
      this.$state.email = res.data.email;
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },

    resetState() {
      this.$state.user = "";
      this.$state.id = "";
      this.$state.email = "";
    },

    async logout() {
      await $axios.post("/logout");
      this.resetState();
    },
  },
  persist: true,
});
