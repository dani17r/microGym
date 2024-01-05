import { defineAsyncComponent } from "vue";

export default {
  DialogTable: defineAsyncComponent(
    async () => await import("@modules/permitions/DialogTablePermitions.vue")
  ),
  Table: defineAsyncComponent(
    async () => await import("@modules/permitions/TablePermitions.vue")
  ),
};
