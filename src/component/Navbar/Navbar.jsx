
import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, singOutUser } = useContext(AuthContext);

  const handleSingOut = () => {
    singOutUser().then().catch();
  };

  // Desktop Active Link Style
  const desktopLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-lg text-[15px] font-semibold transition-all duration-300
    ${
      isActive
        ? "bg-emerald-300 text-emerald-950 shadow-md"
        : "text-white hover:bg-white/10 hover:text-emerald-200"
    }`;

  // Mobile Active Link Style
  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 font-semibold transition-all duration-300
    ${
      isActive
        ? "bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`;

  const dropDownLinks = (
    <>
      <li>
        <NavLink to="/" end className={mobileLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/allcrops" className={mobileLinkClass}>
          All Crops
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/myPost" className={mobileLinkClass}>
              My Posts
            </NavLink>
          </li>

          <li>
            <NavLink to="/addCrops" className={mobileLinkClass}>
              Add Crops
            </NavLink>
          </li>

          <li>
            <NavLink to="/myInterest" className={mobileLinkClass}>
              My Interest
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={mobileLinkClass}>
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const links = (
    <>
      <li>
        <NavLink to="/" end className={desktopLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/allcrops" className={desktopLinkClass}>
          All Crops
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/myPost" className={desktopLinkClass}>
              My Posts
            </NavLink>
          </li>

          <li>
            <NavLink to="/addCrops" className={desktopLinkClass}>
              Add Crops
            </NavLink>
          </li>

          <li>
            <NavLink to="/myInterest" className={desktopLinkClass}>
              My Interest
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={desktopLinkClass}>
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#065f46] shadow-lg shadow-emerald-950/20 px-3 md:px-8 py-3 border-b border-emerald-400/20">

      {/* Navbar Start */}
      <div className="navbar-start">

        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-white rounded-xl z-50 mt-4 w-56 p-3 shadow-2xl border border-gray-100 space-y-1"
          >
            {dropDownLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Krishi<span className="text-emerald-300">Link</span>

          <span className="block text-[9px] md:text-[10px] tracking-[3px] font-medium text-emerald-100/80 uppercase mt-[-2px]">
            Smart Agriculture Platform
          </span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-2 px-1">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">

        {user ? (
          <button
            onClick={handleSingOut}
            className="btn border-none rounded-xl px-5 bg-white text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 md:text-[16px] font-bold shadow-md transition-all duration-300"
          >
            LogOut
          </button>
        ) : (
          <div className="flex gap-2 md:gap-3">

            <NavLink to="/login">
              {({ isActive }) => (
                <button
                  className={`btn rounded-xl font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-300 text-emerald-950 border-none shadow-md"
                      : "border border-white/40 bg-white/10 text-white hover:bg-white hover:text-emerald-800"
                  }`}
                >
                  LogIn
                </button>
              )}
            </NavLink>

            <NavLink to="/register">
              {({ isActive }) => (
                <button
                  className={`btn rounded-xl font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-emerald-800 border-none shadow-md"
                      : "border-none bg-emerald-300 text-emerald-950 hover:bg-emerald-200 shadow-md"
                  }`}
                >
                  Register
                </button>
              )}
            </NavLink>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
