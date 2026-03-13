'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem('adminUser');
      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
  }, []);

  const login = (username, password) => {
    // Hardcoded credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminData = { username: ADMIN_USERNAME, loginTime: new Date() };
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      setAdminUser(adminData);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, adminUser, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
