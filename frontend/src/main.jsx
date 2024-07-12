import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProfessorAuthProvider } from './context/ProfessorAuthContext.jsx'
import { AlunoAuthProvider } from './context/AlunoAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfessorAuthProvider>
      <AlunoAuthProvider>
        <App />
      </AlunoAuthProvider>
    </ProfessorAuthProvider>
  </React.StrictMode>,
)
