<template>
  <AuthLayout>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              placeholder="Search..."
              v-model="search"
              @update:model-value="onSearch"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12" xl="10">
            <v-chip-group
              multiple
              column
              v-model="priority"
              @update:model-value="onSelectPriority"
            >
              <v-chip filter variant="outlined" value="1"> Low </v-chip>
              <v-chip filter variant="outlined" value="2"> Normal </v-chip>
              <v-chip filter variant="outlined" value="3"> High </v-chip>
              <v-chip filter variant="outlined" value="4"> Urgent </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" xl="2">
            <v-checkbox
              @update:model-value="onChangeCompleted"
              v-model="completed"
              label="Completed"
              value=""
            ></v-checkbox>
          </v-col>

          <v-col cols="12">
            <Form />
          </v-col>

          <v-col cols="12" v-for="task in taskStore.tasks.data" lg="6" xl="3">
            <v-card variant="outlined">
              <v-card-title class="d-flex justify-space-between">
                <ViewForm :task="task" />

                <v-chip
                  v-if="task.priority !== null"
                  :color="priorityColor(task.priority)"
                >
                  {{ priorityMapping[task.priority] }}</v-chip
                >
              </v-card-title>

              <div class="px-4 mb-4"></div>

              <v-card-subtitle>{{ task.due_date }}</v-card-subtitle>
              <v-card-text>{{ task.description }}</v-card-text>

              <div class="px-4" v-if="task.tags.length > 0">
                <v-chip-group>
                  <v-chip v-for="tag in task.tags"> {{ tag.name }}</v-chip>
                </v-chip-group>
              </div>

              <v-divider />

              <v-card-actions>
                <v-btn @click="taskComplete(task)"> Complete </v-btn>

                <v-spacer />

                <v-btn icon="mdi-archive-arrow-down-outline" />
                <v-btn icon="mdi-delete-outline" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
const tags = ref();
const priority = ref([]);
const completed = ref(false);

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
    await taskStore.completeTask(item.id);
    await taskStore.getTasks();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const taskUncomplete = async (item) => {
  loading2.value = true;
  try {
    await taskStore.uncompleteTask(item);
    await taskStore.getTasks();
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

const priorityColor = (order) => {
  let color = "";

  switch (order) {
    case 1:
      color = "default";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "red";
      break;
    default:
      color = "default";
  }

  return color;
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
    await taskStore.getTasks();
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

const onSelectTag = async () => {
  await fetchData();
};

const onSelectPriority = async () => {
  await fetchData();
};

const onChangeCompleted = async () => {
  await fetchData();
};

const fetchData = async () => {
  const payload = new URLSearchParams();

  if (search.value) {
    payload.append("q", search.value);
  }

  if (tags.value) {
    payload.append("tag", tags.value);
  }

  if (priority.value) {
    payload.append("filter[priority]", priority.value.toString());
  }

  payload.append("filter[is_completed]", completed.value);

  await taskStore.getTasks(payload);
};

onMounted(async () => {
  await fetchData();
});
</script>
