import React, { useState } from "react";
import { Link } from "react-router-dom";
import { APIAuth } from "../../apis/APIAuth";
import { useNavigate } from "react-router";
import authentication from "../../utils/authentication";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await APIAuth.signOut();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } catch (error) {
      console.error("Gagal logout: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      <nav className="mx-auto w-full max-w-7xl relative py-4 flex justify-between items-center bg-white">
        <a className="text-3xl font-bold leading-none">
          <img src="/racing-car.png" alt="icon" className="h-[3rem]" />
        </a>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link to="/" className="cursor-pointer text-base text-gray-900 hover:text-blue-600 hover:font-bold">
              Home
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link to="/product" className="cursor-pointer text-base text-gray-900 hover:text-blue-600 hover:font-bold">
              Product
            </Link>
          </li>

          {authentication.isAuthorized() && (
            <>
              <li className="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <Link to="/my-order" className="cursor-pointer text-base text-gray-900 hover:text-blue-600 hover:font-bold">
                  My Order
                </Link>
              </li>
            </>
          )}
          {authentication.isAuthorizedAdmin() && (
            <>
              <li className="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <Link to="/dashboard" className="cursor-pointer text-base text-gray-900 hover:text-blue-600 hover:font-bold">
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
        {authentication.isAuthorized() ? (
          <a
            className="cursor-pointer hidden lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200"
            onClick={logout}
          >
            {loading ? "Logging out..." : "Logout"}
          </a>
        ) : (
          <a
            className="cursor-pointer hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
            href="/login"
          >
            Sign In
          </a>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
