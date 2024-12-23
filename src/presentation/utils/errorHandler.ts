// src/data/utility/errorHandler.ts
export function handleServerError(error: any): never {
    if (error.response) {
        throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
        throw new Error('Network Error: Failed to connect to server');
    } else {
        throw new Error(`Error: ${error.message}`);
    }
}
