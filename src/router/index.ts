import { createRouter, createWebHashHistory } from "vue-router";
import { isAuth, isNotAuth } from "@middlewares/auth.ts";
import MainLayout from "@layouts/MainLayout.vue";
import AuthLayout from "@layouts/AuthLayout.vue";
import MainPage from "@app/pages/MainPage.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      beforeEnter: isAuth,
      children: [
        {
          path: "",
          name: "main",
          component: MainPage,
        },
        {
          path: "sistem",
          meta:{
            index:0,
          },
          children: [
            {
              path: "",
              name: "sistem",
              component: () => import("@views/PanelRouters.vue"),
            },
            {
              path: "roles",
              name: "roles",
              component: () => import("@pages/RolesPage.vue"),
            },
          ],
        },
        {
          path: "store",
          meta:{
            index:1,
          },
          children: [
            {
              path: "",
              name: "store",
              component: () => import("@views/PanelRouters.vue"),
            },
          ],
        },
        {
          path: "administration",
          meta:{
            index:2,
          },
          children: [
            {
              path: "",
              name: "administration",
              component: () => import("@views/PanelRouters.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      beforeEnter: isNotAuth,
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "login",
          component: () => import("@pages/LoginPage.vue"),
        },
      ],
    },
  ],
});
