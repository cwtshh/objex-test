import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosDefInstance from '../../axios/AxiosDefInstance';

const GrouCardAluo = ({group, triggerReload}) => {
    const { user } = useAuth();
    const [ success, setSuccess ] = useState(null);
    const [ membrosGrupo, setMemborsGrupo ] = useState([]);
    const handleEnterGroup = async() => {
        console.log('entrando');
        await axiosDefInstance.patch('/aluno/entrar/grupo', {
            id: user.id,
            grupo_id: group._id
        }).then(res => {
            console.log(res.data);
            setSuccess(true);
            triggerReload();
        }).catch(err => {
            console.log(err);
            setSuccess(false);
        })
    };

    const handleSairGrupo = async() => {
        console.log('saindo');
        await axiosDefInstance.patch('/aluno/sair/grupo', {
            id: user.id,
            grupo_id: group._id
        }).then(res => {
            console.log(res.data);
            setSuccess(true);
            triggerReload()
        }).catch(err => {
            console.log(err);
            setSuccess(false);
        })
    }

    const getMembros = async() => {
        let users = [];
        console.log('getting membros');
        group.membros.map(async(membro) => {
            await axiosDefInstance.get(`/aluno/${membro}`).then(res => {
                users.push(res.data.nome);
                // console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        })
        console.log(users);
        setMemborsGrupo(users);
        console.log(membrosGrupo);
    }


    useEffect(() => {
        getMembros();
    }, []);

    
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{group.nome}</h2>
                <textarea 
                    className='textarea textarea-bordered h-48' 
                    readOnly value={group.descricao} 
                    style={{ resize: 'none'}} 
                />
                <p>Turma: {group.turma}</p>
                
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">Ver Membros</div>
                    <div
                        tabIndex={0}
                        className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-64 p-2 shadow">
                        <div className="card-body">
                            {membrosGrupo.map((membro, index) => {
                                return (
                                    <p key={index}>{membro}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="card-actions">

                {group.membros.includes(user.id) ? (
                    <>
                        <button className="btn btn-primary" onClick={() => handleSairGrupo()}>Sair do Grupo</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary" onClick={() => handleEnterGroup()}>Entrar no Grupo</button>
                    </>
                )}

                {/* <button className="btn btn-primary">Entrar no Grupo</button> */}
                </div>
            </div>
        </div>
    )
}

export default GrouCardAluo