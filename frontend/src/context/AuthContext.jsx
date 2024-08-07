import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);
    const [ isReady, setReady ] = useState(false);

    // const validate_token = async(token, role) => {
    //     if(role == 'professor') {
    //         await axios.post(`${API_BASE_URL}/professor/verify`, token).then((res) => {
    //             console.log('token validado com sucesso!');
    //             return true;
    //         }).catch((err) => {
    //             console.log('token inválido!');
    //             return false;
    //         })
    //     }

    // }

    useEffect(() => {
        // const retriver_user = async() => {
        //     const user = localStorage.getItem('objex@user');
        //     const token = localStorage.getItem('objex@token');

        //     if(user && token) {
        //         setUser(JSON.parse(user));
        //         setToken(token);
        //     }
        // };

        // retriver_user();
        const user = localStorage.getItem('objex@user');
        const token = localStorage.getItem('objex@token');

        if(user && token) {
            login(JSON.parse(user), JSON.parse(user).role);
            setUser(JSON.parse(user));
            setToken(token);
        }
        setReady(true);
    }, []);

    const login = async(userData, role) => {
        if(role == 'estudante') {
            console.log('estudante');
            await axios.post(`${API_BASE_URL}/aluno/login`, userData).then((res) => {
                setUser(res.data);
                setToken(res.data.token);
                localStorage.setItem('objex@user', JSON.stringify(res.data));
                localStorage.setItem('objex@token', res.data.token);
            }).catch(err => {
                console.log(err);
            });
        }
        if(role == 'professor') {
            console.log('professor');
            console.log(API_BASE_URL)
            console.log(userData);
            await axios.post(`${API_BASE_URL}/professor/login`, {
                email: userData.email,
                senha: userData.senha
            }).then((res) => {
                setUser(res.data);
                setToken(res.data.token);
                localStorage.setItem('objex@user', JSON.stringify(res.data));
                localStorage.setItem('objex@token', res.data.token);
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('objex@user');
        localStorage.removeItem('objex@token');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {isReady ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;