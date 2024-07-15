import React, { useEffect, useState } from 'react'
import NavBarDashboardAluno from '../../components/navbar/NavBarDashboardAluno'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/AxiosInstance';

const RespoderAtividade = () => {
    const { id } = useParams();
    const [ atividade, setAtividade ] = useState({});
    const [ code, setCode ] = useState('');

    const get_atividade = async() => {
        await axiosInstance.get(`/atividades/${id}`).then(res => {
            setAtividade(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Tab') { 
          e.preventDefault();
          const start = e.target.selectionStart;
          const end = e.target.selectionEnd;
          console.log(start, end)
          setCode(code.substring(0, start) + '\t' + code.substring(end));
    
          setTimeout(() => {
            e.target.selectionStart = e.target.selectionEnd = start + 1;
          }, 0);
        }
    };

    useEffect(() => {
        get_atividade();
    }, []);

    return (
        <div>
            <NavBarDashboardAluno />
            <div className='p-6'>
                <h1 className='text-2xl font-bold'>{atividade.nome}</h1>

                <div className='mt-6 mb-6'>
                    <p>{atividade.enunciado}</p>
                </div>

                {atividade.type === 'code' ? (

                    <>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Digite seu código aqui:</span>
                            </div>
                            <textarea 
                                className="textarea textarea-bordered h-80"
                                value={code}
                                style={{resize: 'none'}} 
                                onChange={(e) => setCode(e.target.value)} 
                                onKeyDown={handleKeyDown}  
                                rows='10'
                                cols='50'
                            ></textarea>
                        </label>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Output:</span>
                            </div>
                            <textarea 
                                className="textarea textarea-bordered h-24 bg-base-300"
                                readOnly
                                value={'output template'}
                                style={{resize: 'none'}}    
                            ></textarea>
                        </label>
                    </>
                    
                ) : (
                    <></>
                )}

                <button className='btn btn-primary mt-6'>Enviar Resposta</button>
            </div>
            
        </div>
    )
}

export default RespoderAtividade