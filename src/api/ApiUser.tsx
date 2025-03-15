// export const authorizeUser = async (username: string, password: string) => {
// 	const keycloakUrl = "http://localhost:8443/realms/local/protocol/openid-connect/token";
// 	const clientId = "frontend-app"; // Замените на свой clientId
//
// 	const data = new URLSearchParams();
// 	data.append("grant_type", "password");
// 	data.append("client_id", clientId);
// 	data.append("username", username);
// 	data.append("password", password);
//
// 	try {
// 		const response = await fetch(keycloakUrl, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/x-www-form-urlencoded",
// 			},
// 			body: data,
// 		});
//
// 		if (!response.ok) {
// 			throw new Error("Неверный логин или пароль");
// 		}
//
// 		const result = await response.json();
// 		return result; // Включает access_token
// 	} catch (error) {
// 		console.error("Ошибка авторизации:", error);
// 		throw error;
// 	}
// };


import {baseUrl} from "./ApiEnv";
import axios, {AxiosResponse} from "axios";

const usersPrefix = "auth"

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

export const authorizeUser = async (
	email: string,
	password: string,
): Promise<AxiosResponse<ApiTokenDataType>> => {
	return await axios.post(
		baseUrl, {
			e_mail: email,
			hash_password: password
		}
	)
}