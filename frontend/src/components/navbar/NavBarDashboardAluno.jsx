import React from 'react'
import { Link } from 'react-router-dom'
import { useProfessorAuth } from '../../context/ProfessorAuthContext'
import { useAlunoAuth } from '../../context/AlunoAuthContext';

const NavBarDashboardAluno = () => {
    const { logout_aluno } = useAlunoAuth();
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/aluno/dashboard' className="btn btn-ghost text-xl">ObjeX</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                    <Link>Perfil</Link>
                    </li>
                    <li><a>Configurações</a></li>
                    <li><button onClick={() => logout_aluno()}>Logout</button></li>
                </ul>
                </div>
            </div>
            </div>
    )
}

export default NavBarDashboardAluno