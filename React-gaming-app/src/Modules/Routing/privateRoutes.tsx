//import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
