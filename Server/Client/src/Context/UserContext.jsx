import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    if (storedRememberMe) {
      setRememberMe(JSON.parse(storedRememberMe));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        rememberMe,
        setRememberMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
