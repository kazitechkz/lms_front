import type { AxiosError } from "axios";
import type {DataError, ValidationError} from "../domain/DataError";
import type CustomAxios from "../utility/customAxios";
import {useToast} from "vue-toast-notification";

export class BaseRepository {
    public axios;
    public toast = useToast({position: "top-right"});

    constructor({ axios }: { axios: CustomAxios }) {
        this.axios = axios;
    };

    handleErrors(error: AxiosError | any): DataError {
        if (error.response) {
            const { status, data } = error.response;

            if (status >= 401 && status <= 403) {
                return { kind: 'AuthenticationError', error: new Error('Token has expired, kindly login again') };
            }

            if (status == 400) {
                if (data.detail.message) {
                    this.toast.error(data.detail.message)
                }
                return { kind: 'ValidationError', error: new Error(data.detail.message ? data.detail.message : '') };
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