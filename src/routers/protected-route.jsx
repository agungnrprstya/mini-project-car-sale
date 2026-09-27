import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

// Dipakai untuk halaman /login: pengguna yang sudah punya sesi Firebase
// langsung dialihkan ke beranda.
export default function ProtectedRoute() {
  const { user, initializing } = useAuthUser();

  if (initializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl text-gray-700">Loading...</div>
    );
  }

  if (user) return <Navigate to="/" />;

  return <Outlet />;
}
