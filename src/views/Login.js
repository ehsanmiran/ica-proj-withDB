import '../App.css';
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleClick = () => {
    login();
    if(state) {
      navigate(state.from)
    } else {
      navigate("/")
    }
  }
  
  return (
    <div>
      <h3>Login please</h3>
      <button onClick={ handleClick } className="btn btn-prim">log in</button>
    </div>
  )
}

export default Login