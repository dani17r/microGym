import { RoleI, RoleParamsI, columnI } from "@/types/global";
import compPagination from "@composables/pagination";
import { defineStore, storeToRefs } from "pinia";
import { columnsRoles } from "./static";
import { pb } from "@services/main";

const tableName = 'roles';
const { getPagination } = compPagination(tableName);

const useRolesStore = defineStore(tableName, {
  state: () => ({
    tableName,
    columns: <columnI[]>columnsRoles,
    roles: <RoleI[]>[],
    role: <RoleI>{},
    paginated: getPagination(),
  }),
  getters: {},
  actions: {
    verifyLastItemCreate() {
      this.roles.map((item) => {
        item.last = false;
        return item;
      });
    },
    setRoles(roles: RoleI[]){
      if(roles.length) this.roles = roles;
    },
    createRole(form: RoleParamsI["create"]) {
      return pb
        .collection<RoleI>(tableName)
        .create(form, { expand: "permitions" })
        .then((record) => {
          this.verifyLastItemCreate();
          // this.roles.push({ last: true, ...record });
          // orderBy(this.roles, ["name"], ["desc"]);
          return record;
        });
    },
    deleteRole(id: string) {
      return pb.collection(tableName).delete(id);
    },
    async multiDeleteRole(roles: RoleI[]) {
      return await Promise.all([ 
        roles.map(({ id }) => this.deleteRole(id)) 
      ])
    },
    updateRole(role: RoleI) {
      return pb.collection(tableName).update(role.id, role);
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
