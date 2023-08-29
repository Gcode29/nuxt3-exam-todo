import { useUserStore } from "~~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (to.fullPath === "/" && userStore.id) {
    return navigateTo("/home");
  }

  if (to.fullPath === "/register" && userStore.id) {
    return navigateTo("/home");
  }
});
