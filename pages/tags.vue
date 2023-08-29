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
            :items="tags"
            class="elevation-1"
          >
            <template v-slot:item.glutenfree="{ item }">
              <v-checkbox-btn
                v-model="item.columns.glutenfree"
                disabled
              ></v-checkbox-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <Delete 
                  :item="item"
                  :name="item.name"
                  @delete="deleteTag(item)"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/navbar.vue";
import Form from "~/components/tags/Form.vue";
import Delete from "~/components/DeleteModal.vue";
import { useTagStore } from '~~/stores/tags';
import { ref } from "vue";

const tagStore = useTagStore();
const search = ref();

const onSearch = async() => {
  await fetchData();
};

const deleteTag = async (item) => {
  await tagStore.delete_tag(item.id);
  await tagStore.getTags();
}

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
  { title: "Actions", align: "center", key: "actions" },
];

const desserts = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1%",
  },
]);
</script>
