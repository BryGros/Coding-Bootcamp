import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  const checkAuth = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If no token, stop loading and return
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Try to get user data from backend
      const response = await api.get('/api/auth/me');
      setUser(response.data.user);
    } catch (error) {
      // If error, remove invalid token
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run checkAuth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Call login endpoint
      const response = await api.post('/api/auth/login', {
        email: email,
        password: password
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Set user from response
      setUser(response.data.user);
    } catch (error) {
      // Throw error to be caught by Login component
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Call register endpoint
      const response = await api.post('/api/auth/register', {
        name: name,
        email: email,
        password: password
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Set user from response
      setUser(response.data.user);
    } catch (error) {
      // Throw error to be caught by Register component
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Clear user state
    setUser(null);
  };

  // Create value object with state and functions
  const value = {
    user: user,
    loading: loading,
    login: login,
    register: register,
    logout: logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
