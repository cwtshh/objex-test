import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginAluno from './pages/login/LoginAluno'
import LoginProfessor from './pages/login/LoginProfessor'
import ProtectedRouteProfessor from './components/protected-route/ProtectedRouteProfessor'
import DashboardProfessor from './pages/dashboard/DashboardProfessor'
import ProtectedRouteAluno from './components/protected-route/ProtectedRouteAluno'
import DashboardAluno from './pages/dashboard/DashboardAluno'
import ProfileConfig from './pages/profile-config/ProfileConfig'
import AtividadesProfessor from './pages/atividades/AtividadesProfessor'
import AdicionarAtiviade from './pages/adicionar-atividade/AdicionarAtiviade'
import RespoderAtividade from './pages/responder-atividade/RespoderAtividade'


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
            <Route path='/aluno/dashboard' element={<ProtectedRouteAluno component={DashboardAluno} />}/>
            <Route path='/aluno/perfil' element={<ProtectedRouteAluno component={ProfileConfig} />}/>
            <Route path='/professor/atividades' element={<ProtectedRouteProfessor component={AtividadesProfessor} />}/>
            <Route path='/professor/atividades/adicionar' element={<ProtectedRouteProfessor component={AdicionarAtiviade} />}/>
            <Route path='/aluno/atividade/:id' element={<ProtectedRouteAluno component={RespoderAtividade} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
