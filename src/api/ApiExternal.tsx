import axios, {AxiosResponse} from "axios";
import {baseUrl} from "./ApiEnv";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const postChangeProductsNumber = async (number: string):
    Promise<AxiosResponse<SupplierTypeSchema>> => {
    return await axiosInstance.post(`/external/${number}`);
};
