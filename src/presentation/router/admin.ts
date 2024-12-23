// src/router/routes/authRoutes.ts

import Dashboard from "@/presentation/modules/Dashboard.vue";
import RoleList from "@/presentation/modules/admin/role/RoleList.vue";
import AdminLayout from "@/presentation/layouts/AdminLayout.vue";
import RoleDetail from "@/presentation/modules/admin/role/RoleDetail.vue";

const adminRoutes = [
    {
        path: '/admin',
        component: () => AdminLayout,
        meta: { requiresAuth: false },
        children: [
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: () => Dashboard
            },
            {
                path: 'role',
                component: () => RoleList
            },
            {
                path: 'role/:id',
                component: () => RoleDetail,
                props: true
            },
        ]
    },
];

export default adminRoutes;
