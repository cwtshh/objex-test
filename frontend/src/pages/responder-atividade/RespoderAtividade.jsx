import React, { useEffect, useState } from 'react'
import NavBarDashboardAluno from '../../components/navbar/NavBarDashboardAluno'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/AxiosInstance';
import axiosDefInstance from '../../axios/AxiosDefInstance';
import { API_BASE_URL, API_CODE_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/alert/Alert';

const RespoderAtividade = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [ atividade, setAtividade ] = useState({});
    const [ code, setCode ] = useState('');
    const [ codeOutput, setCodeOutput ] = useState('');
    const [ file, setFile ] = useState(null);
    const [ sent, setSent ] = useState(null);

    const get_atividade = async() => {
        await axiosDefInstance.get(`/atividades/${id}`).then(res => {
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(atividade.type === 'code') {
            await axiosDefInstance.post(`${API_CODE_BASE_URL}/run`, { code }).then((res) => {
                if(res.data.error) {
                    setCodeOutput(res.data.error);
                    return;
                }
                setCodeOutput(res.data.output);
            }).catch(err => {
                console.log('a');
            })
        }

        if(atividade.type === 'file') {
            console.log('file');
            const form = new FormData();
            form.append('file', file);
            form.append('atividade', atividade._id);
            form.append('aluno', user.id);
            
            await axiosDefInstance.postForm(`${API_BASE_URL}/aluno/responder/imagem`, form).then(res => {
                console.log(res);
            })
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

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

                    <form>
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
                                className="textarea textarea-bordered h-32 bg-base-300"
                                readOnly
                                value={codeOutput}
                                style={{resize: 'none'}}    
                            ></textarea>
                        </label>

                        <button className='btn btn-primary mt-6' onClick={handleSubmit}>Enviar Resposta</button>
                    </form>
                    
                ) : (
                    <></>
                )}

                {atividade.type === 'file' ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-bold">Selecione o arquivo que deseja enviar</span>
                                </div>
                                <input 
                                    type="file" 
                                    className="file-input file-input-bordered w-full max-w-xs" 
                                    onChange={handleFileChange}    
                                />
                            </label>

                            <button type='submit' className='btn btn-primary mt-6'>Enviar Arquivo</button>
                        </form>
                    </>
                ) : (<></>)}

                {/* <button className='btn btn-primary mt-6' onClick={handleSubmit}>Enviar Resposta</button> */}

                {sent ? (
                    <>
                        <Alert type='success' message='Resposta enviada com sucesso' />
                    </>
                ) : (
                    <></>
                )}
            </div>
            
        </div>
    )
}

export default RespoderAtividade