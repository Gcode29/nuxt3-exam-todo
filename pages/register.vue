<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 mt-5"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <h2 class="text-center">REGISTER</h2>

      <form @submit.prevent="register()">
        <div class="mb-5">
          <span class="text-red mb-3 font-semibold" v-if="errors">
            {{ errors && errors.name ? errors.name[0] : "" }}
          </span>
          <v-text-field v-model="name" label="Name" variant="outlined" />

          <span class="text-red font-semibold" v-if="errors">
            {{ errors && errors.email ? errors.email[0] : "" }}
          </span>
          <v-text-field v-model="email" label="Email" variant="outlined" />
          <span class="text-red font-semibold" v-if="errors">
            {{ errors && errors.password ? errors.password[0] : "" }}
          </span>
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
          />
          <v-text-field
            v-model="passwordConfirmation"
            label="Confirm Password"
            variant="outlined"
            :type="show2 ? 'text' : 'password'"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
          />

          <v-btn
            block
            :loading="loading"
            :disabled="!name || !password || !email"
            type="submit"
            color="green"
            variant="tonal"
            >Register</v-btn
          >
        </div>
      </form>

      <div align="center" class="mt-5">
        Already have an account?
        <a class="text-green text-decoration-none" href="/"> Login </a>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~~/stores/users";
const userStore = useUserStore();

const router = useRouter();

let show1 = ref(false);
let show2 = ref(false);
let name = ref(null);
let email = ref(null);
let password = ref(null);
let passwordConfirmation = ref(null);
let loading = ref(false);
let errors = ref(null);

const register = async () => {
  errors.value = null;
  loading.value = true;
  try {
    await userStore.getTokens();
    await userStore.register(
      name.value,
      email.value,
      password.value,
      passwordConfirmation.value
    );
    await userStore.getUser();
    loading.value = false;
    router.push("/home");
  } catch (error) {
    loading.value = false;
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
