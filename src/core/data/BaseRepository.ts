import type { AxiosError } from "axios";
import type { DataError } from "../domain/DataError";
import type CustomAxios from "../utility/customAxios";

export class BaseRepository {
    public axios;

    constructor({ axios }: { axios: CustomAxios }) {
        this.axios = axios;
    };

    handleErrors(error: AxiosError | any): DataError {
        if (error.response) {
            const { status, data } = error.response;

            if (status >= 401 && status <= 403) {
                return { kind: 'AuthenticationError', error: new Error('Token has expired, kindly login again') };
            }

            if (data?.errors) {
                return { kind: 'ErrorFold', error: data.errors };
            }

            if (data?.error) {
                return { kind: 'ServerError', error: new Error(data.error), errorCode: status };
            }
        } else if (error.request) {
            return { kind: 'UnexpectedError', error: new Error('Unexpected error occurred') };
        }

        return { kind: 'UnexpectedError', error: new Error(error.message || 'Unknown error occurred') };
    }
}