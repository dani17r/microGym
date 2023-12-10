import { ref } from "vue";

const status = ref(false);

export default () => {
  const toggleDrawer = () => {
    status.value = !status.value;
  };

  return {
    toggleDrawer,
    status,
  };
};
