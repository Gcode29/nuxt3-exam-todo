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

          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
          >
            <template v-slot:item.glutenfree="{ item }">
              <v-checkbox-btn
                v-model="item.columns.glutenfree"
                disabled
              ></v-checkbox-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <Delete :item="item" />
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
import { ref } from "vue";

const headers = [
  {
    title: "Title",
    align: "start",
    key: "name",
  },
  { title: "Description", key: "calories" },
  { title: "Due Date", key: "fat" },
  { title: "Attachments", key: "carbs" },
  { title: "Tags", key: "protein" },
  { title: "Priority", key: "iron" },
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

const deleteTag = async (item) => {};
</script>
