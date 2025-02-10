import React from "react";
import { Navigate } from "react-router-dom";
import API from "./API";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = API.checkTokenValidity();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
