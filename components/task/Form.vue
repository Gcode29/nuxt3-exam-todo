<template>
  <div>
    <v-btn
      class="mr-2"
      v-if="helper.isEmptyObject(props.task)"
      prepend-icon="mdi-plus"
      @click="openDialog"
    >
      ADD
    </v-btn>
    <v-btn
      v-else
      icon="mdi-pencil-box-outline"
      variant="text"
      color="blue"
      size="small"
      @click="updateTask()"
    />

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title>
            {{ helper.isEmptyObject(props.task) ? "Create" : "Update" }} Task
          </v-toolbar-title>
        </v-toolbar>

        <v-form ref="form" @submit.prevent="onSubmit">
          <v-container>
            <v-text-field
              class="mt-2"
              v-model="title"
              label="Title"
              variant="outlined"
              required
            />

            <v-text-field
              class="mt-2"
              v-model="description"
              label="Description"
              variant="outlined"
              required
            />

            <v-text-field
              class="mt-2"
              type="date"
              v-model="dueDate"
              label="Due Date"
              variant="outlined"
              placeholder="yyyy/mm/dd"
            />

            <v-combobox
              class="mt-2"
              v-model="priorityLevel"
              label="Priority Level"
              variant="outlined"
              :items="prioritySection"
              item-value="id"
              item-title="type"
              :return-object="false"
            />

            <v-autocomplete
              class="mt-2"
              closable-chips
              v-model="tags"
              label="Tags"
              chips
              :items="tagStore.tags"
              item-value="id"
              item-title="name"
              :return-object="false"
              multiple
              variant="outlined"
            >
            </v-autocomplete>

            <v-file-input
              v-model="uploadedFiles"
              class="mt-2"
              chips
              multiple
              label="Upload"
              variant="outlined"
            ></v-file-input>
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  :loading="loading"
                  :disabled="!title || !description"
                  block
                  depressed
                  type="submit"
                >
                  <span>
                    {{ helper.isEmptyObject(props.task) ? "Save" : "Update" }}
                  </span>
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

    <v-snackbar
      v-model="snackbar"
      variant="tonal"
      :color="snackbar_color"
      location="top"
    >
      {{ snackbar_text }}

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import useObjectHelper from "~/composables/helper";
import { useTaskStore } from "~/stores/tasks";
import { useTagStore } from "~/stores/tags";
import { useUserStore } from "~/stores/users";

const helper = useObjectHelper();
const taskStore = useTaskStore();
const tagStore = useTagStore();
const userStore = useUserStore();
let snackbar_color = ref("");
let snackbar_text = ref("");
let snackbar = ref(false);

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
});

const prioritySection = ref([
  {
    id: 1,
    type: "low",
  },
  {
    id: 2,
    type: "Normal",
  },
  {
    id: 3,
    type: "High",
  },
  {
    id: 4,
    type: "Urgent",
  },
]);

const openDialog = (e) => {
  dialog.value = true;
  title.value = null;
  description.value = null;
  dueDate.value = "";
  priorityLevel.value = "";
  tags.value = null;
  uploadedFiles.value = null;
};

const close = (e) => {
  dialog.value = false;
  title.value = "";
  description.value = "";
  dueDate.value = "";
  priorityLevel.value = "";
  tags.value = "";
  uploadedFiles.value = "";
};
const dialog = ref(false);
let id = ref();
let loading = ref(false);
let title = ref();
let description = ref();
let dueDate = ref();
let priorityLevel = ref();
let tags = ref(null);
let uploadedFiles = ref([]);
let errors = ref();

const fetchTags = async () => {
  await tagStore.getTags();
};

onMounted(async () => {
  await fetchTags();
});

const updateTask = () => {
  dialog.value = true;
  console.log(props.task);

  if (!helper.isEmptyObject(props.task)) {
    id.value = props.task.id;
    title.value = props.task.title;
    description.value = props.task.description;
    dueDate.value = props.task.due_date;
    priorityLevel.value = props.task.priority;
    tags.value = props.task.tags.map((tag) => tag.id);
    uploadedFiles.value = props.task.attachments.map(
      (attachment) => attachment.path
    );
  }
};

const onSubmit = async () => {
  loading.value = true;
  errors.value = null;
  try {
    if (helper.isEmptyObject(props.task)) {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("due_date", dueDate.value);
      formData.append("priority", priorityLevel.value);

      if (tags.value !== null) {
        const tagsCopy = [...tags.value];

        for (let tag of tagsCopy) {
          formData.append("selectedTags[]", tag);
        }
      }

      if (uploadedFiles.value !== null) {
        for (let file of uploadedFiles.value) {
          formData.append("uploadedFiles[]", file);
        }
      }

      // console.log(formData.getAll("selectedTags[]"));
      // Save
      await userStore.getTokens();
      await taskStore.save_task(formData);
      await taskStore.get_tasks();
      snackbar_color.value = "teal";
      snackbar.value = true;
      snackbar_text.value = "Task Successfully Saved !";
      loading.value = false;
      close();
    } else {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("due_date", dueDate.value);
      formData.append("priority", priorityLevel.value);
      formData.append("task_id", id.value);

      const tagsCopy = [...tags.value];

      for (let tag of tagsCopy) {
        formData.append("selectedTags[]", tag);
      }

      for (let file of uploadedFiles.value) {
        formData.append("uploadedFiles[]", file);
      }

      // update
      await userStore.getTokens();
      await taskStore.update_task(formData);
      await taskStore.get_tasks();
      snackbar_color.value = "teal";
      snackbar.value = true;
      snackbar_text.value = "Task Successfully Updated !";
      loading.value = false;
      close();
    }
  } catch (error) {
    loading.value = false;
    errors.value = error.response
      ? error.response.data.errors
      : "An error occured.";
  }
};
</script>
