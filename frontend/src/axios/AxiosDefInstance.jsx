import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const axiosDefInstance = axios.create({
    baseURL: `${API_BASE_URL}`
});

axiosDefInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('objex@token');
        const user = localStorage.getItem('objex@user');
        console.log(token);
        if(user && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosDefInstance;
 