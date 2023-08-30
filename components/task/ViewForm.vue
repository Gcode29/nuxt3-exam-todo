<template>
  <div>
    <span>Title : </span>
    <a
      href="#"
      @click="openDialog"
      style="text-decoration: none; color: inherit"
      >{{ props.task.title }}</a
    >

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar color="teal-lighten-2">
          <v-toolbar-title>{{ props.task.title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-item>
          <div>Description</div>
          <v-card-subtitle>
            <span class="me-1">{{ props.task.description }}</span>
          </v-card-subtitle>

          <div class="mt-2">
            Priority Level
            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            : {{ displayPriority }}
          </div>
          <div>Due Date : {{ props.task.due_date }}</div>
          <div class="mb-5" v-if="props.task.time_completed">
            Time Completed : {{ props.task.time_completed }}
          </div>
        </v-card-item>

        <div>
          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-text>
            <div class="font-weight-medium">Tags</div>

            <v-chip-group>
              <v-chip v-for="tag in props.task.tags" :key="tag.id">{{
                tag.name
              }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </div>

        <div class="mt-5">
          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Attachments</v-card-title>

          <div class="px-4">
            <v-chip-group>
              <v-chip v-for="tag in props.task.attachments" :key="tag.id">
                {{ tag.path }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="close"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
let dialog = ref();

const openDialog = (e) => {
  dialog.value = true;
};

const close = (e) => {
  dialog.value = false;
};

const priorityMapping = {
  1: "Low",
  2: "Normal",
  3: "High",
  4: "Urgent",
};

const displayPriority = computed(() => {
  return priorityMapping[props.task.priority] || "Unknown";
});

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
});
</script>
