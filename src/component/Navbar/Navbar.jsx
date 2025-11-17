import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, singOutUser } = use(AuthContext);

  const handleSingOut = () => {
    singOutUser().then().catch();
  };

  const dropDownLinks = (
    <>
      <li className="text-[18px] font-bold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-[18px] font-bold">
        <NavLink to="/allcrops">All Crops</NavLink>
      </li>
      {user && (
        <>
          <li className="text-[18px] font-bold">
            <NavLink to="/myPost">My Posts</NavLink>
          </li>
          <li className="text-[18px] font-bold">
            <NavLink to="/addCrops">Add Crops</NavLink>
          </li>
          <li className="text-[18px] font-bold">
            <NavLink to="/myInterest">My Interest</NavLink>
          </li>
          <li className="text-[18px] font-bold">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  const links = (
    <>
      <li className="text-white text-[18px] font-bold hover:text-gray-300">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-white text-[18px] font-bold hover:text-gray-300">
        <NavLink to="/allcrops">All Crops</NavLink>
      </li>
      {user && (
        <>
          <li className="text-white text-[18px] font-bold hover:text-gray-300">
            <NavLink to="/myPost">My Posts</NavLink>
          </li>
          <li className="text-white text-[18px] font-bold hover:text-gray-300">
            <NavLink to="/addCrops">Add Crops</NavLink>
          </li>
          <li className="text-white text-[18px] font-bold">
            <NavLink to="/myInterest">My Interest</NavLink>
          </li>
          <li className="text-white text-[18px] font-bold ">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-red-600 to-[#00c853] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {dropDownLinks}
          </ul>
        </div>
        <a className="md:text-4xl font-bold text-yellow-500">
          Krishi <span className="text-green-500">Link</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSingOut}
            className="btn bg-gradient-to-r from-[#ffe600] to-[#00c853] hover:from-red-600 hover:to-[#00c853] text-white md:text-[20px] font-bold"
          >
            LogOut
          </button>
        ) : (
          <div className="flex gap-3">
            <NavLink to="/login">
              <button className="btn hover:from-red-600 hover:to-[#00c853] bg-gradient-to-r from-[#ffe600] to-[#00c853] text-white md:text-[20px] font-bold">
                LogIn
              </button>
            </NavLink>

            <NavLink to="/register">
              <button className="btn hover:from-red-600 hover:to-[#00c853] bg-gradient-to-r from-[#ffe600] to-[#00c853] text-white md:text-[20px] font-bold">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
