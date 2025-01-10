import { defineStore } from 'pinia';
import type {User} from "@/domain/entities/User.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isLoading: false,
        error: null as string | null
    }),

    getters: {
        hasUser: (state) => state.user,
    },

    actions: {
        initAuth(response: any) {
            // Сохранение токена в localStorage
            localStorage.setItem('authToken', JSON.stringify(response.accessToken));
            localStorage.setItem('userData', JSON.stringify(response.user));

            // Установка текущего пользователя (если нужно)
            this.user = response.user;
        },
        setLoading(isLoading: boolean): void {
            this.isLoading = isLoading;
        },
        setError(error: string | null): void {
            this.error = error;
        },
        resetState(): void {
            this.user = null;
            this.isLoading = false;
            this.error = null;
        },
    },
});

export type AuthStore = Omit<
    ReturnType<typeof useAuthStore>,
    keyof ReturnType<typeof defineStore>
>;