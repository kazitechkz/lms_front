// src/router/routes/authRoutes.ts

import Dashboard from "@/presentation/modules/admin/Dashboard.vue";
import RoleList from "@/presentation/modules/admin/role/RoleList.vue";
import RoleDetail from "@/presentation/modules/admin/role/RoleDetail.vue";
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
            },
            {
                path: 'roles/:id',
                component: () => RoleDetail,
                props: true
            },
        ]
    },
];

export default adminRoutes;
