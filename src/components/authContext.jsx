import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userLoggedIn, setUserLoggedIn] = useState(!!token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch user details
  const fetchUserDetails = async (authToken) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(authToken)
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user details');
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      logout();
    }
  };

  // Fetch user details on initial load if token exists
  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchUserDetails(token)
        .finally(() => setLoading(false));
    }
  }, [token]);

  const login = async (newToken) => {
    setLoading(true);
    try {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUserLoggedIn(true);
      await fetchUserDetails(newToken);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, userLoggedIn, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
