<template>
  <div>
    <v-btn prepend-icon="mdi-plus" @click="openDialog"> ADD </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title> Create Tag </v-toolbar-title>
        </v-toolbar>

        <v-form ref="form" @submit.prevent="onSubmit">
          <v-container>
            <span class="text-red font-semibold" v-if="errors">
              {{
                errors && errors.name ? errors.name[0] : ""
              }}
            </span>
            <v-text-field
              class="mt-2"
              density="compact"
              v-model="name"
              label="Tag Name"
              variant="outlined"
              required
            />
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col>
                <v-btn block depressed type="submit" :disabled="!name" :loading="loading">
                  <span>Save</span>
                </v-btn>
              </v-col>

              <v-col>
                <v-btn variant="outlined" block @click="close"> Cancel </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import useObjectHelper from "~/composables/helper";
import { useTagStore } from "~/stores/tags";

const helper = useObjectHelper();
const tagStore = useTagStore();
const name = ref('');
const loading = ref(false);
const errors = ref(null);
const dialog = ref(false);

const openDialog = (e) => {
  dialog.value = true;
};

const close = (e) => {
  dialog.value = false;
};

const onSubmit = async () => {
  loading.value = true;
  errors.value = null;
  
  await tagStore.save_tag(name.value);
  dialog.value = false;
  loading.value = false;
  await tagStore.getTags();
  // try {
  //   if (helper.isEmptyObject(props.tag)) {
  //     //save
  //     // await userStore.getTokens();
  //     await tagStore.save_tag(name.value);
  //     dialog.value = false;
  //     loading.value = false;
  //     await tagStore.getTags();
  //   } else {
  //     // update
  //     // await userStore.getTokens();
  //     await tagStore.update_tag(
  //       name.value,
  //       props.tag.id
  //     );
  //     dialog.value = false;
  //     loading.value = false;
  //     await tagStore.getTags();
  //   }
  // } catch (error) {
  //   loading.value = false;
  //   errors.value = error.response ? error.response.data.errors : "An error occured.";
  // }
}
</script>
