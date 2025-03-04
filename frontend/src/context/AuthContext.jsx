import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
const  API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(undefined);



const AuthProvider= ({ children }) => {

  const [user, setUser] = useState(null);

  const login = async (dataLogin) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: "include",
        body: JSON.stringify(dataLogin),
      });
  
      const data = await response.json();
      console.log('data user:', data)
      if (data) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.log("Erreur catch login :", error);
    }
  };
  
  const logout = async () => {
    try {
      console.log('logout')
      await fetch(`${API_URL}/api/auth/logout`, { 
        method: "GET", 
        credentials: "include" 
      });
      setUser(null);
    } catch (error) {
      console.log("Erreur catch logout :", error);
    }
  };
    
  const checkIfAuth= async()=> {
    try{

      console.log('checkIfAuth :' )
      const response = await fetch(`${API_URL}/api/auth/check`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json()
      if(data.success){
        setUser(data.user)
        return true
      }
      else{
        setUser(null)
        return false
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
    logout,
    checkIfAuth,
    setUser
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