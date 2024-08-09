import React, { useEffect, useState } from 'react'
import NavBarDashboardAluno from '../../components/navbar/NavBarDashboardAluno'
import axiosDefInstance from '../../axios/AxiosDefInstance';
import NotasCard from '../../components/notas-card/NotasCard';


const Notas = () => {

  const [ atividades, setAtividades ] = useState([]);

  const get_atividades = async() => {
    await axiosDefInstance.get('/atividades/').then(res => {
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
        <NavBarDashboardAluno />
        <div className='p-6'>
          <h1 className='text-2xl font-bold'>Notas - (Feedback)</h1>
          <h3 className='mt-6 text-xl'>Atividades</h3>
          <div className='grid grid-cols-1 gap-4 mt-6'>
            {atividades.map((atividade, index) => {
              return (
                <NotasCard key={index} atividade={atividade} />
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default Notas