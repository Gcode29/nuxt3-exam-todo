import { useUserStore } from "~~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.id) {
    return navigateTo("/");
  }
});
