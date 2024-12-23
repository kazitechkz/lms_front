// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/presentation/utils/authGuard';
import authRoutes from "@/presentation/router/auth.ts";
import adminRoutes from "@/presentation/router/admin.ts";

const routes = [
  ...authRoutes,
  ...adminRoutes,
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/presentation/modules/Dashboard.vue'), // Lazy Loading
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next('/login'); // Перенаправление на страницу входа
  } else {
    next(); // Разрешить переход
  }
});

export default router;