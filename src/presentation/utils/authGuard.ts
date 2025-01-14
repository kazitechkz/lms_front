export function isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Проверка наличия токена
}

export function isAdmin(): boolean {
    const userData = getUserData();
    return userData?.roleId >= 1 && userData?.roleId <= 4;
}

export function isUser(): boolean {
    const userData = getUserData();
    return userData?.roleId === 5;
}

function getUserData() {
    const token = localStorage.getItem('userData');
    try {
        return JSON.parse(token || '{}');
    } catch (e) {
        return null;
    }
}
