// src/presentation/utility/authGuard.ts

export function isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token'); // Пример проверки
    return !!token; // Возвращает true, если токен существует
}