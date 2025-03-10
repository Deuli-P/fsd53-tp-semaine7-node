import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {

  const { login, checkIfAuth, user } = useAuth()

  const navigate = useNavigate()

  const [ loginForm , setLoginForm ] = useState({
    email : "",
    password : ""
  })
  const [ message , setMessage ] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    const responses = await login(loginForm)
    if(responses.message ){
      setMessage(responses.message)
    }
    else{
      await checkIfAuth();
      navigate('/')
    }
  }


  useEffect(() => { 
    if(user){
      navigate('/')
    }
  },[user, navigate])


  return (
    <main className='login-container'>
      <h1>Connexion</h1>
      <div className='divider-horizontal'/>
      <p>Pour vous connecter à l'intranet, entrez votre identifiant et mot de passe</p>
      <form onSubmit={handleLogin} className='login-form'>
        <div className="form-label-input">
          <label htmlFor="email">Email :</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='ex: owen.lopez@example.com'
            required 
            onChange={(e)=>handleChange(e)}
            value={loginForm.email}
            className='form-input'
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
            className='form-input'
          />
        </div>
        <div className="form-button-container">
          <button 
            type="submit">Connexion</button>
        </div>
      </form>
      {message && <ErrorMessage content={message} />}
    </main>
  )
}

export default Login;