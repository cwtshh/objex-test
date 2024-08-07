import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBarDashboardProfessor from '../../components/navbar/NavBarDashboardProfessor';
import axiosDefInstance from '../../axios/AxiosDefInstance';
import Alert from '../../components/alert/Alert';

const EditarAtividade = () => {
    const [ atividade, setAtividade ] = useState({});
    const [ casosTeste, setCasosTeste ] = useState([]);
    const {id} = useParams();
    console.log(id);
    const get_atividade = async() => {
        await axiosDefInstance.get(`/atividades/${id}`).then(res => {
            console.log(res.data);
            setAtividade(res.data);
        }).catch(err => {
            console.log(err);
        });
    };
    useEffect(() => {
        get_atividade();
    }, []);

    return (
        <div>
            <NavBarDashboardProfessor />
            <div className='p-6'>
                <h1 className='text-2xl font-bold'>Editar Atividade</h1>

                <div className='mt-9'>
                    <h2 className='text-xl font-bold'>{atividade.nome}</h2>

                    {/* <h3 className='mt-5 mb-4'>Enunciado:</h3> */}

                    <p className='mt-5'>{atividade.enunciado}</p>


                    <h2 className='text-xl font-bold mt-6 mb-6'>Casos de Teste</h2>

                    <div>
                        {casosTeste.length > 0 ? (<p>TESTE</p>) : (<Alert message={"Não há casos de teste para esta atividade"} type={"error"} />)}
                        
                    </div>

                    <button className='btn btn-primary mt-6'>Cadastrar Testes</button>
                </div>
            </div>
        </div>
    )
}

export default EditarAtividade