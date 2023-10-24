import React, { useState } from "react";
import { auth } from "../../configs/firebase";
import { APIAuth } from "../../apis/APIAuth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await APIAuth.signInWithCredentials({ email, password });
      message.success("login successful");
      navigate("/");
    } catch (error) {
      console.log("test");
      message.error("login failed. your email or password is wrong!");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await APIAuth.signInWithGoogleOAuth();
      message.success("login successful");
      navigate("/");
    } catch (error) {
      console.log("test");
      message.error("login failed. google oauth is failed");
    }
  };

  return (
    <>
      <div
        className="min-h-screen text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('https://www.pixel4k.com/wp-content/uploads/2019/01/porsche-911-carrera-s-2019-rear-4k_1546361964.jpg.webp')",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-gray-800 bg-opacity-95 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
          <h2 className="mt-10 text-center text-3xl font-extrabold">Sign in to your account</h2>
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={signIn}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-slate-950 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-slate-950 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    htmlFor="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-600 text-gray-300">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div>
                    <a
                      onClick={signInWithGoogle}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-200 hover:bg-gray-700 cursor-pointer"
                    >
                      <img className="h-6 w-6 text-white" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
