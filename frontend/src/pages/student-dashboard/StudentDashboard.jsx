import { useContext, useState } from 'react'
import './StudentDashboard.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../hooks/AuthGuard'
import { useGetAllGroups } from '../../hooks/useGetAllGroups'

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [ groups, setGroups ] = useState([]);

  useState(() => {
    const groups = useGetAllGroups();
    setGroups(groups);
  }, [])
  console.log(user);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl"><Link to='/'>Objex</Link></a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Perfil
                </a>
              </li>
              <li><button onClick={() => logout()}>Sair</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='dashboard'>
        <h1>Dashboard</h1>

        <h3>Olá, {user.name}!</h3>

        <h2>Atividades</h2>
        <p>PLACEHORLDER</p>


        <h2>Grupos disponíveis</h2>
        {groups.length > 0 ? groups.map((group, index)=> {
          return (
            <div key={index} className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title">{group.name}</h2>
                <p>{group.description}</p>
                <button className="btn btn-primary">Entrar</button>
              </div>
            </div>
          )
        }) : <p>Não há grupos disponíveis</p>}
      </div>

    </>
  )
}

export default StudentDashboard