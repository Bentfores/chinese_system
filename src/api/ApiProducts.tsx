import axios, {AxiosResponse} from "axios";
import {baseUrl} from "./ApiEnv";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const getProducts = async (status: string):
    Promise<AxiosResponse<ProductTypeSchema>> => {
    return await axiosInstance.get(`/products/${status}`);
};

export const changeProductsStatus = async (articles: string[], status: string):
    Promise<AxiosResponse<ApiProductDataType>> => {
    return await axiosInstance.put(`/products/${status}`, {
        articles: articles,
    });
};



export const getProductSuppliers = async (article: string):
    Promise<AxiosResponse<SupplierTypeSchema>> => {
    return await axiosInstance.get(`/products/${article}`);
};