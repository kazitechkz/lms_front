import { defineStore } from 'pinia';
import type {PermissionRDTO} from "@/data/dto/RolePermissionDTO.ts";

export const useRolePermissionStore = defineStore('role-permission', {
    state: () => ({
        permissionsByRole: [] as PermissionRDTO[],
        updatedPermissions: [] as PermissionRDTO[],
        permissions: [] as PermissionRDTO[],
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        hasPermissions: (state) => state.permissions.length > 0,
        hasPermissionsByRole: (state) => state.permissionsByRole.length > 0,
        hasUpdatedPermissions: (state) => state.updatedPermissions.length > 0,
    },

    actions: {
        setPermissions(permissions: PermissionRDTO[]): void {
            this.permissions = permissions;
        },
        setPermissionsByRole(permissions: PermissionRDTO[]): void {
            this.permissionsByRole = permissions;
        },
        setUpdatedPermissions(permissions: PermissionRDTO[]): void {
            this.updatedPermissions = permissions;
        },
        setLoading(isLoading: boolean): void {
            this.isLoading = isLoading;
        },
        setError(error: string | null): void {
            this.error = error;
        },
        resetState(): void {
            this.permissions = [];
            this.isLoading = false;
            this.error = null;
        },
    },
});

export type RolePermissionStore = Omit<
    ReturnType<typeof useRolePermissionStore>,
    keyof ReturnType<typeof defineStore>
>;