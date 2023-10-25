import React from "react";
import authentication from "../utils/authentication";
import Unauthorized from "../pages/Unauthorized";
import { Outlet } from "react-router-dom";

export default function UserRoute() {
  if (authentication.isAuthorized()) return <Outlet />;

  return <Unauthorized />;
}
