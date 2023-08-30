<template>
  <AuthLayout>
    <v-main>
      <v-row>
        <v-container>
          <v-col
            cols="12"
            offset-lg="3"
            lg="6"
            offset-md="3"
            md="6"
            offset-sm="2"
            sm="8"
          >
            <v-text-field
              variant="outlined"
              placeholder="Search :"
              prepend-inner-icon="mdi-magnify"
            />
          </v-col>
        </v-container>
        <v-col cols="12" offset-lg="2" lg="4" offset-md="1" md="5">
          <v-container>
            <v-card class="mx-auto overflow-auto" max-width="450">
              <v-toolbar color="teal-lighten-2">
                <v-toolbar-title>Todo List</v-toolbar-title>

                <v-spacer></v-spacer>
                <Form />
              </v-toolbar>

              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="white"
              ></v-progress-linear>

              <template v-if="taskStore.incompleteTasks?.length > 0">
                <v-list
                  lines="three"
                  select-strategy="classic"
                  max-height="435"
                >
                  <v-list-subheader>Completed</v-list-subheader>
                  <v-list-item
                    v-for="item in taskStore.incompleteTasks.filter(
                      (task) => task.is_completed === 0
                    )"
                  >
                    <template v-slot:prepend>
                      <v-list-item-action start>
                        <v-checkbox-btn
                          @click="taskComplete(item.id)"
                        ></v-checkbox-btn>
                      </v-list-item-action>
                    </template>

                    <template v-slot:append>
                      <Form :task="item" />
                      <v-btn
                        color="teal"
                        variant="text"
                        size="small"
                        icon="mdi-archive-arrow-down"
                        @click="archiveTask"
                      />
                      <Delete
                        :item="item"
                        :name="item.title"
                        @delete="deleteTask(item)"
                      />
                    </template>

                    <v-list-item-title>
                      <ViewForm :task="item" />
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <span class="font-weight-bold">Priority :</span>
                      {{ displayPriority(item) }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      <div>Due Date : {{ item.due_date }}</div>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      <span>Description :</span>
                      <p>{{ item.description }}</p>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      Attachments : {{ item.attachments_count }}
                    </v-list-item-subtitle>

                    Tags :
                    <v-chip-group>
                      <v-chip v-for="tag in item.tags" :key="tag">{{
                        tag.name
                      }}</v-chip>
                    </v-chip-group>

                    <v-divider></v-divider>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-pagination
                  :length="meta.last_page"
                  v-model="currentPage"
                  @input="changePage"
                ></v-pagination>
              </template>

              <template v-else>
                <div align="center" class="mt-5">No Task Found</div>
              </template>
            </v-card>
          </v-container>
        </v-col>

        <v-col cols="12" lg="4" md="5">
          <v-container>
            <v-card class="mx-auto overflow-auto" max-width="450">
              <v-toolbar color="teal-lighten-2">
                <v-toolbar-title>Completed List</v-toolbar-title>
              </v-toolbar>

              <v-progress-linear
                :active="loading2"
                :indeterminate="loading2"
                absolute
                bottom
                color="white"
              ></v-progress-linear>

              <template v-if="taskStore.completedTasks?.length > 0">
                <v-list
                  lines="three"
                  select-strategy="classic"
                  max-height="435"
                >
                  <v-list-subheader>Completed</v-list-subheader>

                  <v-list-item
                    v-for="item in taskStore.completedTasks.filter(
                      (task) => task.is_completed === 1
                    )"
                  >
                    <template v-slot:prepend>
                      <v-list-item-action start>
                        <v-checkbox-btn
                          @click="taskUncomplete(item.id)"
                        ></v-checkbox-btn>
                      </v-list-item-action>
                    </template>

                    <template v-slot:append>
                      <Form :task="item" />
                      <Delete
                        :item="item"
                        :name="item.title"
                        @delete="deleteTask(item)"
                      />
                    </template>

                    <v-list-item-title>
                      <ViewForm :task="item" />
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <span class="font-weight-bold">Priority :</span>
                      {{ displayPriority(item) }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      <div>Due Date : {{ item.due_date }}</div>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      <span>Description :</span>
                      <p>{{ item.description }}</p>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="mb-3">
                      Attachments : {{ item.attachments_count }}
                    </v-list-item-subtitle>

                    Tags :
                    <v-chip-group>
                      <v-chip v-for="tag in item.tags" :key="tag">{{
                        tag.name
                      }}</v-chip>
                    </v-chip-group>
                    <v-divider></v-divider>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-pagination
                  :length="meta.last_page"
                  v-model="currentPage"
                  @input="changePage"
                ></v-pagination>
              </template>

              <template v-else>
                <div align="center" class="mt-5">No Task Found</div>
              </template>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-main>

    <v-snackbar v-model="snackbar" variant="tonal" color="red" location="top">
      Task Removed !

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/navbar.vue";
import Delete from "~/components/DeleteModal.vue";
import Form from "~/components/task/Form.vue";
import ViewForm from "~/components/task/ViewForm.vue";
import { useTaskStore } from "~/stores/tasks";
import { ref } from "vue";
import { useUserStore } from "~/stores/users";

definePageMeta({ middleware: "is-logged-out" });

const taskStore = useTaskStore();
const search = ref();
const snackbar = ref(false);
const loading = ref(false);
const loading2 = ref(false);
const error = ref();
const id = ref();

const meta = ref({});
const currentPage = ref(meta.current_page || 1);
const changePage = (page) => {
  currentPage.value = page;
};

const getNextPage = () => {
  if (meta.current_page < meta.last_page) {
    return meta.current_page + 1;
  } else {
    return null; // No next page
  }
};

const archiveTask = async () => {
  loading.value = true;
  try {
    // soft delete
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const taskComplete = async (item) => {
  loading.value = true;
  try {
    await taskStore.complete_task(item);
    await taskStore.get_tasks();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const taskUncomplete = async (item) => {
  loading2.value = true;
  try {
    await taskStore.uncomplete_task(item);
    await taskStore.get_tasks();
    loading2.value = false;
  } catch (error) {
    console.log(error);
    loading2.value = false;
  }
};

const priorityMapping = {
  1: "Low",
  2: "Normal",
  3: "High",
  4: "Urgent",
};

const displayPriority = (task) => {
  return priorityMapping[task.priority] || "Unknown";
};

const deleteTask = async (item) => {
  loading.value = true;
  error.value = null;
  try {
    snackbar.value = true;
    await taskStore.delete_task(item.id);
    await taskStore.get_tasks();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    errors.value = error.response
      ? error.response.data.errors
      : "An error occured.";
  }
};

const onSearch = async () => {
  await fetchData();
};

const fetchData = async () => {
  const payload = new URLSearchParams();

  if (search.value) {
    payload.append("filter[name]", search.value);
  }

  await taskStore.get_tasks(payload);
};

onMounted(async () => {
  await fetchData();
});
</script>
