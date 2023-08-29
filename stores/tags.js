import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useTagStore = defineStore("tag", {
    state: () => ({
        tag: {},
        tags: null,
    }),

    actions: {
        async getTags(payload) {
            const { data } = await $axios.get("api/tags?" + payload);
            this.$state.tags = data.data;
        },

        async save_tag(name) {
            await $axios.post("api/tags", {
                name: name,
            });
        },

        async update_tag(name, id) {
            await $axios.patch(`api/tags/${id}`, {
                name: name,
            });
        },

        async delete_tag(id){
            await $axios.delete(`api/tags/${id}`);
        },
    },
})