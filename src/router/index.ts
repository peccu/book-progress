import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: "/*",
      name: "404",
      component: () => import("../views/NotFound.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/new",
      name: "new",
      component: () => import("../views/EditView.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/EditView.vue"),
      props: true,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/importexport",
      name: "importexport",
      component: () => import("../views/ImportExportView.vue"),
    },
  ],
});

export default router;
