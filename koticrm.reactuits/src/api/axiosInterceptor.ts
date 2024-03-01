import axios, { AxiosError } from 'axios';
import LocalStorageService from '../services/storage/localStorageService';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7063/api',
});

// LocalStorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
