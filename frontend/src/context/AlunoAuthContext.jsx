import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../util/constants";


const AlunoAuthContext = createContext();

export const AlunoAuthProvider = ({ children }) => {
    const [ aluno, setAluno ] = useState(null);
    const [ token, setToken ] = useState(null);

    useEffect(() => {
        const retrive_aluno_data = async() => {
            const aluno = localStorage.getItem("objexAuth@Aluno");
            const token = localStorage.getItem("objexAuth@Alunotoken");
            if(aluno && token) {
                setAluno(JSON.parse(aluno));
                setToken(token);
            }
        };
        retrive_aluno_data();
    }, []);
    
    const login_aluno = async(matricula, senha) => {
        await axios.post(`${API_BASE_URL}/aluno/login`, {
            matricula,
            senha
        }).then(res => {
            setAluno(res.data);
            setToken(res.data.token);
            localStorage.setItem("objexAuth@Aluno", JSON.stringify(res.data));
            localStorage.setItem("objexAuth@Alunotoken", res.data.token);
        }).catch(err => {
            console.log(err);
        });
    };

    const logout_aluno = () => {
        setAluno(null);
        setToken(null);
        localStorage.removeItem("objexAuth@Aluno");
        localStorage.removeItem("objexAuth@Alunotoken");
    };

    return (
        <AlunoAuthContext.Provider value={{
            aluno,
            token,
            login_aluno,
            logout_aluno
        }}>
            {children}
        </AlunoAuthContext.Provider>
    )
};

export const useAlunoAuth = () => useContext(AlunoAuthContext);

export default AlunoAuthContext;


