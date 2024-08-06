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

  // useEffect(() => {
  //   get_grupos();
  //   get_atividades();
  // }, [])
  return (
    <div>
      <NavBarDashboardAluno />

      <div className='p-6'>
        <h1 className='text-2xl font-bold'>Dashboard - Aluno</h1>
        <h3>Bem vindo, {user.nome}!</h3>

        <h2 className='mt-6 text-xl font-bold'>Andamento da Disciplina</h2>
        
        <ul className="timeline">
          <li>
            <div className="timeline-start">10/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Início das Aulas</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">12/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Apresentação</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">16/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Coneitos</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">16/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Trabalho 1</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">16/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Trabalho 2</div>
          </li>

          <li>
            <hr />
            <div className="timeline-start">16/04/2025</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Prova</div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-bold">Atividades</h2>

        

        <div className='mt-6'>
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
                  <GroupCard key={index} group={group} />
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