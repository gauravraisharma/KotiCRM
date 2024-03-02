import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7063/api',
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
  
export default axiosInstance;
