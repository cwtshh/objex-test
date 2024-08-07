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
        <h1 className='text-2xl font-bold'>Dashboard - Aluno</h1>
        <h3>Bem vindo, {user.nome}!</h3>

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