
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleAddCrop = (e) => {
    e.preventDefault();

    const crop = {
      name: e.target.name.value,
      type: e.target.type.value,
      unit: e.target.unit.value,
      location: e.target.location.value,
      image: e.target.image.value,
      quantity: Number(e.target.quantity.value),
      price: Number(e.target.price.value),
      description: e.target.description.value,
      userEmail: user.email,
      postDate: new Date(),
    };

    setLoading(true);

    fetch("https://krishilink-api-server.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crop),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Crop Added Successfully!",
            text: "Your crop has been published successfully.",
            timer: 2500,
            showConfirmButton: false,
          });

          e.target.reset();
          navigate("/myPost");
        }
      })
      .catch((err) => {
        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Something Went Wrong!",
          text: "Unable to add your crop. Please try again.",
          confirmButtonColor: "#047857",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12 sm:px-6 lg:px-10">

      {/* Background Decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl">

        {/* Page Header */}
        <div className="mb-10 text-center">

          <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-100 px-5 py-2 text-sm font-bold tracking-wide text-emerald-700">
            KRISHILINK MARKETPLACE
          </span>

          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
            Add New <span className="text-emerald-600">Crop</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Share your agricultural products with the community and connect with potential buyers.
          </p>

        </div>

        {/* Main Form Card */}
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50">

          {/* Card Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 to-green-600 px-6 py-7 sm:px-10">

            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-white/10"></div>

            <div className="relative flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-3xl backdrop-blur-sm">
                🌱
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                  Crop Information
                </h2>

                <p className="mt-1 text-sm text-emerald-100">
                  Fill in the details of your agricultural product.
                </p>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAddCrop} className="space-y-6 p-6 sm:p-10">

            {/* Basic Information */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-gray-800">
                <span className="h-6 w-1.5 rounded-full bg-emerald-500"></span>
                Basic Information
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Crop Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Crop Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Fresh Rice"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                {/* Crop Type */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Crop Type *
                  </label>

                  <input
                    type="text"
                    name="type"
                    placeholder="e.g. Vegetable, Grain"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Measurement Unit *
                  </label>

                  <input
                    type="text"
                    name="unit"
                    placeholder="e.g. kg / piece"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Jashore, Bangladesh"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Price & Quantity */}
            <div className="border-t border-gray-100 pt-6">

              <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-gray-800">
                <span className="h-6 w-1.5 rounded-full bg-emerald-500"></span>
                Price & Quantity
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Quantity */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Available Quantity *
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    min="1"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Price (BDT) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    placeholder="Enter product price"
                    min="0"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Image */}
            <div className="border-t border-gray-100 pt-6">

              <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-gray-800">
                <span className="h-6 w-1.5 rounded-full bg-emerald-500"></span>
                Product Image
              </h3>

              <label className="mb-2 block text-sm font-bold text-gray-700">
                Image URL *
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://example.com/crop-image.jpg"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />

              <p className="mt-2 text-xs text-gray-400">
                Provide a valid image URL for your crop.
              </p>

            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-6">

              <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-gray-800">
                <span className="h-6 w-1.5 rounded-full bg-emerald-500"></span>
                Product Description
              </h3>

              <label className="mb-2 block text-sm font-bold text-gray-700">
                Description *
              </label>

              <textarea
                name="description"
                placeholder="Write something about your crop, quality, freshness and other details..."
                rows="5"
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              ></textarea>

            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-100 pt-6">

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-800 hover:to-green-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding Crop...
                  </>
                ) : (
                  <>
                    Add Crop to Marketplace
                    <span className="text-xl">→</span>
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                By adding this crop, you are sharing your product with the KrishiLink community.
              </p>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddCrops;
