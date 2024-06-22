import axios from 'axios';
import '../config/Routes';

export const login_student = async(matricula, senha) => {
    try {
        const response = await axios.post(`${API_URL}/student/login`, {
            matricula,
            senha
        });
        return [response.data, response.status]
    } catch (error) {
        return error;
    }
};

