import { defineStore, storeToRefs } from "pinia";

const useAdminStore = defineStore("admin", {
  state: () => ({}),
  getters: {},
  actions: {},
});

export default {
  ...useAdminStore(),
  ...storeToRefs(useAdminStore()),
};
