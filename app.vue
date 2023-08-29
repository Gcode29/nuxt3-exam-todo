<template>
  <v-app id="inspire">
    <NuxtPage />
  </v-app>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
import { storeToRefs } from "pinia";
const userStore = useUserStore();

const { id } = storeToRefs(userStore);

onMounted(async () => {
  try {
    if (userStore.id) {
      await userStore.hasSessionExpired();
      await userStore.getUser();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
