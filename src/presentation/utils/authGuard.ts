// src/presentation/utility/authGuard.ts

export function isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken'); // Пример проверки
    return !!token; // Возвращает true, если токен существует
}

export function isAdmin(): boolean {
    const token = localStorage.getItem('userData');
    if (!token) return false;

    try {
        const payload = JSON.parse(token);
        return payload.roleId === 1;
    } catch (e) {
        return false;
    }
}

export function isUser(): boolean {
    const token = localStorage.getItem('userData');
    if (!token) return false;

    try {
        const payload = JSON.parse(token);
        return payload.roleId === 2; // Проверяем, является ли роль user
    } catch (e) {
        return false;
    }
}