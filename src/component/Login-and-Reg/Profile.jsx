
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, NavLink } from "react-router";
import {
  FaUser,
  FaLeaf,
  FaEdit,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaSeedling,
  FaClipboardList,
  FaCamera,
  FaUserCircle,
} from "react-icons/fa";

const Profile = () => {
  const { user, singOutUser } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://krishilink-api-server.vercel.app/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setDbUser(data));
    }
  }, [user]);

  const handleSingOut = () => {
    singOutUser().then().catch();
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!dbUser?._id) {
      alert("User data not loaded yet!");
      return;
    }

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const phone = e.target.phone.value;
    const bio = e.target.bio.value;

    const updatedUser = {
      name,
      photo,
      bio,
      phone,
    };

    console.log("Updated Data:", updatedUser);

    fetch(`https://krishilink-api-server.vercel.app/user/${dbUser._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated:", data);

        setDbUser((prev) => ({
          ...prev,
          name,
          photo,
          bio,
          phone,
        }));
      });

    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">

      <div className="max-w-3xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-bold mb-4">
            <FaLeaf />
            KRISHILINK DASHBOARD
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            My <span className="text-green-600">Profile</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-green-100/60 border border-green-100">

          {/* Cover */}
          <div className="h-36 md:h-48 bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 relative">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "25px 25px"
              }}
            ></div>

            <div className="absolute top-5 right-6 text-white/30">
              <FaSeedling size={65} />
            </div>

            <div className="absolute bottom-5 left-6 text-white">
              <p className="text-sm font-medium text-green-100">
                Welcome Back!
              </p>
              <h2 className="text-2xl font-bold">
                Your Farmer Profile
              </h2>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-5 md:px-10 pb-8">

            <div className="flex flex-col items-center -mt-16">

              <div className="relative">
                <img
                  src={dbUser?.photo || user?.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-green-100"
                />

                <div className="absolute bottom-1 right-1 bg-green-600 text-white p-2 rounded-full border-2 border-white">
                  <FaLeaf size={13} />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-4 capitalize text-center">
                {dbUser?.name || user?.displayName}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-gray-500 text-sm">
                <FaEnvelope className="text-green-600" />
                {user?.email}
              </div>

              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-5 py-3 w-full text-center">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">
                  About Me
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dbUser?.bio || "No bio added yet. Tell us something about yourself!"}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                  <FaUser size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">
                    Full Name
                  </p>
                  <p className="text-gray-800 font-bold capitalize truncate">
                    {dbUser?.name || user?.displayName || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg">
                  <FaPhone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">
                    Phone Number
                  </p>
                  <p className="text-gray-800 font-bold">
                    {dbUser?.phone || "Not Added"}
                  </p>
                </div>
              </div>

            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

              <Link
                to="/myInterest"
                className="flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FaClipboardList size={19} />
                View Interests
              </Link>

              <Link
                to="/addCrops"
                className="flex items-center justify-center gap-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FaSeedling size={19} />
                Add New Crop
              </Link>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FaEdit />
                Edit Profile
              </button>

              <button
                onClick={handleSingOut}
                className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 font-bold py-4 rounded-xl transition-all duration-300"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-7 text-sm text-gray-400">
          <FaLeaf className="inline text-green-600 mr-1" />
          Growing Together with KrishiLink
        </div>

      </div>

      {/* Edit Profile Modal */}
      {openModal && (
        <dialog open className="modal modal-open bg-black/50 backdrop-blur-sm">

          <div className="modal-box max-w-lg rounded-2xl p-0 overflow-hidden bg-white">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaEdit size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-xl">
                    Edit Your Profile
                  </h3>
                  <p className="text-green-100 text-sm">
                    Update your personal information
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={dbUser?.name}
                  className="input input-bordered w-full bg-gray-50 focus:outline-green-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={dbUser?.photo}
                  className="input input-bordered w-full bg-gray-50 focus:outline-green-500"
                  placeholder="Photo URL"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  About Me / Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={dbUser?.bio}
                  className="textarea textarea-bordered w-full bg-gray-50 focus:outline-green-500"
                  placeholder="Write something about yourself..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={dbUser?.phone}
                  className="input input-bordered w-full bg-gray-50 focus:outline-green-500"
                  placeholder="Phone Number"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

                <button
                  type="button"
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-none rounded-xl"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none rounded-xl"
                >
                  <FaCamera />
                  Save Changes
                </button>

              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenModal(false)}>close</button>
          </form>

        </dialog>
      )}

    </div>
  );
};

export default Profile;
