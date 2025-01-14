// src/router/routes/authRoutes.ts

import Dashboard from "@/presentation/modules/admin/Dashboard.vue";
import RoleList from "@/presentation/modules/admin/role/RoleList.vue";
import AdminLayout from "@/presentation/layouts/admin/AdminLayout.vue";

const adminRoutes = [
    {
        path: '/admin',
        component: () => AdminLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: () => Dashboard
            },
            {
                path: 'roles',
                component: () => RoleList
            }
        ]
    },
];

export default adminRoutes;
