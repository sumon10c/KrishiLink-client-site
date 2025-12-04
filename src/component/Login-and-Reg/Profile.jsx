import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, NavLink } from "react-router";

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
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-r from-[#ffe600] to-[#00c853] hover:from-red-600 hover:to-[#00c853] shadow-xl rounded-xl p-6 mb-10">
      <div className="flex flex-col items-center">
        <img
          src={dbUser?.photo || user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full border shadow"
        />

        <h1 className="text-2xl text-white font-bold mt-3 capitalize">
          {dbUser?.name || user?.displayName}
        </h1>

        <h1 className="text-1xl text-white font-bold mt-3 capitalize">
          <span className="font-bold">Bio:</span>{" "}
          {dbUser?.bio || "No bio added yet"}
        </h1>
        <p className="text-white">{user?.email}</p>
      </div>

      <div className="mt-6">
        {user ? (
          <div>
            <div className="flex justify-center mb-3">
              <Link to="/myInterest">
                <h1 className="font-bold text-blue-100 mr-4">View Interests</h1>
              </Link>
              <Link to="/addCrops">
                <h1 className="font-bold text-blue-100">Add New Crop</h1>
              </Link>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="btn bg-blue-600 text-white w-full"
            >
              Edit Profile
            </button>

            <button
              onClick={handleSingOut}
              className="btn bg-red-600 text-white w-full mt-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <NavLink to="/login">
              <button className="btn bg-gradient-to-r from-[#ffe600] to-[#00c853] text-white font-bold">
                Log In
              </button>
            </NavLink>

            <NavLink to="/register">
              <button className="btn bg-gradient-to-r from-[#ffe600] to-[#00c853] text-white font-bold">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>

      {openModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-3">Edit Profile</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={dbUser?.name}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                defaultValue={dbUser?.photo}
                className="input input-bordered w-full"
                placeholder="Photo URL"
              />

              <label className="label">Add Bio</label>
              <input
                type="text"
                name="bio"
                defaultValue={dbUser?.bio}
                className="input input-bordered w-full"
                placeholder="Add Your Bio"
              />

              <label className="label">Phone Number</label>
              <input
                type="text"
                name="phone"
                defaultValue={dbUser?.phone}
                className="input input-bordered w-full"
                placeholder="Phone Number"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn bg-blue-600 text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
