<template>
  <div id="Login">
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
          @click="homepage"
        >
          Log In
        </v-btn>
        <v-btn block class="mb-8" size="large" variant="outlined">
          close
        </v-btn>
      </form>

      <v-card-text class="text-center">
        <a
          class="text-green text-decoration-none"
          href="/register"
          rel="noopener noreferrer"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const router = useRouter();

let loading = ref(false);

const login = async () => {
  loading.value = true;
  router.push("/Home");
  loading.value = false;
};
</script>
