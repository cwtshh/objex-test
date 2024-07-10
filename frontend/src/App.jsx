import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginAluno from './pages/login/LoginAluno'
import LoginProfessor from './pages/login/LoginProfessor'
import ProtectedRouteProfessor from './components/protected-route/ProtectedRouteProfessor'
import DashboardProfessor from './pages/dashboard/DashboardProfessor'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/login/aluno' />}/>
            <Route path='/login/aluno' element={<LoginAluno />}/>
            <Route path='/login/professor' element={<LoginProfessor />}/>
            <Route path='/professor/dashboard' element={<ProtectedRouteProfessor component={DashboardProfessor} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
