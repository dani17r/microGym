import { defineStore, storeToRefs } from "pinia";
import { pb } from "@services/main";
import router from "@router/index";

const useUserStore = defineStore("user", {
  state: () => ({
    account: <any>[],
  }),
  getters: {},
  actions: {
    login(email: string, password: string) {
      return pb
        .collection("users")
        .authWithPassword(email, password)
        .then((data) => {
          setTimeout(() => router.push({ name: "main" }), 1200);
          this.account = data.record;
          return data;
        });
    },
    logout() {
      pb.authStore.clear();
      setTimeout(() => router.push({ name: "login" }), 1200);
    },
  },
});

export default () => {
  const useStore = useUserStore();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};
