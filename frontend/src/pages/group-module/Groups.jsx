import React, { useEffect, useState } from 'react'
import './Groups.css'
import axios from 'axios'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes'
import GroupCard from '../../components/group-card/GroupCard'
import { useNavigate } from 'react-router-dom';

const Groups = () => {
    const navigate = useNavigate();
    const [ students, setStudents ] = useState([]);
    const [ groups, setGroups ] = useState([]);
    const [ groupName, setGroupName ] = useState("");
    const [ groupDescription, setGroupDescription ] = useState("");
    const [ student_id, setStudentId ] = useState("");
    const [ group_id, setGroupId ] = useState("");

    const get_groups = async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}/groups/get`);
            setGroups(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const get_all_students = async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}/students/get`);
            /* console.log(response.data); */
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to get students')
        }
    };

    const handleGroupAddStudent = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/groups/add`, {
                group_id: group_id,
                student_id: student_id
            });
            get_groups();
            /* console.log(response.data); */
            /* console.log(response.data); */
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async(e) => {
        /* e.preventDefault(); */
        try {
            const response = await axios.post(`${API_BASE_URL}/groups/create`, {
                name: groupName,
                description: groupDescription
            });
            /* console.log(response.data); */
            setGroupName("");
            setGroupDescription("");
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        get_groups();
        get_all_students();
    }, []);

    
/*     const req = {
        student_id: student_id,
        group_id: group_id
    }
    console.log(req); */

    return (
        <div className='group'>
            <h1>Módulo - Grupos</h1>
            <p>Este módulo permite a criação e gerenciamento de grupos de alunos, facilitando a colaboração e o compartilhamento de trabalhos entre os estudantes.</p>

            <h2>Testes</h2>

            <h2>Grupos cadastrados:</h2>

            <div className='flex flex-wrap overflow-y-scroll'>
                {groups.length > 0 ? (
                    groups.map((group, index) => {
                        return (
                            <GroupCard key={index} group={group} />
                        )
                    })
                ) : (
                    <p className='bad'>Não há gropos cadastrados</p>
                )}
            </div>
            <button className='btn my-2' onClick={()=>document.getElementById('my_modal_4').showModal()}>Adicionar grupo</button>
            <button className='btn mx-2'onClick={()=>document.getElementById('my_modal_5').showModal()}>Adicionar estudantes a um grupo</button>
            <dialog id="my_modal_4" className="modal" >
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className='flex items-center justify-center text-center' onSubmit={handleSubmit}>

                        <div className='w-64'>
                            <h2 className="font-bold text-lg">Adicionar Grupo</h2>
                            <div className=''>
                                <div className="label">
                                    <span className="label-text">Nome do grupo:</span>
                                </div>
                                <input type="text" placeholder="Digite o nome do grupo" className="input input-bordered w-full max-w-xs" onChange={(e) => setGroupName(e.target.value)} />
                            </div>
                            <div className="label">
                                <span className="label-text">Descrição:</span>
                            </div>
                            <textarea style={{ resize: 'none'}}  type="text-area" placeholder="Descrição" className="input input-bordered w-full max-w-xs" onChange={(e) => setGroupDescription(e.target.value)} />
                            <br/>
                            <button type='submit' className="btn my-4" onClick={handleSubmit}>Criar</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <dialog id="my_modal_5" className="modal" >
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className='' onSubmit={handleGroupAddStudent}>

                        <div className=''>
                            <h2>Selecione um estudante</h2>
                            {students.length > 0 ? (
                                students.map((student, index) => {
                                    return (
                                        <div className='form-control'>
                                            <label className="label cursor-pointer">
                                            <span className="label-text">{student.name}</span> 
                                            <input 
                                                key={index}
                                                type="radio" 
                                                className="radio checked:bg-red-500" 
                                                onChange={e => setStudentId(e.target.value)}
                                                name='student'
                                                value={student._id} 
                                            />
                                            </label>
                                        </div>
                                    )
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                        <h2>Selecione um grupo</h2>
                        <div>
                            {groups.length > 0 ? (
                                groups.map((group, index) => {
                                    return (
                                        <div className='form-control'>
                                            <label className="label cursor-pointer">
                                            <span className="label-text">{group.name}</span> 
                                            <input 
                                                key={index}
                                                type="radio" 
                                                className="radio checked:bg-red-500" 
                                                value={group._id}
                                                name='group'
                                                onChange={e => {
                                                    setGroupId(e.target.value);
                                                }}
                                                />
                                            </label>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>Não há grupos cadastrados.</p>
                            )}
                        </div>
                        <button type='submit' className="btn my-4">Criar</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Groups