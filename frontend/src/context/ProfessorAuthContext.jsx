import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../util/constants";
import axios from "axios";


const ProfessorAuthContext = createContext();

export const ProfessorAuthProvider = ({ children }) => {
    const [ professor, setProfessor ] = useState(null);
    const [ token, setToken ] = useState(null);

    const verify_token = async(token) => {
        await axios.post(`${API_BASE_URL}/professor/verify`, {
            token
        }).then(res => {
            if(res.data.message === 'Token válido') {
                return true;
            }
            return false;
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        const retrive_professor_data = async() => {
            const professor = localStorage.getItem("objexAuth@professor");
            const token = localStorage.getItem("objexAuth@token");
            if(professor && token) {
                if(await verify_token(token) == false) {
                    localStorage.removeItem("objexAuth@professor");
                    localStorage.removeItem("objexAuth@token");
                    return;
                }
                setProfessor(JSON.parse(professor));
                setToken(token);
            }
        };
        retrive_professor_data();
    }, [])

    const login_professor = async(email, senha) => {
        await axios.post(`${API_BASE_URL}/professor/login`, {
            email,
            senha
        }).then(res => {
            const professor = {
                id: res.data.id,
                nome: res.data.nome,
                email: res.data.email
            }
            localStorage.setItem("objexAuth@professor", JSON.stringify(professor));
            localStorage.setItem("objexAuth@token", res.data.token);
            setProfessor(professor);
            setToken(res.data.token);
        }).catch(err => {
            console.log(err);
        });
    };

    const logout = () => {
        localStorage.removeItem("objexAuth@professor");
        localStorage.removeItem("objexAuth@token");
        setProfessor(null);
        setToken(null);
    };

    return (
        <ProfessorAuthContext.Provider value={
            {
                professor,
                token,
                login_professor,
                logout
            
            }
        }>
            {children}
        </ProfessorAuthContext.Provider>
    )
};

export const useProfessorAuth = () => useContext(ProfessorAuthContext);

export default ProfessorAuthContext;