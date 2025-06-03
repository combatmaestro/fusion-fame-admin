import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// This wraps the entire app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null); // store user data if needed

  const login = (userData) => {
    setIsAuthenticated(true);
    // setAdminUser(userData);
    localStorage.setItem('token', userData.token); // optional
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext);
