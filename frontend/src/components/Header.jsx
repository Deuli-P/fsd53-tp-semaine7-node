import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { FaRightToBracket } from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import { FaList, FaUser } from "react-icons/fa";


const Header = () => {

  const { user, logout } = useAuth()

  return (
    <header>
        <div className="header-logo">
          <img src='/partager-la-base-de-donnees.png' alt="logo intreanet" className='header-logo-intranet' />
          <NavLink to='/' className='header-logo-span'>Intranet</NavLink>
        </div>
        <nav>
            <ul>
              {user &&
                  <div className="header-nav-link">
                      <NavLink to='/list'>
                        <FaList />
                        Liste
                      </NavLink>
                  </div>
                } 
               {user && user.isAdmin && 
                  (
                    <div className="header-nav-link">
                      <NavLink to='/admin/create'>
                      <FaUser />
                        Ajouter
                      </NavLink>
                    </div>
                  )
                }
                {user ? 
                  <>
                    <NavLink to='/profil/edit'>
                      <img 
                        src={user.photo ? user.photo : 'https://randomuser.me/api/portraits/men/74.jpg' }
                        alt="photo de profil" 
                        className='header-profil-img' 
                      />
                    </NavLink>
                    <div 
                      onClick={logout}
                      className="header-nav-link"
                    >
                      <FaRightFromBracket />
                      Deconnexion
                    </div> 
                  </>
                :
                  <div className="header-nav-link">
                    <FaRightToBracket />
                    <NavLink to='/login'>Connexion</NavLink>
                  </div>
                }
            </ul>
        </nav>
    </header>
  )
}

export default Header