import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useIsAdmin from "../hooks/useIsAdmin";
import { fetchGetAdmins, selectAdmins } from "../store/adminsSlice";
import Unauthorized from "../pages/Unauthorized";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();
  const admins = useSelector(selectAdmins);

  // The admins list is fetched by App on auth state change, so this guard
  // only reacts to its status. A failed fetch means we couldn't verify
  // (network/rules issue) — that must not look like "not an admin".

  // Wait for the admin list to load before deciding — otherwise an admin
  // briefly sees the Unauthorized screen on every hard refresh.
  if (admins.status === "loading" || admins.status === "idle") {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl text-gray-700">
        Loading...
      </div>
    );
  }

  if (admins.status === "failed") {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 text-2xl text-gray-700">
        <span>Failed to verify admin access.</span>
        <button
          type="button"
          onClick={() => dispatch(fetchGetAdmins())}
          className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-full text-base px-6 py-2.5"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isAdmin) return <Outlet />;

  return <Unauthorized />;
}
