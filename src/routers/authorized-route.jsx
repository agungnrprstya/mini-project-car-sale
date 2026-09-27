import React from "react";
import { Outlet } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import useAuthUser from "../hooks/useAuthUser";

export default function AuthorizedRoute() {
  const { user, initializing } = useAuthUser();

  if (initializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl text-gray-700">Loading...</div>
    );
  }

  if (user) return <Outlet />;

  return <Unauthorized />;
}
