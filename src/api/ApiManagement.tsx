import axios, {AxiosResponse} from "axios";
import {baseUrl} from "./ApiEnv";

const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.interceptors.request.use(config => {
    // config.withCredentials = true;
    return config;
}, error => {
    return Promise.reject(error);
});

export const getProducts = async (status: string):
    Promise<AxiosResponse<ProductTypeSchema>> => {
    return await axiosInstance.get(`management/products/${status}`);
};

export const getSuppliers = async (statuses: string[]):
    Promise<AxiosResponse<BlackListSupplierTypeSchema>> => {
    return await axiosInstance.get(`management/suppliers`, {
        params: { statuses },
        paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
        }
    });
};

export const changeProductsStatus = async (articles: string[], status: string):
    Promise<AxiosResponse<ApiProductDataType>> => {
    return await axiosInstance.patch(`management/products/${status}`, null, {
        params: { articles },
        paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
        }
    });
};

export const changeSuppliersStatus = async (
    suppliers: string[],
    status: string,
    article: string | null,
    comment: string | null,
): Promise<AxiosResponse<ApiSupplierDataType>> => {
    const params: Record<string, any> = { suppliers };
    if (article !== null && article !== "null") {
        params.article = article;
    }
    if (comment !== null && comment !== "null") {
        params.comment = comment;
    }

    return await axiosInstance.patch(`management/suppliers/${status}`, null, {
        params,
        paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
        }
    });
};

