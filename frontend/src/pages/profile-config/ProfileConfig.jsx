import React, { useEffect, useState } from 'react'
import NavBarDashboardAluno from '../../components/navbar/NavBarDashboardAluno'
import Alert from '../../components/alert/Alert';
import axiosInstance from '../../axios/AxiosInstance'
import { useAuth } from '../../context/AuthContext';

const ProfileConfig = () => {
  const { user } = useAuth();
  const [ email, setEmail ] = useState(user.email);
  const [ senha, setSenha ] = useState('');
  const [ confirmarSenha, setConfirmarSenha ] = useState('');
  const [ error, setError ] = useState(false);

  const handleEmailChange = async(e) => {
    e.preventDefault();
    console.log(email);
  };

  const handleSenhaChange = async(e) => {
    e.preventDefault();
    if(senha !== confirmarSenha) {
      setError(true);
      return;
    }
    await axiosInstance.post('/aluno/update/password', {
      id: user.id,
      senha: senha
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    if(senha !== confirmarSenha) {
      setError(true);
    } 
    else {
      setError(false);
    }

  }, [senha, confirmarSenha])


  return (
    <div>
        <NavBarDashboardAluno />

        <div className="p-6">
          <h1 className='text-2xl font-bold'>Informações do perfil</h1>
          <div className='grid grid-cols-2 gap-4 mt-6'>
            <div className='flex flex-col items-center'>
              <img className='rounded-full h-72' src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              <div className='mt-6 flex flex-col'>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <button className='btn btn-primary mt-4'>Atlerar Foto</button>
              </div>
            </div>

            <div>
              
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Matricula:</span>
                  </div>
                  <input disabled type="text" value={user.matricula} className="input input-bordered w-full max-w-xs" />
                </label>
                
                <form onSubmit={handleEmailChange}>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Email:</span>
                    </div>
                    <input type="text" 
                      placeholder={email} 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setEmail(e.target.value)}
                    />
                  </label>
                  <button type='submit' className='btn btn-primary mt-4'>Salvar</button>
                </form>
              </div>

              <div className='mt-6'>
                <h2 className='text-xl font-bold'>Alterar Senha</h2>

                <form onSubmit={handleSenhaChange} className='mb-6'>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Nova Senha:</span>
                    </div>
                    <input 
                      type="password" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setSenha(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Confirmar Senha:</span>
                    </div>
                    <input 
                      type="password" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setConfirmarSenha(e.target.value)}
                    />
                  </label>

                  <button type='submit' className='btn btn-primary mt-4'>Alterar Senha</button>
                </form>

                { error ? (<Alert type={'error'} message={'As senhas não conferem'} />) : (<></>)}

                
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileConfig