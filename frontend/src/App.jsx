import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import Groups from './pages/group-module/Groups'
import Students from './pages/students-module/Students'
import ImgPage from './pages/image-module/ImgPage'
import Code from './pages/code-module/Code'
import AdminPanel from './pages/admin-panel/AdminPanel'
import Interpreter from './pages/interpreter-test/Interpreter'
import StudenntDashboard from './pages/student-dashboard/StudentDashboard'
import ProcectDashBoard from './pages/student-dashboard/ProcectDashBoard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/student/dashboard' element={<ProcectDashBoard />} />
            <Route path='/teacher/login' element={<Home />} />
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
