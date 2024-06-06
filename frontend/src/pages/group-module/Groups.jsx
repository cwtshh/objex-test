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

    const handleGroupAddStudent = async() => {
        try {
            const response = await axios.post(`${API_BASE_URL}/groups/add`, {
                group_id: group_id,
                student_id: student_id
            });
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

            <div className='group-cards'>
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

            <h2>Adicionar grupo:</h2>
            <form className='create-group-form' onSubmit={handleSubmit}>
                <label>Nome do grupo:</label>
                <input type='text' placeholder='Nome do grupo' onChange={e => setGroupName(e.target.value)} />
                <label>Descrição:</label>
                <input type='text' placeholder='Descrição do grupo' onChange={e => setGroupDescription(e.target.value)} />
                <button type='submit'>Criar</button>
            </form>
            <h2>Adicionar estudantes a um grupo:</h2>
            <form className='add-student-group-form' onSubmit={handleGroupAddStudent}>
                <h3>Selecione um estudante</h3>
                <div className='radio-buttons'>
                    {students.length > 0 ? (
                        students.map((student, index) => {
                            return (
                                <>
                                    <input 
                                        type='radio' 
                                        key={index} 
                                        value={student._id} 
                                        name='student'
                                        onChange={e => setStudentId(e.target.value)}
                                    /> <p>{student.name}</p>
                                </>
                            )
                        })
                    ) : (
                        <>
                            <h3 className='bad'>Não há estudantes cadastrados!</h3>
                            <button>Cadastrar estudantes</button>
                        </>
                    )}
                </div>
                <h3>Selecione um grupo</h3>
                <div className='radio-buttons'>
                    {groups.map((group, index) => {
                        return (
                            <>
                                <input 
                                    type='radio'
                                    key={index}
                                    value={group._id}
                                    name='group'
                                    onChange={e => {
                                        setGroupId(e.target.value);
                                    }}
                                />{group.name}
                            </>
                        )
                    })}
                </div>
                <button type='submit'>Adicionar</button>
            </form>
        </div>
    )
}

export default Groups