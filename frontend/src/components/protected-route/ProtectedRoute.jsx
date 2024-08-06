import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles, ...rest}) => {
    const { user } = useAuth();
    return (
        user && roles.includes(user.role) ? <Component {...rest} /> : <Navigate to='/login/aluno' />
    )
}

export default ProtectedRoute;