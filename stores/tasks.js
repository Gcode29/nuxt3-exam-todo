import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useTaskStore = defineStore("task", {
  state: () => ({
    task: {},
    completedTasks: [],
    incompleteTasks: [],
  }),

  actions: {
    async get_tasks(payload) {
      const { data } = await $axios.get("api/tasks?" + payload);
      this.$state.completedTasks = data.completedTasks;
      this.$state.incompleteTasks = data.uncompletedTasks;
    },

    async save_task(payload) {
      await $axios.post("api/tasks", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    async update_task(payload) {
      await $axios.post(`/api/tasks/${payload.get("task_id")}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    async delete_task(id) {
      await $axios.delete(`api/tasks/${id}`);
    },

    async complete_task(id) {
      await $axios.patch(`api/complete_task/${id}`, { id: id });
    },

    async uncomplete_task(id) {
      await $axios.patch(`api/uncomplete_task/${id}`, { id: id });
    },
  },
});
