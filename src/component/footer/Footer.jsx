
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
        <NavLink to="/allcrops">All Crops</NavLink>
      </li>
      {user && (
        <>
          <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
            <NavLink to="/myPost">My Posts</NavLink>
          </li>
          <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
            <NavLink to="/addCrops">Add Crops</NavLink>
          </li>
          <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
            <NavLink to="/myInterest">My Interest</NavLink>
          </li>
          <li className="hover:text-emerald-300 transition-all duration-300 hover:translate-x-1">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46] text-white pt-16">

      {/* Background Decorations */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-14">

          {/* Logo & About */}
          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Krishi<span className="text-emerald-300">Link</span>
            </h1>

            <span className="text-emerald-300 text-xs font-bold tracking-[3px] uppercase">
              Smart Agriculture Platform
            </span>

            <p className="text-emerald-100/80 leading-8 mt-5 max-w-sm">
              Connecting farmers and buyers easily. Explore crops, trade, and grow together. Building a smarter and more sustainable agricultural community.
            </p>

            {/* Decorative Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-300 to-green-500 rounded-full mt-6"></div>

          </div>

          {/* Quick Links */}
          <div>

            <h2 className="text-xl font-extrabold mb-6 text-white">
              Quick Links
            </h2>

            <div className="w-12 h-1 bg-emerald-400 rounded-full mb-6"></div>

            <ul className="flex flex-col space-y-4 font-medium text-emerald-100/80">
              {links}
            </ul>

          </div>

          {/* Social Links */}
          <div>

            <h2 className="text-xl font-extrabold mb-6 text-white">
              Follow Us
            </h2>

            <div className="w-12 h-1 bg-emerald-400 rounded-full mb-6"></div>

            <p className="text-emerald-100/80 leading-7 mb-6">
              Stay connected with KrishiLink and discover the latest agricultural updates.
            </p>

            <div className="flex gap-4">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-black hover:border-black hover:-translate-y-1 transition-all duration-300"
              >
                <FaTwitter className="text-lg" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:-translate-y-1 transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Copyright */}
      <div className="relative border-t border-emerald-400/20 bg-black/10">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center">

          <p className="text-emerald-100/70 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-extrabold text-emerald-300">
              KrishiLink
            </span>
            . All rights reserved.
          </p>

          <p className="text-emerald-100/50 text-xs mt-2">
            Growing Together, Growing Better 🌱
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
