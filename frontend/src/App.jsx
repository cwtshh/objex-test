import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import StudenntDashboard from './pages/student-dashboard/StudentDashboard'
import TeacherLogin from './pages/teacher-login/TeacherLogin'
import { AuthContext } from './hooks/AuthGuard'


function App() {
  const { signed } = useContext(AuthContext);

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/student/dashboard' element={signed ? <StudenntDashboard /> : <Navigate to='/' />} />
            {/* // <Route path='/student/dashboard' element={<ProcectDashBoard />} /> */}
            <Route path='/teacher/login' element={<TeacherLogin />} />
            
            {/* <Route path='/groups' element={<Groups />} />
            <Route path='/students' element={<Students />} />
            <Route path='/image' element={<ImgPage />} />
            <Route path='/code' element={<Code />} />
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/interpreter' element={<Interpreter />} /> */}
          </Routes>
        </BrowserRouter>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App
