import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/new",
      name: "new",
      component: () => import("../views/NewView.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/EditView.vue"),
      props: true,
      /*beforeEnter: (to, from, next) => {
        alert(to.params.slug)
        next();
        if("notfound"){
next({name: "notFound"})
        }
      }*/
    },
    {
      path: "/history/:id",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
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
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/StatsView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
