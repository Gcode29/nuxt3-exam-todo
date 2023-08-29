<template>
  <div>
    <v-btn prepend-icon="mdi-plus" @click="openDialog"> ADD </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title> Create Task </v-toolbar-title>
        </v-toolbar>

        <v-form ref="form" @submit.prevent="onSubmit">
          <v-container>
            <v-text-field
              class="mt-2"
              density="compact"
              v-model="title"
              label="Title"
              variant="outlined"
              required
            />

            <v-text-field
              class="mt-2"
              density="compact"
              v-model="description"
              label="Description"
              variant="outlined"
              required
            />

            <input type="date" v-model="formattedDate" name="Due Date" />

            <v-combobox
              class="mt-2"
              density="compact"
              v-model="priorityLevel"
              label="Priority Level"
              variant="outlined"
              required
            />

            <v-autocomplete
              class="mt-2"
              v-model="tags"
              label="Tags"
              chips
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              multiple
              variant="outlined"
            ></v-autocomplete>

            <v-file-input
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
                <v-btn block depressed type="submit">
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

const helper = useObjectHelper();

const dialog = ref(false);

const openDialog = (e) => {
  dialog.value = true;
};

const close = (e) => {
  dialog.value = false;
};
</script>
