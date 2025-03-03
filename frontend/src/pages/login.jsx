import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const { login } = useAuth()

  const [ loginForm , setLoginForm ] = useState({
    email : "admin@admin.com",
    password : "admin"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }


  const handleLogin = (e) => {
    e.preventDefault()
    login(loginForm)
  }
    
  return (
    <div className='login-container'>
      <h1>Connexion</h1>
      <div className='divider-horizontal'/>
      <p>Pour nos connecter  à l'intranet, entrez votre identifiant et mot de passe</p>
      <form onSubmit={handleLogin} className='login-form'>
        <div className="form-label-input">
          <label htmlFor="email">Email :</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            onChange={(e)=>handleChange(e)}
            value={loginForm.email}
            className='login-form-input'
          />
        </div>
        <div className="form-label-input">
          <label htmlFor="password" >Mot de passe :</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            required 
            onChange={(e)=>handleChange(e)}
            value={loginForm.password}
            className='login-form-input'
          />
        </div>
        <div className="form-button-container">
          <button 
            type="submit">Connexion</button>
        </div>
      </form>
    </div>
  )
}

export default Login;