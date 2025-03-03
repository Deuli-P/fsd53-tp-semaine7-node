import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';



const AuthContext = createContext(undefined);

const AuthProvider= ({ children }) => {

    const [ isConnected, setIsConnected ] = useState(false)
    const [ sessionToken , setSessionToken ] = useState("29EK")

    const [user, setUser] = useState({
        id: 1,
        gender: 'male',
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@email.io',
        phone: '123456789',
        birthdate: '01/01/2000',
        address: '1234 Main St',
        city: 'Paris',
        country: 'France',
        category: 'Marketing',
        photo : 'https://randomuser.me/api/portraits/men/74.jpg',
        isAdmin: false
    });

    const login = () => {
        console.log('Connected')
        setIsConnected(true);
    };

    const logout = () => {
        setIsConnected(false);
    };





  useEffect(() => {

    const storedUser = localStorage.getItem('userToken');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const values= {
    user,
    login,
    logout,
    isConnected,
    sessionToken
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