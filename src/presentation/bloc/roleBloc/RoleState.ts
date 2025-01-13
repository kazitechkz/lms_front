import { defineStore } from 'pinia';
import type {RoleRDTO} from "@/data/dto/RoleDTO.ts";

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: [] as RoleRDTO[],
        role: null as RoleRDTO | null,
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        hasRoles: (state) => state.roles.length > 0,
    },

    actions: {
        setRoles(roles: RoleRDTO[]): void {
            this.roles = roles;
        },
        setRole(role: RoleRDTO | null): void {
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