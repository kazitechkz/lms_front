// src/router/routes/authRoutes.ts
import Login from '@/presentation/modules/auth/Login.vue';

const authRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

export default authRoutes;
