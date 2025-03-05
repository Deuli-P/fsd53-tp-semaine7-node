import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import { adminDeleteUser } from '../utils/utils';
const VITE_URL = import.meta.env.VITE_API_URL

const Home = () => {

  const { checkIfAuth } = useAuth();


  const [randomUser, setRandomUser] = useState(null)


  useEffect(() => {
    checkIfAuth()
  }, [])


  const handleRandomiser = async () => {
    try{

      // requete pour fetch un document au hasard sauf le mien pour recup ses informations
      const response = await fetch(`${VITE_URL}/api/random`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
      const data = await response.json()
      if(!response.ok){
        throw new Error(data.message)
      }
      setRandomUser(data)
    }
    catch(error){
      throw new Error('Erreur home randomizer :',error)
    }
  };

  const handleDelete = async(id) => {
    const action = await adminDeleteUser(id)

    if(action){
      handleRandomiser()
    }
  };

  useEffect(() => {
    handleRandomiser()
  }, [])


  return (
    <main className="home-container">
     <h1>Bienvenue sur l'intranet</h1>
      <p>La plate-forme de l'entreprise qui vous permet de retrouver tous vos collaborateurs.</p>
      <span className='home-question'>Avez-vous dit bonjour à :</span>
      {randomUser ?
        <Card 
          userData={randomUser} 
          handleDelete={handleDelete}
        />
      :
        <ErrorMessage
          content='Erreur de chargement du collaborateur'
        />
      }
      <div className="home-button-container">
        <button
          onClick={handleRandomiser}
        >
          Dire bonjour a quelqu'un d'autre
        </button>
      </div>
    </main>
  )
}

export default Home