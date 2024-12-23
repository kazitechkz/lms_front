import { defineStore } from 'pinia';
import type {RoleEntity} from "@/domain/entities/RoleEntity.ts";

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: [] as RoleEntity[],
        role: null as RoleEntity | null,
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        hasRoles: (state) => state.roles.length > 0,
    },

    actions: {
        setRoles(roles: RoleEntity[]): void {
            this.roles = roles;
        },
        setRole(role: RoleEntity | null): void {
            this.role = role;
        },
        setLoading(isLoading: boolean): void {
            this.isLoading = isLoading;
        },
        setError(error: string | null): void {
            this.error = error;
        },
        resetState(): void {
            this.roles = [];
            this.role = null;
            this.isLoading = false;
            this.error = null;
        },
    },
});

export type RoleStore = Omit<
    ReturnType<typeof useRoleStore>,
    keyof ReturnType<typeof defineStore>
>;