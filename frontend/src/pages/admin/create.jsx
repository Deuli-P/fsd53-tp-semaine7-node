import { useState } from 'react'
import {formatDateForInput } from '../../utils/utils'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom';

const  API_URL = import.meta.env.VITE_API_URL;

const emptyForm= {
  gender: 'male',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthdate: '',
  city: '',
  category: 'Client',
  country: '',
  photo: '',
  password: ''
}

const AdminCreate = () => {

  // const navigate = useNavigate();

  const [ userForm, setUserForm ] = useState(emptyForm);
  const [ message, setMessage ] = useState('');


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


  const handleCreateProfile = async(e) => {
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
        password : userForm.password
      }

      const responses = await fetch(`${API_URL}/api/admin/create`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newInfo)
      })

      const data = await responses.json()

      if(data.success){
        setUserForm(emptyForm)
        setMessage(data.message)
      }
      else{
        setMessage(data.message)
      }
    }
    catch(err){
      throw new Error('Erreur admin edit send edit :',err)
    }
  }

  return (
    <main className='page-container'>
      <h1>Créer un utilisateur</h1>
      <div className='divider-horizontal'/>
      {message && <ErrorMessage content={message} />}
          <form 
            className='page-form' 
            onSubmit={(e)=>handleCreateProfile(e)}
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
                placeholder='SMITH'
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
                placeholder='John'
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
                placeholder='john.smith@email.com'
                id="email" 
                required 
                className='form-input'
                value={userForm.email}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Mot de passe :</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder='(min 8 caractères)'
                required
                className='form-input'
                value={userForm.password}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="form-label-input">
              <label htmlFor="password">* Téléphone :</label>
              <input 
                type="text" 
                name="phone" 
                id="phone" 
                required 
                placeholder='07-89-0-23-45'
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
                placeholder='Paris'
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
                placeholder='France'
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
                placeholder='https://...'
                className='form-input'
                value={userForm.photo}
                onChange={(e)=> handleChange(e)}
              />
            </div>
            <div className="edit-profile-button-container">
              <button 
                type="submit" 
                >
                  Ajouter
                </button>
            </div>
          </form>
    </main>
  )
}

export default AdminCreate