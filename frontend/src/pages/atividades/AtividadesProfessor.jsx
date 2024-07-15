import React, { useEffect, useState } from 'react'
import NavBarDashboardProfessor from '../../components/navbar/NavBarDashboardProfessor'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios/AxiosInstance';
import axios from 'axios';
import AtividadeCard from '../../components/atividade-card/AtividadeCard';

const AtividadesProfessor = () => {
  const navigate = useNavigate();
  const [ atividades, setAtividades ] = useState([]);

  const get_atividades = async() => {
    await axiosInstance.get('/atividades').then(res => {
      setAtividades(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    get_atividades();
  }, []);
  return (
    <div>
        <NavBarDashboardProfessor />

        <div className='p-6'>
          <h1 className='text-2xl font-bold'>Atividades</h1>
          
          <button onClick={() => navigate('/professor/atividades/adicionar')} className='btn btn-primary mt-6'>Adicionar Atividade</button>

          <h2 className='text-xl font-bold mt-6'>Ultimas atividades</h2>
          <div>
            {atividades.map((atividade, index) => {
              return (
                <AtividadeCard key={index} props={atividade} />
              )
            })}
          </div>


        </div>
    </div>
  )
}

export default AtividadesProfessor