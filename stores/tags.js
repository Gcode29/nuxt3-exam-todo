import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useTagStore = defineStore("tag", {
  state: () => ({
    tag: {},
    tags: [],
  }),

  actions: {
    async getTags(payload) {
      const { data } = await $axios.get("api/tags?" + payload);

      this.$state.tags = data.data;
    },

    async saveTag(name) {
      await $axios.post("api/tags", {
        name: name,
      });
    },

    async updateTag(name, id) {
      await $axios.patch(`api/tags/${id}`, {
        name: name,
      });
    },

    async deleteTag(id) {
      await $axios.delete(`api/tags/${id}`);
    },
  },
});
