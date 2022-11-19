import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Users from "../views/Users.vue";
import Courses from "../views/Courses.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
    },
    {
      path: "/courses",
      name: "Courses",
      component: Courses,
    },
  ],
});

export default router;
