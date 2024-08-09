import React from 'react'
import NavBarDashboardAluno from '../../components/navbar/NavBarDashboardAluno'
import { useAlunoAuth } from '../../context/AlunoAuthContext'
import axiosInstance from '../../axios/AxiosInstance';
import { useEffect, useState } from 'react';
import Alert from '../../components/alert/Alert';
import GroupCard from '../../components/groupcard/GroupCard';
import AtividadeCard from '../../components/atividade-card/AtividadeCard';
import AtividadeCardAluno from '../../components/atividade-card/AtividadeCardAluno';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axiosDefInstance from '../../axios/AxiosDefInstance';
import GrouCardAluo from '../../components/groupcard/GrouCardAluo';
import LinhaDisciplina from '../../components/linha-disciplina/LinhaDisciplina';

const DashboardAluno = () => {
  const { user } = useAuth();
  const [ groups, setGroups ] = useState([]);
  const [ atividades, setAtividades ] = useState([]);


  const get_grupos = async() => {
    await axiosDefInstance.get('/grupo/get-all').then(res => {
      setGroups(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const get_atividades = async() => {
    await axiosDefInstance.get('/atividades/').then(res => {
      setAtividades(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    get_grupos();
    get_atividades();
  }, [])
  return (
    <div>
      <NavBarDashboardAluno />

      <div className='p-6'>

        <div className='flex'>
          
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><Link to='/aluno/notas'>Notas</Link></li>
            </ul>
          </div>

          <div className='ml-6'>
            <h1 className='text-2xl font-bold'>Dashboard - Aluno</h1>
            <h3>Bem vindo, {user.nome}!</h3>   
          </div>


        </div>
        

        <h2 className='mt-6 text-xl font-bold'>Andamento da Disciplina</h2>
        
        <LinhaDisciplina />

        <h2 className="mt-6 text-xl font-bold">Atividades</h2>

        

        <div className='mt-6 flex gap-4'>
          {atividades.length === 0 ? (
            <Alert type={'error'} message={"Não há atividades cadastradas"} />
          ) : (
            atividades.map((atividade, index) => {
              return (
                <AtividadeCardAluno key={index} props={atividade} />
              )
            })
          )}
        </div>


        <h2 className="mt-6 text-xl font-bold">Grupos Disponíveis</h2>

        <div className='mt-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 h-96 overflow-scroll'>
            {groups.length === 0 ? (
              <Alert type={"error"} message={"Não há grupos cadastrados"} />
            ) : (
              groups.map((group, index) => {
                return (
                  <GrouCardAluo key={index} group={group} triggerReload={get_grupos} />
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAluno