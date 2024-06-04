import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../service/authProvider";

export const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner or component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
