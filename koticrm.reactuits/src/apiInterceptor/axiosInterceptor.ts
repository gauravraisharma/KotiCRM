import axios, { AxiosError , AxiosResponse} from 'axios';
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
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export interface apiResponse<T> {
    data?: T;
    status: number;
    statusText: string;
}
const responseBody = <T>(response: AxiosResponse<T>):apiResponse<T> => {
    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
    };
};
export {axiosInstance,responseBody};
