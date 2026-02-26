import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //  Check session on app load
  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    const currentUser = localStorage.getItem("currentUser");

    if (expiry && currentUser) {
      const expiryTime = Number(expiry);

      if (Date.now() < expiryTime) {
        setUser(JSON.parse(currentUser));

        //  Auto logout when time expires
        const timeout = expiryTime - Date.now();

        setTimeout(() => {
          logout();
        }, timeout);
      } else {
        logout();
      }
    }
  }, []);

  const login = (userData) => {
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    localStorage.setItem("sessionExpiry", expiryTime.toString());
    localStorage.setItem("currentUser", JSON.stringify(userData));

    setUser(userData);

    //  Auto logout timer
    setTimeout(() => {
      logout();
    }, 5 * 60 * 1000);
  };

  const logout = () => {
    localStorage.removeItem("sessionExpiry");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;