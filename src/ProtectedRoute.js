import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  if (!userSession) {
    return <Navigate to={role === "brand" ? "/login/brand" : "/login/creator"} />;
  }

  if (role && userSession.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
