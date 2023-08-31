import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useTaskStore = defineStore("task", {
  state: () => ({
    task: {},
    tasks: {},
    completedTasks: [],
    incompleteTasks: [],
  }),

  actions: {
    async getTasks(payload) {
      const { data } = await $axios.get("api/tasks?" + payload);
      this.$state.tasks = data;
      // this.$state.completedTasks = data.completedTasks;
      // this.$state.incompleteTasks = data.uncompletedTasks;
    },

    async saveTask(payload) {
      await $axios.post("api/tasks", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    async updateTask(payload) {
      await $axios.post(`/api/tasks/${payload.get("task_id")}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    async deleteTask(id) {
      await $axios.delete(`api/tasks/${id}`);
    },

    async completeTask(id) {
      await $axios.patch(`api/tasks/${id}/complete`, { id: id });
    },

    async uncompleteTask(id) {
      await $axios.patch(`api/tasks/${id}/uncomplete`, { id: id });
    },

    async archiveTask(id) {
      await $axios.delete(`api/tasks/${id}/archive`, { id: id });
    },

    async restoreTask(id) {
      await $axios.patch(`api/tasks/${id}/restore`, { id: id });
    },

    async deleteUploadedFile(id) {
      //
    },
  },
});
