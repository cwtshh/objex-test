import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
        <Link className='logo' to='/'><h1>ObjeX</h1></Link>

        <div className="links">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>    
        </div>

    </nav>
  )
}

export default Navbar