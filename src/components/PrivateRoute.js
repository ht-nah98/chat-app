import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};
