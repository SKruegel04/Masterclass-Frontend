import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserListView from "../views/UserListView.vue";
import CourseListView from "../views/CourseListView.vue";
import CourseCreateView from "../views/courses/CourseCreateView.vue";
import CourseDeleteView from "../views/courses/CourseDeleteView.vue";

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
      name: "users",
      component: UserListView,
    },
    {
      path: "/courses",
      name: "courses",
      component: CourseListView,
    },
    {
      path: "/courses/create",
      name: "createCourse",
      component: CourseCreateView,
    },
    {
      path: "/courses/:id/delete",
      name: "deleteCourse",
      component: CourseDeleteView,
    },
  ],
});

export default router;
