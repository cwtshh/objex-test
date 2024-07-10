import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useProfessorAuth } from '../../context/ProfessorAuthContext'

const ProtectedRouteProfessor = ({ component: Component }) => {
    const { professor } = useProfessorAuth();
    return (
        professor ? <Component /> : <Navigate to='/login/professor' />
    )
}

export default ProtectedRouteProfessor