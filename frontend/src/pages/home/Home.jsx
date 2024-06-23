
import './Home.css'
import { useContext, useState } from 'react';
import ErrorModal from '../../components/error-modal/ErrorModal';
import '../../config/Routes';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../hooks/AuthGuard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [ matricula, setMatricula] = useState('');
  const [ senha, setSenha ] = useState('');
  const { login, signed } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    if(matricula === '' || senha === '') {
      const modal = document.getElementById('my_modal_1');
      modal.showModal();
      return;
    }
    const user = {
      tuition: matricula,
      password: senha
    }
    const response = await login(user);
    // console.log(response);
    if(response) {
      const modal = document.getElementById('my_modal_1');
      modal.showModal();
      return;
    }
    navigate('/student/dashboard');
  }

  return (
    <>
      <Navbar />
      <div className='text-center'>
        <h1>Bem vindo ao ObjeX!</h1>
        <form onSubmit={handleLogin} className='flex justify-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Login</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Matricula" onChange={e => setMatricula(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input type="password" className="grow" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
                </label>
                <div className="card-actions">
                  <button className="btn btn-primary">Logar</button>
                </div>
              </div>
            </div>
        </form>

        <p>Ainda não recebeu seus dados de login?</p>
        <button className="btn">Entre em contato</button>

        <ErrorModal error="Falha ao logar" message="Email ou senha invalidos" />  
      </div>
    </>
  )
}

export default Home