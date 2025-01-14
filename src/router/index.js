import { createRouter, createWebHistory } from "vue-router";
import Task from "../pages/Task.vue";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/Task", name: "Task", component: Task },
  { path: "/", name: "Home", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
