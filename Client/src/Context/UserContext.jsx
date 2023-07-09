import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from "crypto-js";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {

    const encryptedUserDetails = localStorage.getItem("user");
    const encryptedRememberMe = localStorage.getItem("rememberMe");

    if (encryptedUserDetails) {
      const decryptedUserDetails = decryptUserDetails(encryptedUserDetails);
      setUser(decryptedUserDetails);
      setIsLoggedIn(true);
    }

    if (encryptedRememberMe) {
      const decryptedRememberMe = CryptoJS.AES.decrypt(
        encryptedRememberMe,
        "ahyakar1928"
      ).toString(CryptoJS.enc.Utf8);
      setRememberMe(JSON.parse(decryptedRememberMe));
    }
  }, []);

  const decryptUserDetails = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "ahyakar1928");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

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
