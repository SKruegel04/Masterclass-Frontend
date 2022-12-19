import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserListView from "../views/UserListView.vue";
import CourseListView from "../views/CourseListView.vue";
import CourseCreateView from "../views/courses/CourseCreateView.vue";
import CourseEditView from "../views/courses/CourseEditView.vue";
import CourseDeleteView from "../views/courses/CourseDeleteView.vue";
import UserCreateView from "../views/users/UserCreateView.vue";
import UserDeleteView from "../views/users/UserDeleteView.vue";
import UserEditView from "../views/users/UserEditView.vue";

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
      path: "/courses/:id/edit",
      name: "editCourse",
      component: CourseEditView,
    },
    {
      path: "/courses/:id/delete",
      name: "deleteCourse",
      component: CourseDeleteView,
    },
    {
      path: "/users/create",
      name: "createUser",
      component: UserCreateView,
    },
    {
      path: "/users/:id/edit",
      name: "editUser",
      component: UserEditView,
    },
    {
      path: "/users/:id/delete",
      name: "deleteUser",
      component: UserDeleteView,
    },
  ],
});

export default router;
