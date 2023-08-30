<template>
  <div>
    <v-btn
      size="small"
      color="red"
      icon="mdi-trash-can"
      variant="text"
      @click="open"
    />

    <v-dialog v-model="dialog" width="400">
      <v-card class="mx-auto">
        <v-container>
          <h2 class="text-center">Delete {{ name }}</h2>

          <p class="text-center mt-3">
            Are you sure you would like to delete this?
          </p>
        </v-container>

        <v-divider></v-divider>

        <v-container>
          <v-row>
            <v-col>
              <v-btn block depressed color="error" @click="DeleteFunction">
                Delete
              </v-btn>
            </v-col>

            <v-col>
              <v-btn text block @click="close">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["delete"]);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  delete: {
    type: Function,
    required: true,
  },
});

const dialog = ref(false);

const open = (e) => {
  dialog.value = true;
};

const close = (e) => {
  dialog.value = false;
};

const DeleteFunction = (e) => {
  emit("delete");

  dialog.value = false;
};
</script>
