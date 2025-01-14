// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import {isAdmin, isAuthenticated, isUser} from '@/presentation/utils/authGuard';
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/presentation/modules/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный guard
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

  if (to.meta.requiresAuth && !isAuth) {
    console.log(`Unauthenticated user trying to access ${to.path}. Redirecting to /login.`);
    next('/login');
  }
  else if (to.name === 'Login' && isAuth) {
    console.log(`Authenticated user trying to access ${to.path}. Redirecting to appropriate route.`);

    if (isAdmin()) {
      next('/admin/dashboard');
    } else if (isUser()) {
      next('/user/home');
    } else {
      next('/dashboard');
    }
  }
  else {
    next();
  }
});

export default router;