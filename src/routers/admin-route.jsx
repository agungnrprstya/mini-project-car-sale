import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIsAdmin from "../hooks/useIsAdmin";
import { fetchGetAdmins, selectAdmins } from "../store/adminsSlice";
import Unauthorized from "../pages/Unauthorized";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();
  const admins = useSelector(selectAdmins);

  useEffect(() => {
    dispatch(fetchGetAdmins());
  }, [dispatch]);

  // Wait for the admin list to load before deciding — otherwise an admin
  // briefly sees the Unauthorized screen on every hard refresh.
  if (admins.status === "loading" || admins.status === "idle") {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl text-gray-700">
        Loading...
      </div>
    );
  }

  if (isAdmin) return <Outlet />;

  return <Unauthorized />;
}
