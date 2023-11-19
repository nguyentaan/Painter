// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const pathBackEnd =  "http://localhost:8081"
  // const pathBackEnd =  "https://backendpainter-v1.onrender.com"
  const [userInfo, setUserInfo] = useState(null);

  const login = (userInfo) => {
    if (userInfo && userInfo.email) {
      setUserInfo(userInfo);
      // Store user information in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      console.error('Invalid user information provided during login');
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, login, logout , pathBackEnd}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
