import React from 'react'
import { IoIosMail } from "react-icons/io";
import { FaPhone, FaBirthdayCake } from "react-icons/fa";
import { formatDate, formatAge } from '/src/utils/utils.js'


const Card = ({user}) => {
  return (
    <div className="card-container">
            <img 
              src={user.photo ? user.photo : 'https://user.me/api/portraits/men/74.jpg'} 
              alt={`Photo de ${user.firstname}`}
              className='card-img'
            />
            <div className="card-info-container">
              <div className="card-info-category-container">
                <span className="card-info-category">{user.category}</span>
              </div>
              <div className="card-info">
                <div className="card-info-name-age-container">
                  <span className="card-info-name">{user.firstname} {user.lastname}</span>
                  <span className="card-info-age">{` (${formatAge(user.birthdate)} ans)`} </span>
                </div>
                <p>{user.city}, {user.country}</p>
                <div className="card-info-contact">
                  <IoIosMail />
                  <span className='card-info-contact-span'>{user.email}</span>
                </div>
                <div className="card-info-contact">
                  <FaPhone />
                  <span className='card-info-contact-span'>{user.phone}</span>
                </div>
                <div className="card-info-contact">
                  <FaBirthdayCake />
                  <p>{`Anniversaire : ${formatDate(user.birthdate)}`}</p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Card