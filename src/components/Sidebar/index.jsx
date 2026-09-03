import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIAuth } from "../../apis/APIAuth";

function Sidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await APIAuth.signOut();
      navigate(0);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-[20rem] bg-gray-600 overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-white">Bandar Mobil</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              to="/dashboard"
              className="cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                <i className="bx bxs-dashboard"></i>
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-user"
              className="cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                <i className="bx bxs-user"></i>
              </span>
              <span className="text-sm font-medium">List User</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-transaction"
              className="cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                <i className="bx bxs-cart"></i>
              </span>
              <span className="text-sm font-medium">List Transaction</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                <i className="bx bxs-home"></i>
              </span>
              <span className="text-sm font-medium">Home Page</span>
            </Link>
          </li>
          <li>
            <a
              className="cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
              onClick={logout}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                <i className="bx bx-log-out"></i>
              </span>
              <span className="text-sm font-medium">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;