import { useEffect, useState } from 'react'
import { IoIosMail } from "react-icons/io";
import { FaPhone, FaBirthdayCake } from "react-icons/fa";
import { formatDate, formatAge } from '/src/utils/utils.js'
const VITE_URL = import.meta.env.VITE_API_URL

const Home = () => {

  const [randomUser, setRandomUser] = useState({
    id: "1",
      gender: "male",
      firstname: "Owen",
      lastname: "Lopez",
      email: "owen.lopez@example.com",
      phone: "02-37-79-78-39",
      birthdate: "1992-12-26",
      city: "Villeurbanne",
      country: "France",
      photo: "https://randomuser.me/api/portraits/men/40.jpg",
      category: "Marketing",
      isAdmin: false
  })


  const handleRandomiser = async () => {
    try{

      // requete pour fetch un document au hasard sauf le mien pour recup ses informations
      const response = await fetch(`${VITE_URL}/api/random`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        }
      })
      const data = await response.json()
      if(!response.ok){
        throw new Error(data.message)
      }
      setRandomUser(data)
    }
    catch(error){
      console.log('Erreur home button:',error)
    }
  };


  return (
    <div className="home-container">
     <h1>Bienvenue sur l'intranet</h1>
      <p>La plate-forme de l'entreprise qui vous permet de retrouver tous vos collaborateurs.</p>
      <span className='home-question'>Avez-vous dit bonjour à :</span>
      <div className="home-card-container">
        <img 
          src={randomUser.photo ? randomUser.photo : 'https://randomuser.me/api/portraits/men/74.jpg'} 
          alt={`Photo de ${randomUser.firstname}`}
          className='home-card-img'
        />
        <div className="home-card-info-container">
          <div className="home-card-info-category-container">
            <span className="home-card-info-category">{randomUser.category}</span>
          </div>
          <div className="home-card-info">
            <div className="home-card-info-name-age-container">
              <span className="home-card-info-name">{randomUser.firstname} {randomUser.lastname}</span>
              <span className="home-card-info-age">{` (${formatAge(randomUser.birthdate)} ans)`} </span>
            </div>
            <p>{randomUser.city}, {randomUser.country}</p>
            <div className="home-card-info-contact">
              <IoIosMail />
              <span className='home-card-info-contact-span'>{randomUser.email}</span>
            </div>
            <div className="home-card-info-contact">
              <FaPhone />
              <span className='home-card-info-contact-span'>{randomUser.phone}</span>
            </div>
            <div className="home-card-info-contact">
              <FaBirthdayCake />
              <p>{`Anniversaire : ${formatDate(randomUser.birthdate)}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-button-container">
        <button
          onClick={handleRandomiser}
        >
          Dire bonjour a quelqu'un d'autre
        </button>
      </div>
    </div>
  )
}

export default Home