import React from 'react'
import { IoIosMail } from "react-icons/io";
import { FaPhone, FaBirthdayCake } from "react-icons/fa";
import { formatDate, formatAge } from '/src/utils/utils.js'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Card = ({userData, handleDelete}) => {

  const {user } = useAuth();

  const navigate = useNavigate();

  const handleEdituserData = () => {
    console.log('Edit userData')
    navigate(`/admin/edit/${userData._id}`)
  }

  const handleDeleteuserData = async () => {
    console.log('Delete userData')
    handleDelete(userData._id)
  }

  return (
    <>
      <div className="card-container">
        <img 
          src={userData.photo ? userData.photo : 'https://userData.me/api/portraits/men/74.jpg'} 
          alt={`Photo de ${userData.firstname}`}
          className='card-img'
        />
        <div className="card-info-container">
          <div className="card-info-category-container">
            <span className="card-info-category">{userData.category}</span>
          </div>
          <div className="card-info">
            <div className="card-info-name-age-container">
              <span className="card-info-name">{userData.firstname} {userData.lastname}</span>
              <span className="card-info-age">{` (${formatAge(userData.birthdate)} ans)`} </span>
            </div>
            <p>{userData.city}, {userData.country}</p>
            <div className="card-info-contact">
              <IoIosMail />
              <span className='card-info-contact-span'>{userData.email}</span>
            </div>
            <div className="card-info-contact">
              <FaPhone />
              <span className='card-info-contact-span'>{userData.phone}</span>
            </div>
            <div className="card-info-contact">
              <FaBirthdayCake />
              <p>{`Anniversaire : ${formatDate(userData.birthdate)}`}</p>
            </div>
            {user.isAdmin &&
              <div className="card-info-admin-button">
                <button
                  onClick={handleEdituserData}
                >
                  Éditer
                </button>
                <button
                  onClick={handleDeleteuserData}  
                >
                  Supprimer
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Card