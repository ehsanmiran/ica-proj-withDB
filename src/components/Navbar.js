import logo from '../images/logo.png';
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { authorized } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="container">
          <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
          <ul className="nav-links">
              { !authorized && <li><NavLink to="/login">Log in</NavLink></li> }
              { authorized && <li><NavLink to="/login">Log out</NavLink></li> }
              <li><NavLink to="/admin">Admin</NavLink></li>
              <li><NavLink to="/">Home</NavLink></li>
          </ul>
      </div>
        
    </nav>
  )
}

export default Navbar;