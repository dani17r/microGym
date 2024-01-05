import { PermitionI, PermitionParamsI, columnI } from "@/types/global";
import compPagination from "@composables/pagination";
import { defineStore, storeToRefs } from "pinia";
import { columnsPermitions } from "./static";
import { pb } from "@services/main";

const tableName = 'permitions';
const { getPagination } = compPagination(tableName);

const usePermitionsStore = defineStore(tableName, {
  state: () => ({
    tableName,
    columns: <columnI[]>columnsPermitions,
    permitions: <PermitionI[]>[],
    permition: <PermitionI>{},
    paginated: getPagination(),
  }),
  getters: {},
  actions: {
    setPermitions(permitions: PermitionI[]) {
      if (permitions.length) this.permitions = permitions;
    },
    createPermition(form: PermitionParamsI["create"]) {
      return pb
        .collection<PermitionI>(tableName)
        .create(form)
    },
    deletePermition(id: string) {
      return pb.collection(tableName).delete(id);
    },
    async multiDeletePermition(permitions: PermitionI[]) {
      return await Promise.all([
        permitions.map(({ id }) => this.deletePermition(id))
      ])
    },
    updatePermition(permition: PermitionI) {
      return pb.collection(tableName).update(permition.id, permition);
    },
  },
});

export default () => {
  const useStore = usePermitionsStore();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};
