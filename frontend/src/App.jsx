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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/groups' element={<Groups />} />
            <Route path='/students' element={<Students />} />
            <Route path='/image' element={<ImgPage />} />
            <Route path='/code' element={<Code />} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
