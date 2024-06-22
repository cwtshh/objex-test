import React, { useContext } from 'react'
import StudentDashboard from './StudentDashboard';
import { Navigate, useNavigate } from 'react-router-dom';


import { AuthContext } from '../../hooks/AuthGuard';
const ProcectDashBoard = () => {
    const navigate = useNavigate();
    const { signed } = useContext(AuthContext);
  return signed ? <StudentDashboard /> : <Navigate to='/' />
}

export default ProcectDashBoard