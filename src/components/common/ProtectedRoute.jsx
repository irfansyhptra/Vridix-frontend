import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Your auth hook
import { jwtDecode } from "jwt-decode"; // You might need to install jwt-decode

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    // User is not logged in
    return <Navigate to="/login" />; // Redirect to a login page
  }

  const decodedToken = jwtDecode(authToken);
  const userRole = decodedToken.role; // Assuming role is in the JWT payload

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User does not have the required role
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
