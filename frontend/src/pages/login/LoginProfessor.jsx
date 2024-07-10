import React, { useEffect, useState } from 'react'
import NavBarProfessor from '../../components/navbar/NavBarProfessor'
import { useProfessorAuth } from '../../context/ProfessorAuthContext';
import { useNavigate } from 'react-router-dom';

const LoginProfessor = () => {
  const [ email, setEmail ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ error, setError ] = useState(null);
  const { login_professor, professor } = useProfessorAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(email === "" || senha === "") {
      setError("Preencha todos os campos");
      alert("Preencha todos os campos");
      return;
    }
    await login_professor(email, senha);
    navigate("/professor/dashboard");
  };

  useEffect(() => {
    if(professor) {
      navigate("/professor/dashboard");
    }
  })

  return (
    <div>
      <NavBarProfessor />

      <div className='p-6 flex items-center justify-center '>
        <div className="card bg-base-100 w-96 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Login - Professor</h2>
              <label className="input input-bordered flex items-center gap-2 mt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" onChange={e => setEmail(e.target.value)} />
              </label>
              <label className="input input-bordered flex items-center gap-2 mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" placeholder='Senha' onChange={e => setSenha(e.target.value)} />
              </label>
              <div className="card-actions">
                <button className="btn btn-primary mt-5">Logar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginProfessor