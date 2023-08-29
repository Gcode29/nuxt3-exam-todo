import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;
