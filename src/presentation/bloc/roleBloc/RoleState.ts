import { defineStore } from 'pinia';
import type {Role} from "@/domain/entities/Role.ts";

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: [] as Role[],
        role: null as Role | null,
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        hasRoles: (state) => state.roles.length > 0,
    },

    actions: {
        setRoles(roles: Role[]): void {
            this.roles = roles;
        },
        setRole(role: Role | null): void {
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