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

export const getSuppliersInfo = async (article: string):
    Promise<AxiosResponse<SupplierTypeSchema>> => {
    return await axiosInstance.get(`/analysis/suppliers/${article}`);
};

export const postSearchSuppliers = async (article: string):
    Promise<AxiosResponse<ApiSupplierDataType>> => {
    return await axiosInstance.post(`/analysis/search/${article}`);
};

export const postSendMessage = async (productUrl: string, supplierId: string, article: string):
    Promise<AxiosResponse<ApiSupplierDataType>> => {
    return await axiosInstance.post(`/analysis/message`, { productUrl, supplierId, article }, {
        headers: { "Content-Type": "application/json" },
        paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
        }
    });
};
