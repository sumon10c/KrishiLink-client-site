
import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import {
  FaLeaf,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCamera,
  FaArrowRight,
  FaSeedling,
} from "react-icons/fa";

const Register = () => {
  const { createUser, singInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;

    if (!/[A-Z]/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one lowercase letter",
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters!",
      });
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);

        const newUser = {
          name: name || result.user.displayName,
          email: result.user.email,
          photo: photoUrl || result.user.photoURL,
        };

        fetch("https://krishilink-api-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after register", data);
          });

        setError("");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };

        fetch("https://krishilink-api-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after register", data);
          });
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
                Join KrishiLink and Grow Together!
              </h2>

              <p className="text-green-100 mt-4 leading-relaxed">
                Create your account and become part of a smart agricultural
                community. Connect with farmers and explore new opportunities.
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

        {/* Right Side - Register Form */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-7">
            <h1 className="text-3xl font-extrabold text-green-800">
              Krishi<span className="text-emerald-500">Link</span>
            </h1>

            <p className="text-xs tracking-[3px] text-gray-400 mt-1 uppercase">
              Smart Agriculture Platform
            </p>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <FaLeaf size={25} />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Create <span className="text-green-600">Account!</span>
            </h2>

            <p className="text-gray-500 mt-3">
              Join our agricultural community and start your journey today.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profile Photo URL
              </label>

              <div className="relative">
                <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                <input
                  name="photoUrl"
                  type="url"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter your photo URL"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                At least 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1"
            >
              Create Account
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

            {/* Google Register */}
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
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc05" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>

              Continue with Google
            </button>

          </form>

          {/* Login Link */}
          <div className="text-center mt-7">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-green-600 font-extrabold hover:text-green-800 transition-colors"
              >
                Login Now
              </NavLink>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
