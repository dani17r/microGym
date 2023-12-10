import { defineStore, storeToRefs } from "pinia";
import { LocalStorage, Dark } from "quasar";

const useGlobalStore = defineStore("global", {
  state: () => ({
    modeDark: Boolean(LocalStorage.getItem("modeDark")),
  }),
  getters: {
    isDark(): Boolean {
      Dark.set(this.modeDark);
      return this.modeDark;
    },
  },
  actions: {
    modeDarkToggle() {
      Dark.toggle();
      this.modeDark = !this.modeDark;
      LocalStorage.set("modeDark", this.modeDark);
    },
  },
});

export default () => {
  const useStore = useGlobalStore();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};
