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
    else if (!isLoggedIn && !rememberMe && 
      (!(window.location.href == "http://127.0.0.1:5173/" || window.location.href =="http://127.0.0.1:5173/homePage2") &&
      !(window.location.href == "https://proj.ruppin.ac.il/cgroup6/test2/build" || window.location.href =="https://proj.ruppin.ac.il/cgroup6/test2/build/homePage2"))
      ) {
       const timeout = setTimeout(() => {
           window.location.replace('/homePage2');
    }, 1000);
    }

    
  }, [rememberMe, isLoggedIn]);

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
