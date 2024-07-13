import React, { useEffect, useState } from 'react'
import NavBarDashboardProfessor from '../../components/navbar/NavBarDashboardProfessor'
import { useProfessorAuth } from '../../context/ProfessorAuthContext'
import DashboardBtmNav from '../../components/dashboard-btm-nav/DashboardBtmNav';
import Alert from '../../components/alert/Alert';
import axiosInstance from '../../axios/AxiosInstance';
import Toast from '../../components/toast/Toast';
import axios from 'axios';
import GroupCard from '../../components/groupcard/GroupCard';
import ExcelJS from 'exceljs';

const DashboardProfessor = () => {
  const { professor } = useProfessorAuth();
  const [ groups, setGroups ] = useState([]);

  const [ groupName, setGroupName ] = useState("");
  const [ groupDesc, setGroupDesc ] = useState("");
  const [ groupTurma, setGroupTurma ] = useState("");

  const [ professores, setProfessores ] = useState([]); 
  const [ professor_id, setProfessor_id ] = useState("");
  const [ turmaNome, setTurmaNome ] = useState("");

  const [ showToast, setShowToast ] = useState(false);

  const [ turmas, setTurmas ] = useState([]);

  const [ nomeAluno, setNomeAluno ] = useState("");
  const [ emailAluno, setEmailAluno ] = useState("");
  const [ senhaAluno, setSenhaAluno ] = useState("");
  const [ turmaAluno, setTurmaAluno ] = useState("");
  const [ matriculaAluno, setMatriculaAluno ] = useState("");

  const [ alunos, setAlunos ] = useState([]);


  const handleGroupCreation = async(e) => {
    e.preventDefault();
    if(groupName === "" || groupDesc === "" || groupTurma === "") {
      alert("Preencha todos os campos!");
      return;
    }
    await axiosInstance.post('/professor/create/grupo', {
      nome: groupName,
      descricao: groupDesc,
      turma: groupTurma
    }).then(res => {
      setGroupDesc("");
      setGroupName("");
      setGroupTurma("");
      get_grupos();
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleTurmaCreation = async(e) => {
    e.preventDefault();
    if(professor_id === "" || turmaNome === "") {
      alert("Preencha todos os campos!");
      return;
    }
    console.log(turmaNome, professor_id);
    await axiosInstance.post('/professor/create/turma', {
      nome: turmaNome,
      professor_id: professor_id
    }).then(res => {
      console.log(res.data);
      handleShowToast();
      setTurmaNome("");
      setProfessor_id("");
    }).catch(err => {
      console.log(err);
    });
    // document.getElementById("turmas").open = false;
  };

  const handleAlunoCreation = async(e) => {
    e.preventDefault();
    if(nomeAluno === "" || emailAluno === "" || senhaAluno === "" || turmaAluno === "", matriculaAluno === "") {
      alert("Preencha todos os campos!");
      return;
    }
    // console.log(nomeAluno, emailAluno, senhaAluno, turmaAluno, matriculaAluno);
    await axiosInstance.post('/professor/register/aluno', {
      nome: nomeAluno,
      email: emailAluno,
      senha: senhaAluno,
      turma: turmaAluno,
      matricula: matriculaAluno
    }).then(res => {
      console.log(res.data);
      get_alunos();
    }).catch(err => {
      console.log(err);
    })
  }

  const export_excel = async() => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Grupos');

    worksheet.addRow(['Nome', 'Descrição', 'Turma', 'Lider', 'Membros']);
    groups.forEach(group => {
      worksheet.addRow([group.nome, group.descricao, group.turma, group.lider, group.membros]);
    });

    worksheet.columns.forEach(column => {
      column.width = 25;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'grupos.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const get_alunos = async() => {
    axiosInstance.get('/professor/get-alunos').then(res => {
      setAlunos(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const get_professores = async() => {
    axiosInstance.get('/professor/get-all').then(res => {
      setProfessores(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const get_turmas = async() => {
    await axiosInstance.get('/professor/get-turmas').then(res => {
      setTurmas(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  const get_grupos = async() => {
    await axiosInstance.get('/grupo/get-all').then(res => {
      setGroups(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleShowToast = () => {
    setShowToast(true);
  }

  const handleCloseToast = () => {
    setShowToast(false);
  }

  useEffect(() => {
    get_professores()
    get_turmas();
    get_grupos();
    get_alunos();
  }, [])
  return (
    <div>
      <NavBarDashboardProfessor />

      <div className='p-6'>
        {/* <DashboardBtmNav /> */}


        <div className='flex'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><button onClick={()=>document.getElementById('turmas').showModal()}>Gerenciar Turmas</button></li>
            </ul>
          </div>
          <div className='ml-6'>
            <h1 className='text-2xl font-bold'>Dashboard Professor</h1>
            <h2 className='text-xl'>Bem vindo, {professor.nome}!</h2>
          </div>
        </div>
        <h1 className='mt-6 text-xl font-bold'>Grupos</h1>
        <div className='mt-6'>
          <button className='btn btn-primary mb-6' onClick={()=>document.getElementById('cadastrar_grupo').showModal()}>Criar Grupo</button>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 h-96 overflow-scroll'>
            {groups.length === 0 ? (
              <Alert type={"error"} message={"Não há grupos cadastrados"} />
            ) : (
              groups.map((group, index) => {
                return (
                  <GroupCard key={index} group={group} />
                )
              })
            )}
          </div>

          <button onClick={() => export_excel()} className='btn btn-primary mt-6'>Gerar Excel</button>
        </div>


        <h1 className='text-xl font-bold mt-6'>Alunos</h1>
        <div className='mt-6'>
          <button className='btn btn-primary mb-6' onClick={()=>document.getElementById('alunos').showModal()}>Adicionar Aluno</button>

          <table className='table w-full'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Matricula</th>
                <th>Turma</th>
              </tr>
            </thead>
            <tbody>
              {alunos.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center'>Não há alunos cadastrados</td>
                </tr>
              ) : (
                alunos.map((aluno, index) => {
                  return (
                    <tr key={index}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.matricula}</td>
                      <td>{aluno.turma}</td>
                    </tr>
                  )
                })
              )}
            </tbody>

          </table>
        </div>

        <Toast type={'success'} message={"Turma criada!"} show={showToast} onClose={handleCloseToast} />

        <dialog id="cadastrar_grupo" className="modal">
          <div className="modal-box flex flex-col justify-center items-center">
            <h3 className="font-bold text-lg">Cadastrar Grupo</h3>
            <form onSubmit={handleGroupCreation}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nome:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setGroupName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Descrição:</span>
                </div>
                <textarea 
                  className="textarea textarea-bordered h-24" 
                  style={{ resize: 'none'}} 
                  onChange={e => setGroupDesc(e.target.value)}
                />
              </label>

              

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Turma:</span>
                </div>
                <select className="select select-bordered" onChange={e => setGroupTurma(e.target.value)}>
                  <option disabled selected>Selecione uma Turma</option>
                  {turmas ? turmas.map((turma_, index) => {
                    return (
                      <option key={index} value={turma_.nome}>{turma_.nome}</option>
                    )
                  }) : (
                    <option disabled>Não há turmas cadastradas</option>
                  )}
                </select>
              </label>


              <button type='submit' className='btn btn-primary mt-6'>Cadastrar</button>
            </form>

          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>


        <dialog id="turmas" className="modal">
          <div className="modal-box flex flex-col justify-center items-center text-center">
            <h3 className="font-bold text-lg">Turmas</h3>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h4>Criar Turma</h4>
            <form method='dialog' onSubmit={handleTurmaCreation}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nome:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setTurmaNome(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Professor:</span>
                </div>
                <select className="select select-bordered" onChange={e => setProfessor_id(e.target.value)}>
                  <option disabled selected>Selecione um Professor</option>
                  {professores ? professores.map(prof => {
                    return (
                      <option value={prof._id}>{prof.nome}</option>
                    )
                  }) : <option disabled>Não há professors cadastrados.</option>}
                </select>
              </label>

              <div className='modal-cation'>
                <button type='submit' className='btn btn-primary mt-6'>Cadastrar</button>
              </div>
            </form>

          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="alunos" className="modal">
          <div className="modal-box flex flex-col justify-center items-center text-center">
            <h3 className="font-bold text-lg">Alunos</h3>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h4>Cadastrar Aluno</h4>
            <form method='dialog' onSubmit={handleAlunoCreation}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nome:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setNomeAluno(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Matricula:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setMatriculaAluno(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setEmailAluno(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Senha:</span>
                </div>
                <input 
                  type="text"
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setSenhaAluno(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Turma:</span>
                </div>
                <select className="select select-bordered" onChange={e => setTurmaAluno(e.target.value)}>
                  <option disabled selected>Selecione uma Turma</option>
                  {turmas ? turmas.map(turma => {
                    return (
                      <option value={turma.nome}>{turma.nome}</option>
                    )
                  }) : <option disabled>Não há professors cadastrados.</option>}
                </select>
              </label>

              <div className='modal-cation'>
                <button type='submit' className='btn btn-primary mt-6'>Cadastrar</button>
              </div>
            </form>

          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        


      </div>
    </div>
  )
}

export default DashboardProfessor