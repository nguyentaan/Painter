// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = (userInfo) => {
    if (userInfo && userInfo.user_id && userInfo.user_email && userInfo.user_role) {
      setUserInfo(userInfo);
    } else {
      console.error('Invalid user information provided during login');
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, login, logout }}>
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
