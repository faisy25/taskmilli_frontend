import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
