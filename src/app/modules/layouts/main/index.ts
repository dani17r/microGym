import { defineAsyncComponent } from "vue";

export default {
  ButtonConfigDrawerLeft: defineAsyncComponent(
    async () => await import("@modules/layouts/main/ButtonConfigDrawerLeft.vue")
  ),
  DrawerRight: defineAsyncComponent(
    async () => await import("@modules/layouts/main/DrawerRight.vue")
  ),
  DrawerLeft: defineAsyncComponent(
    async () => await import("@modules/layouts/main/DrawerLeft.vue")
  ),
  ListDrawerLeft: defineAsyncComponent(
    async () => await import("@modules/layouts/main/ListDrawerLeft.vue")
  ),
  Header: defineAsyncComponent(
    async () => await import("@modules/layouts/main/HeaderMain.vue")
  ),
};
