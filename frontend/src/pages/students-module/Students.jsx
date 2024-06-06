import React, { useCallback, useEffect, useState } from 'react'
import './Students.css'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes';
import axios from 'axios';
import StudentsCard from '../../components/student-card/StudentsCard';

const Students = () => {
    const [ students, setStudents ] = useState([]);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ tuition, setTuition ] = useState('');
    const [ loginTuition, setLoginTuition ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');
    const [ loggedStudent, setLoggedStudent ] = useState({});
    const [ isLogged, setIsLogged ] = useState(false);
    /* const [ searchText, setSearchText ] = useState(''); */
    const [ filteredStudents, setFilteredStudents ] = useState([]);

    const get_all_students = async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}/students/get`);
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error('Failed to get students')
        }
    };
    const handleSubmit = async(e) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/students/register`, {
                name: name,
                email: email,
                password: password,
                tuition: tuition
            });
            setLoggedStudent(response.data);

            /* console.log(response.data); */
        } catch (error) {
            console.error('Failed to create student');
        }
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            console.log(loginTuition, loginPassword)
            const response = await axios.post(`${API_BASE_URL}/students/login`, {
                tuition: loginTuition,
                password: loginPassword
            });
            setLoggedStudent(response.data.user);
            setIsLogged(true);
        } catch (error) {
            console.error('Failed to login student');
        }
    }

    const logout = () => {
        setIsLogged(false);
        setLoggedStudent({});
        
    };

    const handleSearch = useCallback((e) => {
        const searchText = e.target.value;
        const filtered = students.filter(student => {
            return student.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredStudents(filtered);

    }, [students]);

    useEffect(() => {
        get_all_students();
    }, []);
    return (
        <div className='students'>
            <h1>Módulo - Alunos</h1>
            <p>Este módulo permite o registro e login de alunos na plataforma.</p>

            <h2>Testes</h2>

            <h2>Alunos cadastrados: </h2>
            

            <div className='students-div'>
                {students.length > 0 ? (
                    students.map((student, index) => {
                        return (
                            <StudentsCard key={index} student={student} />
                        )
                    })
                ) : (
                    <p className='bad'>Não há alunos cadastrados</p>
                )}
            </div>

            <h2>Cadastrar aluno:</h2>
            <form className='create-student-from' onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type='text' placeholder='Nome' onChange={e => setName(e.target.value)} />
                <label>Email:</label>
                <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <label>Senha:</label>
                <input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value)} />
                <label>Matricula:</label>
                <input type='text' placeholder='Matricula' onChange={e => setTuition(e.target.value)} />
                <button type='submit'>Cadastrar</button>
            </form>

            <h2>Logar aluno: (retorna apenas jwt)</h2>
            <form className='login-student-form' onSubmit={handleLogin}>
                <label>Matricula</label>
                <input type='text' placeholder='Matriula' onChange={e => setLoginTuition(e.target.value)}/>
                <label>Senha</label>
                <input type='password' placeholder='Senha' onChange={e => setLoginPassword(e.target.value)}/>
                <button type='submit'>Logar</button>
            </form>
            <h3>Status:</h3>
            {isLogged ? (
                <>
                    <h4>LOGADO!</h4>
                    <p>{loggedStudent.name}</p>
                    <p>{loggedStudent.email}</p>
                    <p>{loggedStudent.tuition}</p>
                    <p>{loggedStudent.jwt}</p>
                </>
            ) : (
                <p className='bad'>Não há estudante logado</p>
            )}

            {isLogged ? (
                <button className='sair' onClick={() => logout()}>Deslogar</button>
            ) : (
                <></>
            )}


            <div>
                <div className='std-search'>
                    <input type='text' placeholder='Pesquisar aluno' onChange={handleSearch} />
                    <button>Pesquisar</button>
                </div>

                <div className='students-div'>
                    {filteredStudents.map((student, index) => {
                        return (
                            <StudentsCard key={index} student={student} />
                        )
                    })}
                </div>



            </div>

        </div>
    )
}

export default Students