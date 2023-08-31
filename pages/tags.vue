<template>
  <AuthLayout>
    <v-main>
      <v-container>
        <v-card class="mx-auto pa-12 pb-8 mt-5" elevation="8" rounded="lg">
          <v-toolbar flat color="transparent">
            <h1>TAGS</h1>
            <v-spacer />
            <Form />
          </v-toolbar>

          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="teal-accent-4"
          ></v-progress-linear>

          <v-row>
            <v-col cols="12" class="mt-5">
              <v-text-field
                v-model="search"
                variant="solo"
                placeholder="Search..."
                @input="onSearch"
              />
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="tagStore.tags"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-row>
                <Form :tag="item.selectable" />
                <Delete
                  :item="item"
                  :name="item.selectable.name"
                  @delete="deleteTag(item)"
                />
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" variant="tonal" color="red" location="top">
      Tag Deleted !

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/navbar.vue";
import Form from "~/components/tags/Form.vue";
import Delete from "~/components/DeleteModal.vue";
import { useTagStore } from "~~/stores/tags";
import { ref } from "vue";

const tagStore = useTagStore();
const search = ref();
const snackbar = ref(false);
const loading = ref(false);
const error = ref();

const onSearch = async () => {
  await fetchData();
};

const deleteTag = async (item) => {
  loading.value = true;
  error.value = null;
  try {
    snackbar.value = true;
    await tagStore.deleteTag(item.selectable.id);
    await tagStore.getTags();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    errors.value = error.response
      ? error.response.data.errors
      : "An error occured.";
  }
};

const fetchData = async () => {
  const payload = new URLSearchParams();

  if (search.value) {
    payload.append("filter[name]", search.value);
  }

  await tagStore.getTags(payload);
};

onMounted(async () => {
  await fetchData();
});

const headers = [
  {
    title: "Tag Name",
    align: "start",
    key: "name",
  },
  { title: "Actions", key: "actions" },
];
</script>
