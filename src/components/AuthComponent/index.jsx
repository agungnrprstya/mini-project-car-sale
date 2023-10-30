import React, { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { APIAuth } from "../../apis/APIAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

function AuthComponent({ isLoginPage }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must not exceed 100 characters")
      .trim(),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").trim(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleAuth = async () => {
    try {
      if (isLoginPage) {
        await APIAuth.signInWithCredentials({ email, password });
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        await APIAuth.createAccount({ email, password });
        Swal.fire({
          icon: "success",
          title: "Sign up successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: isLoginPage ? "Login failed. Your email or password is incorrect!" : "Email is already in use.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await APIAuth.signInWithGoogleOAuth();
      Swal.fire({
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed. Google OAuth is failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const authActionText = isLoginPage ? "Sign in" : "Sign up";

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://www.pixel4k.com/wp-content/uploads/2019/01/porsche-911-carrera-s-2019-rear-4k_1546361964.jpg.webp')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-gray-800 bg-opacity-95 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
        <h2 className="mt-10 text-center text-3xl font-extrabold">{authActionText} to your account</h2>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" noValidate onSubmit={handleSubmit(handleAuth)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
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
                  <p type="invalid" className="text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
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
                  <p type="invalid" className="text-red-500">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div>
                <button
                  htmlFor="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {authActionText}
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
            {isLoginPage && (
              <p className="mt-5 text-center">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="text-blue-500 hover:opacity-50">
                  Sign up
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
