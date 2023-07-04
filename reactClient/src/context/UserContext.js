// UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the context provider
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(''); // Set an initial value for userType

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};