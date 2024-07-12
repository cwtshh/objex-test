import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAlunoAuth } from '../../context/AlunoAuthContext';

const ProtectedRouteAluno = ({ component: Component }) => {
    const { aluno } = useAlunoAuth();
    return (
        aluno ? <Component /> : <Navigate to='/login/aluno' />
    )
}

export default ProtectedRouteAluno;