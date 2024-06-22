import React, { useCallback, useEffect, useState } from 'react'
import './Students.css'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes';
import axios from 'axios';
import StudentsCard from '../../components/student-card/StudentsCard';
import Students_modal from './Students_modal';

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

    const [ jwt_test, setJwtTest ] = useState('');
    const [ token_validated, setTokenValidated ] = useState(false);

    const handleJwtValidation = async(e) => {
        e.preventDefault();
        try {
            /* console.log(jwt_test) */
            const response = await axios.post(`${API_BASE_URL}/students/validate_token`, {
                token: jwt_test
            });
            console.log(response.data);
            setTokenValidated(true);
        } catch (error) {
            console.log(error);
        } 
    }

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
        e.preventDefault();
        if(!name || !email || !password || !tuition) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/students/register`, {
                name: name,
                email: email,
                password: password,
                tuition: tuition
            });
            console.log(response.data);
            get_all_students();
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
            /* console.log(response.data); */
            setIsLogged(true);
            setJwtTest(response.data.token);
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
            <button className='btn mr-5 text-xl' onClick={() => document.getElementById('reg-student-modal').showModal()}>Cadastrar aluno</button>
            {/* <Students_modal handleSubmit={null} /> */}
            <dialog id="reg-student-modal" className="modal">
                <div className="modal-box text-center">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                    <form onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg">Cadastrar Estudante</h3>
                        <label className="input input-bordered flex items-center gap-2 mb-5 mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input 
                                type="text" 
                                className="grow" 
                                placeholder="Email" 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input 
                                type="text" 
                                className="grow" 
                                placeholder="Nome do estudante" 
                                onChange={e => setName(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input 
                                type="text" 
                                className="grow" 
                                placeholder="Matricula" 
                                onChange={e => setTuition(e.target.value)}    
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input 
                                type="password" 
                                className="grow" 
                                placeholder='Senha' 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <button type='submit' className="btn">Cadastrar</button>
                    </form>
                </div>
            </dialog>

            <button className='btn text-xl' onClick={() => document.getElementById('login-student-modal').showModal()}>Logar Aluno (jwt)</button>
            <dialog id="login-student-modal" className="modal">
                <div className="modal-box text-center">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                    <form onSubmit={handleLogin}>
                        <h3 className="font-bold text-lg">Logar Estudante</h3>

                        <label className="input input-bordered flex items-center gap-2 mt-5 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input 
                                type="text" 
                                className="grow" 
                                placeholder="Matricula" 
                                onChange={e => setLoginTuition(e.target.value)}    
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input 
                                type="password" 
                                className="grow" 
                                placeholder='Senha' 
                                onChange={e => setLoginPassword(e.target.value)}
                            />
                        </label>
                        <button type='submit' className="btn">Logar</button>
                    </form>
                </div>
            </dialog>
            {/* <form className='login-student-form' onSubmit={handleLogin}>
                <label>Matricula</label>
                <input type='text' placeholder='Matriula' onChange={e => setLoginTuition(e.target.value)}/>
                <label>Senha</label>
                <input type='password' placeholder='Senha' onChange={e => setLoginPassword(e.target.value)}/>
                <button type='submit'>Logar</button>
            </form> */}
            <h2>Status:</h2>
            {isLogged ? (
                <>
                    <h2 className='good'>LOGADO!</h2>
                    <StudentsCard student={loggedStudent} />
                </>
            ) : (
                <p className='bad'>Não há estudante logado</p>
            )}

            {isLogged ? (
                <button className='btn text-xl mt-4' onClick={() => logout()}>Deslogar</button>
            ) : (
                <></>
            )}

            <h2>Verificar token de acesso</h2>
            {isLogged ? (
                <>
                    <form onSubmit={handleJwtValidation}>
                        <input 
                            className='input input-bordered w-full max-w-xs' 
                            type='text' 
                            defaultValue={jwt_test} 
                            readOnly 
                        />
                        <button className='btn text-xl ml-5' type='submit'>Verificar</button>
                    </form>
                    {token_validated ? (
                        <p className='good'>Token valido!</p>
                    ) : (
                        <p className='bad'>Token invalido ou não verificado</p>
                    )}
                </>
            ) : (
                <input className='input input-bordered w-full max-w-xs' disabled type='text' placeholder='Token indisponivel, tente logar' />
            )}

            <h2>Buscar Aluno</h2>
            <div>
                <div>
                    <input className='input input-bordered w-full w-full' type='text' placeholder='Pesquisar aluno' onChange={handleSearch} />
                    <button className='btn'>Pesquisar</button>
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