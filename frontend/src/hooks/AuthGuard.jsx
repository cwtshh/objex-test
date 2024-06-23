import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/Routes";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const loadingStoreData = async() => {
        const storageUser = localStorage.getItem("@Auth:user");
        const storageToken = localStorage.getItem("@Auth:token");
        console.log(`${storageUser} \n${storageToken}`)
        if (storageUser && storageToken) {
            console.log('data');
            setUser(JSON.parse(storageUser));
        }
    };

    useEffect(() => {
        loadingStoreData();
        setLoading(false);
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
            setUser(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            // console.log(error.response.data);
            return error.response.data;
        }
    };

    const logout = () => {
        localStorage.clear();
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