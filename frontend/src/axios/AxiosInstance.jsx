import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`
});

axiosInstance.interceptors.request.use(
    (config) => {
        const AdminToken = localStorage.getItem('objexAuth@token');
        if(AdminToken) {
            config.headers.Authorization = `Bearer ${AdminToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;