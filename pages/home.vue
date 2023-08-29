<template>
  <AuthLayout>
    <v-main>
      <v-container>
        <v-card class="mx-auto pa-12 pb-8 mt-5" elevation="8" rounded="lg">
          <v-toolbar flat color="transparent">
            <h1>TODO LIST</h1>
            <v-spacer />
            <Form />
          </v-toolbar>

          <v-card title="Card title" text="...">
            <v-card-actions>
              <v-btn>Click me</v-btn>
            </v-card-actions>
          </v-card>

          <!-- <v-data-table
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
              <v-row>
                <v-btn
                  variant="text"
                  color="green"
                  prepend-icon="mdi-archive-arrow-down"
                  >Archive</v-btn
                >
                |
                <Delete :item="item" />
              </v-row>
            </template>
          </v-data-table> -->
        </v-card>
      </v-container>
    </v-main>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/navbar.vue";
import Delete from "~/components/DeleteModal.vue";
import Form from "~/components/task/Form.vue";
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
  { title: "Actions", key: "actions" },
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
