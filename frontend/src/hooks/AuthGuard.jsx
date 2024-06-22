import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/Routes";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadStoreData = async() => {

        const storedUser = localStorage.getItem('@Auth:user');
        const storedToken = localStorage.getItem('@Auth:token');

        if(storedUser && storedToken) {
            setUser({
                user: JSON.parse(storedUser),
                token: storedToken
            });
        }
    }
    useEffect(() => {
        loadStoreData();
    
    }, []);
    const login = async({tuition, password}) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/students/login`, {
                'tuition': tuition,
                'password': password
            });
            if(response.data.error) {
                return 'invalid credentials';
            }
            localStorage.setItem('@Auth:user', JSON.stringify(response.data.user));
            localStorage.setItem('@Auth:token', response.data.token);
            setUser({
                user: response.data.user,
                token: response.data.token
            });
        } catch (error) {
            // console.log(error.response.data);
            return error.response.data;
        }
        
        
    };

    const logout = () => {
        localStorage.removeItem('@Auth:user');
        localStorage.removeItem('@Auth:token');
        setUser(null);
        <Navigate to='/' />
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            signed: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);