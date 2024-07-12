import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`
});

axiosInstance.interceptors.request.use(
    (config) => {
        const AdminToken = localStorage.getItem('objexAuth@token');
        const AlunoToken = localStorage.getItem('objexAuth@Alunotoken');
        if(AdminToken) {
            config.headers.Authorization = `Bearer ${AdminToken}`;
        }
        if(AlunoToken) {
            config.headers.Authorization = `Bearer ${AlunoToken}`;
        }

        if(AlunoToken && AdminToken) {
            console.log("QUE?");
            return Promise.reject('Ambos os tokens estão presentes');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;