import { useEffect, useState } from 'react'
import {formatDateForInput } from '../../utils/utils'
import ErrorMessage from '../../components/ErrorMessage'
import { useParams } from 'react-router-dom';

const  API_URL = import.meta.env.VITE_API_URL;

const AdminEdit = () => {

  const { id } = useParams();

  const [ userForm, setUserForm ] = useState();
  const [ message, setMessage ] = useState('');

  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserForm({
      ...userForm,
      [name]: value
    })
  }

  const handleChangeDate = (e) => {
    setUserForm({
      ...userForm,
      birthdate: formatDateForInput(e.target.value)
    })
  }

  const fetchUserData = async() => {
    try{
      const responses = await fetch(`${API_URL}/api/admin/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })

      const data = await responses.json()
      console.log('data:', data)
      setUserForm(data.user)
    }
    catch(err){
      console.log(err)
    }
  }

  const handlePasswordConfirm = () => {
    if(password !== confirmPassword){
      setMessage('Les mots de passe ne correspondent pas')
      return false
    }
    else{
      setMessage('')
      return true
    }
  }


  useEffect(() => {
    fetchUserData()
  }, [])


  const handleSendEdit = async(e) => {
    e.preventDefault()
    try{
      const newInfo = {
        gender: userForm.gender,
        firstname: userForm.firstname,
        lastname: userForm.lastname,
        email: userForm.email,
        phone: userForm.phone,
        birthdate: formatDateForInput(userForm.birthdate),
        city: userForm.city,
        country: userForm.country,
        photo: userForm.photo ,
        category: userForm.category,
        password : password ? password : undefined
      }

      if(password){
        if(!handlePasswordConfirm()){
          return
        }
          newInfo.password = password
      }

      console.log('send')
      const responses = await fetch(`${API_URL}/api/profile/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          data : newInfo,
          id: id
        })
      })

      const data = await responses.json()
      console.log('data:', data)

      if(data.success){
        setUserForm(data.user)
        setMessage(data.message)
      }
      else{
        setMessage(data.message)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    console.log('userForm Category :', userForm?.category)
  }, [userForm?.category])

  return (
    <main className='edit-profile-container'>
      <h1>Editer le profil</h1>
      <div className='divider-horizontal'/>
      {message && <ErrorMessage content={message} />}
      {userForm ?
        (
          <form 
            className='edit-profile-form' 
            onSubmit={(e)=>handleSendEdit(e)}
          >
            <div className="form-label-input">
              <label htmlFor="email">* Civilité :</label>
              <select 
                name="gender" 
                id="gender" 
                required 
                className='form-input'
                onChange={(e)=> handleChange(e)}
                value={userForm.gender}
              >
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
            </div>
            <div className="form-label-input">
              <label htmlFor="email">* Catégorie :</label>
              <select 
                name="category" 
                id="category" 
                required 
                className='form-input'
                value={userForm.category}
                onChange={(e)=> handleChange(e)}
              >
              <option value="Client">Client</option>
              <option value="Marketing">Marketing</option>
              <option value="Technique">Technique</option>
            </select>
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Nom :</label>
              <input 
                type="text" 
                name="lastname" 
                id="lastname" 
                required 
                className='form-input'
                value={userForm.lastname}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Prénom :</label>
              <input 
                type="text" 
                name="firstname" 
                id="firstname" 
                required 
                className='form-input'
                value={userForm.firstname}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Email :</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                className='form-input'
                value={userForm.email}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">Mot de passe :</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                className='form-input'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="confirm-password">Confirmation :</label>
              <input 
                type="password" 
                name="confirm-password" 
                id="confirm-password" 
                className='form-input'
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Téléphone :</label>
              <input 
                type="text" 
                name="phone" 
                id="phone" 
                required 
                className='form-input'
                value={userForm.phone}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Date de naissance :</label>
              <input 
                type="date" 
                name="birthdate" 
                id="birthdate" 
                required 
                className='form-input'
                value={formatDateForInput(userForm.birthdate)}
                onChange={(e)=> handleChangeDate(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Ville:</label>
              <input 
                type="text" 
                name="city" 
                id="city" 
                required 
                className='form-input'
                value={userForm.city}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Pays :</label>
              <input 
                type="text" 
                name="country" 
                id="country" 
                required 
                className='form-input'
                value={userForm.country}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">URL de la photo :</label>
              <input 
                type="text" 
                name="photo" 
                id="photo" 
                className='form-input'
                value={userForm.photo}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="edit-profile-button-container">
              <button 
                type="submit" 
                >
                  Modifier
                </button>
            </div>
          </form>
          )
        :
        <p>Chargement...</p>
    }
    </main>
  )
}

export default AdminEdit