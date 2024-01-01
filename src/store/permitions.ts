// import { defineStore, storeToRefs } from "pinia";
// import { PaginateI, RoleI, RoleParams, columnI } from "@/types/global";
// import { pb } from "@services/main";
// import { columnsRoles } from "./static";
// import { omit } from "lodash";

// const useRolesStore = defineStore("roles", {
//   state: () => ({
//     columns: <columnI[]>columnsRoles,
//     roles: <RoleI[]>[],
//     role: <RoleI>{},
//     pagination: <PaginateI>{
//       page: 1,
//       perPage: 50,
//       totalItems: 0,
//       TotalPages: 0,
//     },
//   }),
//   getters: {},
//   actions: {
//     async getAll() {
//       pb.collection("permitions")
//         .getFullList()
//         .then((data) => {
//           filterOfPermitions.value = data;
//           allPermitions.value = data;
//         });
//     },
//   },
// });

// export default () => {
//   const useStore = useRolesStore();
//   return {
//     ...useStore,
//     ...storeToRefs(useStore),
//   };
// };
