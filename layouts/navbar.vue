<template>
  <div>
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          variant="text"
        >
          {{ link.text }}
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="red" prepend-icon="mdi-logout"
          >LOGOUT</v-btn
        >
      </v-container>
    </v-app-bar>

    <slot />
  </div>
</template>

<script setup>
const links = [
  { text: "Task", route: "/home" },
  { text: "Tags", route: "/tags" },
];
</script>
