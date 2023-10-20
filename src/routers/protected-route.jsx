import React from "react";
import authentication from "../utils/authentication";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  if (!authentication.isAuthorized()) return <Outlet />;
  return <Navigate to="/" />;
}
