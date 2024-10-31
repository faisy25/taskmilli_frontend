import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Auth context
const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component to wrap around App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    // Synchronize token and user state with localStorage whenever they change
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Add token to headers
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Function to handle login
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      console.log("Login response:", response.data); // Debug log

      // Assuming the response contains JWT token and user data
      const { access_token, userData } = response.data;

      if (!access_token || !userData) {
        throw new Error("Invalid login response");
      }

      // Save token and user to state and local storage
      setToken(access_token);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message); // Log error for debugging
      throw new Error(
        error.response?.data?.message || "Login failed, please try again."
      );
    }
  };

  // Function to handle registration
  const register = async (name, username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        username,
        password,
      });

      console.log("Registration response:", response.data); // Debug log

      // Assuming the registration creates a user successfully
      const { access_token, userData } = response.data;

      if (access_token && userData) {
        // Save token and user to state and local storage after registration
        setToken(access_token);
        setUser(userData);
      } else {
        throw new Error("Registration successful, but no data returned.");
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      ); // Log error for debugging
      throw new Error(
        error.response?.data?.message ||
          "Registration failed, please try again."
      );
    }
  };

  // Function to handle logout
  const signOut = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear the state
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"]; // Remove the token from axios headers
  };

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Provide the context value
  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
