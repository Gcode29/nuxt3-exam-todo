<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 mt-5"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-img
        class="d-flex justify-center mb-6 bg-surface-variant"
        src="https://appetiser.com.au/wp-content/uploads/2023/02/Appetiser-Logo.webp"
        height="80"
      ></v-img>

      <div class="text-subtitle-1 text-medium-emphasis mt-5">Account</div>
      <form ref="form" @submit.prevent="login()">
        <span class="text-red mb-3 font-semibold" v-if="errors">
          {{ errors && errors.email ? errors.email[0] : "" }}
        </span>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-green"
            href="/forgot-password"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <span class="text-red mb-3 font-semibold" v-if="errors">
          {{ errors && errors.password ? errors.password[0] : "" }}
        </span>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will
            be temporarily locked for three hours. If you must login now, you
            can also click "Forgot login password?" below to reset the login
            password.
          </v-card-text>
        </v-card>

        <v-btn
          block
          class="mb-8"
          color="green"
          size="large"
          variant="tonal"
          :loading="loading"
          type="submit"
          :disabled="!email || !password"
        >
          Log In
        </v-btn>
        <v-btn block class="mb-8" size="large" variant="outlined">
          close
        </v-btn>
      </form>

      <div class="text-center">
        <a class="text-green text-decoration-none" href="/register">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
const userStore = useUserStore();

definePageMeta({ middleware: "is-logged-in" });

const router = useRouter();
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Invalid Password",
];

let loading = ref(false);
let email = ref();
let password = ref();
let visible = ref();
const errors = ref(null);

const login = async () => {
  if (!validateInputs()) {
    loading.value = true;
    try {
      await userStore.getTokens();
      await userStore.login(email.value, password.value);
      await userStore.getUser();
      router.push("/home");
      loading.value = false;
    } catch (error) {
      loading.value = false;
      errors.value = error.response
        ? error.response.data.errors
        : "An error occurred.";
    }
  }
};

const validateInputs = () => {
  const emailInvalid = emailRules.some((rule) => rule(email.value) !== true);
  const passwordInvalid = passwordRules.some(
    (rule) => rule(password.value) !== true
  );
  return emailInvalid || passwordInvalid;
};
</script>
