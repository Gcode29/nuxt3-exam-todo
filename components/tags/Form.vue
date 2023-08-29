<template>
  <div>
    <v-btn
      v-if="helper.isEmptyObject(props.tag)"
      prepend-icon="mdi-plus"
      @click="openDialog"
    >
      ADD
    </v-btn>

    <v-btn
      v-else
      color="blue"
      icon="mdi-pencil-box-outline"
      variant="text"
      @click="updateTag()"
    />

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title v-if="helper.isEmptyObject(props.tag)">
            Create Tag
          </v-toolbar-title>

          <v-toolbar-title v-else> Update Tag </v-toolbar-title>
        </v-toolbar>

        <form ref="form" @submit.prevent="onSubmit">
          <v-container>
            <span class="text-red font-semibold" v-if="errors">
              {{ errors && errors.name ? errors.name[0] : "" }}
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
                <v-btn
                  block
                  depressed
                  type="submit"
                  :disabled="!name"
                  :loading="loading"
                >
                  <span v-if="helper.isEmptyObject(props.tag)">Save</span>
                  <span v-else>Update</span>
                </v-btn>
              </v-col>

              <v-col>
                <v-btn variant="outlined" block @click="close"> Cancel </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import useObjectHelper from "~/composables/helper";
import { useUserStore } from "~/stores/users";
import { useTagStore } from "~/stores/tags";

const userStore = useUserStore();
const helper = useObjectHelper();
const tagStore = useTagStore();
let name = ref();
let id = ref();
const loading = ref(false);
const errors = ref(null);
const dialog = ref(false);

const openDialog = (e) => {
  dialog.value = true;
  name.value = "";
};

const close = (e) => {
  dialog.value = false;
  name.value = "";
};

const props = defineProps({
  tag: {
    type: Object,
    default: () => ({}),
  },
});

const updateTag = () => {
  dialog.value = true;
  console.log(props.tag);

  if (!helper.isEmptyObject(props.tag)) {
    id.value = props.tag.value;
    name.value = props.tag.name;
  }
};

const onSubmit = async () => {
  loading.value = true;
  errors.value = null;
  try {
    if (helper.isEmptyObject(props.tag)) {
      //save
      await userStore.getTokens();
      await tagStore.save_tag(name.value);
      dialog.value = false;
      loading.value = false;
      await tagStore.getTags();
    } else {
      // update
      await userStore.getTokens();
      await tagStore.update_tag(name.value, props.tag.id);
      dialog.value = false;
      loading.value = false;
      await tagStore.getTags();
    }
  } catch (error) {
    loading.value = false;
    errors.value = error.response
      ? error.response.data.errors
      : "An error occured.";
  }
};
</script>
