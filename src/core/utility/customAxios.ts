import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { NetworkConstants } from './NetworkConstants';
import router from "@/presentation/router";
import {useToast} from "vue-toast-notification";

export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
}

class CustomAxios {
    private readonly axiosInstance: AxiosInstance;
    public toast = useToast({position: "top-right"});

    constructor({ token }: { token?: string | null } = {}) {
        this.axiosInstance = axios.create({
            baseURL: NetworkConstants.BASE_URL,
            timeout: 5000,
        });

        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                const token = localStorage.getItem('authToken')?.replace(/^"|"$/g, ''); // Получаем токен из localStorage
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // Handle any request errors here
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Handle any successful response data here
                return response;
            },
            (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        // Remove the token from localStorage
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('userData');
                        // Redirect to the login page or perform necessary actions
                        router.push('/login');
                    }
                    if (error.response.status === 403) {
                        if (error.response.data.detail) {
                            this.toast.error(error.response.data.detail)
                        }
                        router.push({name: 'NotFound'});
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
                return Promise.reject(error);

            }
        );
    }

    get(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.get(url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post(url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put(url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.patch(url, data, config);
    }

    delete(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete(url, config);
    }

    getInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

export default CustomAxios;