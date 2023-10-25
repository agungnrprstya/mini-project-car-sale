import React from "react";
import authentication from "../utils/authentication";
import Unauthorized from "../pages/Unauthorized";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
  if (authentication.isAuthorizedAdmin()) return <Outlet />;

  return <Unauthorized />;
}
