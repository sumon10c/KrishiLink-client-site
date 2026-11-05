
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import {
  FaLeaf,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaSeedling,
} from "react-icons/fa";

const Login = () => {
  const { singInUser, singInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    singInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setError("");
        navigate(from, { replace: true });
      })
      .catch((err) => setError("Wrong email or password", err));
  };

  const handleGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        navigate(from, { replace: true });
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-green-100/70 border border-green-100">

        {/* Left Side - Banner */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-green-800 via-emerald-700 to-green-600 p-12 flex-col justify-between overflow-hidden">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Krishi<span className="text-emerald-300">Link</span>
            </h1>

            <p className="text-emerald-100 text-xs tracking-[4px] mt-2 uppercase">
              Smart Agriculture Platform
            </p>
          </div>

          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">

              <div className="bg-emerald-300/20 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 text-emerald-200">
                <FaSeedling size={32} />
              </div>

              <h2 className="text-3xl font-extrabold text-white leading-snug">
                Welcome Back to the Future of Agriculture!
              </h2>

              <p className="text-green-100 mt-4 leading-relaxed">
                Connect with farmers, discover fresh crops, and grow your
                agricultural business with KrishiLink.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-1 bg-emerald-300 rounded-full"></div>
                <div className="w-3 h-1 bg-white/40 rounded-full"></div>
                <div className="w-3 h-1 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-green-100 text-sm">
            <FaLeaf className="inline mr-2 text-emerald-300" />
            Growing Together, Harvesting Success.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-extrabold text-green-800">
              Krishi<span className="text-emerald-500">Link</span>
            </h1>
            <p className="text-xs tracking-[3px] text-gray-400 mt-1 uppercase">
              Smart Agriculture Platform
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <FaLeaf size={25} />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Login <span className="text-green-600">Now!</span>
            </h2>

            <p className="text-gray-500 mt-3">
              Welcome back! Please enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1"
            >
              Login to Account
              <FaArrowRight />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400 font-medium">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleSingIn}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 text-gray-700 font-bold py-3.5 rounded-xl transition-all duration-300"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path fill="#4285f4" d="M512 256c0-17-2-35-5-52H260v98h142c-6 32-25 59-53 77v64h86c50-46 77-112 77-187z" />
                <path fill="#34a853" d="M260 518c72 0 133-24 177-65l-86-64c-24 16-55 25-91 25-70 0-130-47-151-110H20v66c45 90 137 148 240 148z" />
                <path fill="#fbbc05" d="M109 304c-11-32-11-66 0-98v-66H20a256 256 0 000 230z" />
                <path fill="#ea4335" d="M260 101c39-1 76 14 104 41l78-78C393 21 328-2 260 0 157 0 65 58 20 140l89 66c21-63 81-105 151-105z" />
              </svg>

              Login with Google
            </button>

          </form>

          {/* Register */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-green-600 font-extrabold hover:text-green-800 transition-colors"
              >
                Create Account
              </NavLink>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
