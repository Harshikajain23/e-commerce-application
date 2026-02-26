import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    const currentUser = localStorage.getItem("currentUser");

    if (expiry && Date.now() < expiry && currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      logout();
    }
  }, []);

  const login = (userData) => {
    const expiryTime = Date.now() + 5 * 60 * 1000;

    localStorage.setItem("sessionExpiry", expiryTime);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("sessionExpiry");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;