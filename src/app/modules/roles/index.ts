import { defineAsyncComponent } from "vue";

export default {
  DialogTable: defineAsyncComponent(
    async () => await import("@modules/roles/DialogTableRoles.vue")
  ),
  Table: defineAsyncComponent(
    async () => await import("@modules/roles/TableRoles.vue")
  ),
};
