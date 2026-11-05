
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);

  const [myCrops, setMyCrops] = useState([]);
  const [editCrop, setEditCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);

      fetch(
        `https://krishilink-api-server.vercel.app/my-products?userEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setMyCrops(data))
        .catch((error) => {
          console.error(error);
          Swal.fire("Error!", "Failed to load your crops.", "error");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  // Delete Crop
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This crop will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#047857",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://krishilink-api-server.vercel.app/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyCrops((prev) =>
                prev.filter((crop) => crop._id !== id)
              );

              Swal.fire({
                title: "Deleted!",
                text: "Your crop has been removed.",
                icon: "success",
                confirmButtonColor: "#047857",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Failed to delete crop.", "error");
          });
      }
    });
  };

  // Update Crop
  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = {
      name: e.target.name.value,
      price: Number(e.target.price.value),
      quantity: Number(e.target.quantity.value),
      image: e.target.image.value,
      description: e.target.description.value,
    };

    fetch(`https://krishilink-api-server.vercel.app/products/${editCrop._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setMyCrops((prev) =>
            prev.map((c) =>
              c._id === editCrop._id ? { ...c, ...updated } : c
            )
          );

          Swal.fire({
            title: "Success!",
            text: "Crop updated successfully.",
            icon: "success",
            confirmButtonColor: "#047857",
          });

          setEditCrop(null);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error!", "Failed to update crop.", "error");
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12 sm:px-6 lg:px-10">

      {/* Background Decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-100 px-5 py-2 text-sm font-bold tracking-wide text-emerald-700">
            YOUR FARMING ACTIVITY
          </span>

          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
            My <span className="text-emerald-600">Posts</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Manage your crop listings, update product information and keep your marketplace organized.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              🌾
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Crop Posts
              </p>

              <h2 className="text-2xl font-extrabold text-emerald-700">
                {myCrops.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
              👨‍🌾
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Account
              </p>

              <h2 className="max-w-[220px] truncate text-lg font-extrabold text-gray-800">
                {user?.displayName || "Farmer"}
              </h2>
            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50">

          {/* Table Header */}
          <div className="flex flex-col gap-2 border-b border-emerald-100 bg-gradient-to-r from-emerald-700 to-green-600 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-xl font-extrabold text-white">
                Your Crop Listings
              </h2>

              <p className="mt-1 text-sm text-emerald-100">
                View and manage all your uploaded crops.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-bold text-white">
              {myCrops.length} Products
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center">
              <span className="loading loading-spinner loading-lg text-emerald-600"></span>
              <p className="mt-4 font-medium text-gray-500">
                Loading your crops...
              </p>
            </div>
          ) : myCrops.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-[350px] flex-col items-center justify-center px-5 py-12 text-center">

              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl">
                🌱
              </div>

              <h3 className="text-2xl font-extrabold text-gray-800">
                No Crops Found!
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                You haven't added any crops yet. Start sharing your agricultural products with the KrishiLink community.
              </p>

            </div>

          ) : (

            /* Responsive Table */
            <div className="overflow-x-auto">
              <table className="table w-full">

                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-800">
                    <th className="px-5 py-5">Image</th>
                    <th className="py-5">Crop Name</th>
                    <th className="py-5">Quantity</th>
                    <th className="py-5">Price</th>
                    <th className="py-5">Description</th>
                    <th className="py-5 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {myCrops.map((crop) => (
                    <tr
                      key={crop._id}
                      className="border-b border-gray-100 transition-colors duration-300 hover:bg-emerald-50/60"
                    >

                      {/* Image */}
                      <td className="px-5 py-4">
                        <div className="h-16 w-16 overflow-hidden rounded-xl border border-emerald-100 shadow-sm">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td>
                        <h3 className="font-bold text-gray-800">
                          {crop.name}
                        </h3>
                      </td>

                      {/* Quantity */}
                      <td>
                        <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                          {crop.quantity} kg
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="font-extrabold text-emerald-700">
                          ৳{crop.price}
                        </span>
                      </td>

                      {/* Description */}
                      <td>
                        <p className="max-w-[200px] text-sm leading-6 text-gray-500">
                          {crop.description?.slice(0, 40)}
                          {crop.description?.length > 40 ? "..." : ""}
                        </p>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => setEditCrop(crop)}
                            className="rounded-lg bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700 transition-all duration-300 hover:bg-amber-500 hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(crop._id)}
                            className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>

      {/* Edit Crop Modal */}
      {editCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl sm:p-8">

            {/* Modal Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                ✏️
              </div>

              <h2 className="text-2xl font-extrabold text-gray-800">
                Edit Your Crop
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Update your crop information below.
              </p>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdate} className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Crop Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={editCrop.name}
                  placeholder="Enter crop name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Price (BDT)
                  </label>

                  <input
                    type="number"
                    name="price"
                    defaultValue={editCrop.price}
                    placeholder="Enter price"
                    min="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Quantity (kg)
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    defaultValue={editCrop.quantity}
                    placeholder="Enter quantity"
                    min="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  defaultValue={editCrop.image}
                  placeholder="Enter image URL"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  defaultValue={editCrop.description}
                  placeholder="Write crop description..."
                  rows="4"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  required
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setEditCrop(null)}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 px-7 py-3 font-bold text-white shadow-md shadow-emerald-200 transition hover:from-emerald-800 hover:to-green-700 active:scale-95"
                >
                  Update Crop →
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyPosts;
