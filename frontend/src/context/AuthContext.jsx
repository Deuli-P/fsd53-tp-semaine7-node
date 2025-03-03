import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
const  API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(undefined);

const AuthProvider= ({ children }) => {


  const [user, setUser] = useState({
      id: null,
      gender: '',
      firstName: '',
      lastName: '' ,
      email: '',
      phone: '',
      birthdate: '',
      address: '',
      city: '',
      country: '',
      category: '',
      photo : '',
      isAdmin: false
  });

  const login = async (dataLogin) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataLogin),
      });
  
      const data = await response.json();
      console.log("Réponse API :", data);
  
      if (data.success) {
        setUser(data.user);
      } else {
        console.log("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.log("Erreur catch login :", error);
    }
  };
  
  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, { method: "GET", credentials: "include" });
      setUser(null);
    } catch (error) {
      console.log("Erreur catch logout :", error);
    }
  };
    
  const checkIfauth= async()=> {
    try{
      const response = await fetch(`${API_URL}/api/user/check`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json()
      if(data.success){
        setUser(data.user)
      }
    }
    catch(e){
      console.log('Erreur checkIfauth :', e)
    }
  }

  useEffect(() => {
    checkIfAuth()
  },[])

  const values= {
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };