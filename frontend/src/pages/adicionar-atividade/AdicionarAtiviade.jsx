import React, { useState } from 'react'
import NavBarDashboardProfessor from '../../components/navbar/NavBarDashboardProfessor'
import { useProfessorAuth } from '../../context/ProfessorAuthContext';
import axiosIntance from '../../axios/AxiosInstance'
import { useAuth } from '../../context/AuthContext';
import axiosDefInstance from '../../axios/AxiosDefInstance';

const AdicionarAtiviade = () => {
    const { user } = useAuth();
    const [ tituloAtividade, setTituloAtividade ] = useState('');
    const [ dataEntrega, setDataEntrega ] = useState('');
    const [ enunciado, setEnunciado ] = useState('');
    const [ type, setType ] = useState();

    const tipos = ['code', 'file', 'text'];

    const handleCriarAtividade = async(e) => {
        e.preventDefault();
        const atividade = {
            nome: tituloAtividade,
            dataEntrega,
            enunciado,
            professor_id: user.id,
            turma: user.turma,
            type: type
        };
        console.log(atividade);
        await axiosDefInstance.post('/professor/create/atividade', atividade).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };
    return (
        <div>
            <NavBarDashboardProfessor />
            
            <div className='p-6 flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>Adicionar Atividade</h1>
                
                <form onSubmit={handleCriarAtividade} className=''>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Título da Atividade:</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs"
                            onChange={e => setTituloAtividade(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Data de Entrega:</span>
                        </div>
                        <input 
                            type="date" 
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs"
                            onChange={e => setDataEntrega(e.target.value)}
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Enunciado:</span>
                        </div>
                        <textarea 
                            style={{resize: 'none'}}
                            onChange={e => setEnunciado(e.target.value)}
                            className="textarea textarea-bordered h-80 w-96" 
                            ></textarea>
                    </label>



                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Tipo de Atividade:</span>
                    </div>
                    <select className="select select-bordered" onChange={e => setType(e.target.value)}>
                        <option disabled selected>Selecione o tipo de Atividade</option>
                        {tipos.map((tipo, index) => {
                            return <option key={index} value={tipo}>{tipo}</option>
                        })}
                    </select>
                    </label>
                    <button type='submit' className='btn btn-primary mt-6 text-center'>Adicionar Atividade</button>
                </form>
            </div>
        </div>
    )
}

export default AdicionarAtiviade