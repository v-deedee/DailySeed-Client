import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children, initialUser, setUserCallback }) => {
  const [user, setUser] = useState(initialUser);

  const handleSetUser = (userData) => {
    setUser(userData);
    if (setUserCallback) {
      setUserCallback(userData);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};