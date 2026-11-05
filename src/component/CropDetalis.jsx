
import React, { useRef, useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const CropDetalis = () => {
  const [buyQuantity, setBuyQuantity] = useState("");

  const interestModalRef = useRef(null);

  const { user } = useContext(AuthContext);
  const product = useLoaderData();

  const {
    image,
    name,
    pricePerUnit,
    type,
    description,
    quantity,
    location,
    _id,
  } = product;

  const totalPrice = Number(buyQuantity || 0) * Number(pricePerUnit || 0);

  const handleModal = () => {
    interestModalRef.current.showModal();
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();

    const buyerName = e.target.name.value;
    const email = e.target.email.value;
    const cropName = e.target.cropName.value;
    const selectedQuantity = Number(e.target.quantity.value);
    const message = e.target.message.value;

    // Quantity Validation
    if (!selectedQuantity || selectedQuantity <= 1) {
      interestModalRef.current.close();

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please select quantity more than 1",
        timer: 3000,
        showConfirmButton: false,
      });

      return;
    }

    const newInterest = {
      product: _id,
      buyer_name: buyerName,
      buyer_email: email,
      crop_name: cropName,
      quantity: selectedQuantity,
      status: "panding",
    };

    fetch("https://krishilink-api-server.vercel.app/interest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Interest Submitted!",
          text: "Visit My Interest site.",
          timer: 5000,
          showConfirmButton: false,
        });

        console.log("after placing data", data);

        interestModalRef.current.close();
        setBuyQuantity("");
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Submission Failed!",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12 sm:px-6 lg:px-10">

      {/* Background Decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-100 px-5 py-2 text-sm font-bold tracking-wide text-emerald-700">
            KRISHILINK MARKETPLACE
          </span>

          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
            Crop <span className="text-emerald-600">Details</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Discover fresh agricultural products and connect directly with farmers.
          </p>
        </div>

        {/* Main Product Card */}
        <div className="grid overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/60 lg:grid-cols-2">

          {/* Image Section */}
          <div className="group relative min-h-[300px] overflow-hidden sm:min-h-[450px]">
            <img
              src={image}
              alt={name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>

            <div className="absolute left-6 top-6">
              <span className="rounded-full border border-white/30 bg-emerald-700/90 px-5 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                {type}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-1 text-sm font-medium text-emerald-100">
                Available Product
              </p>

              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                {name}
              </h2>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

            <div className="mb-6">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Product Information
              </span>

              <h2 className="mt-2 text-3xl font-extrabold text-gray-800 sm:text-4xl">
                {name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                {description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Price Per Unit
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-emerald-700">
                  ৳{pricePerUnit}
                </h3>

                <span className="text-sm font-medium text-gray-500">
                  / Unit
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50">
                <p className="text-xs font-semibold text-gray-400">
                  CROP TYPE
                </p>

                <h3 className="mt-2 font-bold text-gray-800">
                  {type}
                </h3>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50">
                <p className="text-xs font-semibold text-gray-400">
                  AVAILABLE QUANTITY
                </p>

                <h3 className="mt-2 font-bold text-gray-800">
                  {quantity} kg
                </h3>
              </div>

              <div className="col-span-2 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50">
                <p className="text-xs font-semibold text-gray-400">
                  PRODUCT LOCATION
                </p>

                <h3 className="mt-2 flex items-center gap-2 font-bold text-gray-800">
                  <span className="text-emerald-600">📍</span>
                  {location}
                </h3>
              </div>

            </div>

            {/* Interest Button */}
            <button
              onClick={handleModal}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-800 hover:to-green-700 hover:shadow-xl active:scale-95"
            >
              My Interest
              <span className="text-xl">→</span>
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Connect with farmers and express your interest.
            </p>
          </div>
        </div>
      </div>

      {/* Interest Modal */}
      <dialog
        ref={interestModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl sm:p-8">

          {/* Modal Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🌱
            </div>

            <h3 className="text-2xl font-extrabold text-gray-800">
              Your Interest
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form to express your interest in this crop.
            </p>
          </div>

          <form onSubmit={handleInterestSubmit}>
            <fieldset className="space-y-4">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Your Name
                </label>

                <input
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  readOnly
                  defaultValue={user?.displayName || ""}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  readOnly
                  defaultValue={user?.email || ""}
                />
              </div>

              {/* Crop Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Crop Name
                </label>

                <input
                  name="cropName"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Enter Your Crop Name"
                  required
                  defaultValue={name}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Quantity (kg)
                </label>

                <input
                  name="quantity"
                  type="number"
                  min="2"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Enter quantity"
                  value={buyQuantity}
                  onChange={(e) =>
                    setBuyQuantity(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Message
                </label>

                <input
                  name="message"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Send any message"
                />
              </div>

              {/* Total Price */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-gray-600">
                  Estimated Total Price
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-emerald-700">
                  ৳{totalPrice.toLocaleString()}
                </h3>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 py-4 font-bold text-white shadow-md transition-all duration-300 hover:from-emerald-800 hover:to-green-700 active:scale-95"
              >
                Submit Your Interest →
              </button>

            </fieldset>
          </form>

          {/* Close Button */}
          <div className="mt-4">
            <form method="dialog">
              <button
                type="submit"
                className="w-full rounded-xl border border-gray-200 py-3 font-bold text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Close
              </button>
            </form>
          </div>

        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
};

export default CropDetalis;
