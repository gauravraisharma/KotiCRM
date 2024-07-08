import axios, { AxiosError, AxiosResponse } from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
    baseURL: apiUrl,
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        if (localStorage.getItem('isTokenReChecked') == 'true') {
            localStorage.setItem('isTokenReChecked', 'false');
        }
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Check if the error is due to token expiration
            let isTokenReChecked = localStorage.getItem('isTokenReChecked');
            if (isTokenReChecked == 'true') {
                window.location.href = '/login'; 
            } else {
                localStorage.setItem('isTokenReChecked', 'true');
            }
        }
        return Promise.reject(error);
    }
);

export interface apiResponse<T> {
    data?: T;
    status: number;
    statusText: string;
}

const responseBody = <T>(response: AxiosResponse<T>): apiResponse<T> => {
    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
    };
};

export { axiosInstance, responseBody };