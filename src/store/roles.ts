import { defineStore, storeToRefs } from "pinia";
import { PaginateI, RoleI, columnI } from "@/types/global";
import { pb } from "@services/main";
import { columnsRoles } from "./static";
import { omit } from "lodash";

const useRolesStore = defineStore("roles", {
  state: () => ({
    columns: <columnI[]>columnsRoles,
    roles: <RoleI[]>[],
    role: <RoleI>{},
    pagination: <PaginateI>{
      page: 1,
      perPage: 50,
      totalItems: 0,
      TotalPages: 0,
    },
  }),
  getters: {},
  actions: {
    async getRoles() {
      const result = await pb
        .collection("roles")
        .getList<RoleI>(1, 30, { expand: "permitions" });

      this.roles = result.items;
      this.pagination = omit(result, "items");
    },
  },
});

export default () => {
  const useStore = useRolesStore();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};
