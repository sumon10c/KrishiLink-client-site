
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const CropCard = ({ crop }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { image, name, pricePerUnit, type, description, _id } = crop;

  const handleDetails = () => {
    if (user) {
      navigate(`/cropDetails/${_id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login",
        confirmButtonColor: "#047857",
      });

      navigate("/login", {
        state: { from: `/cropDetails/${_id}` },
      });
    }
  };

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100">

      {/* Image Section */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={name}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent"></div>

        {/* Crop Type */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-emerald-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
            {type}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 rounded-xl border border-white/30 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
          <p className="text-xs font-medium text-gray-500">
            Price Per Unit
          </p>
          <h3 className="text-xl font-extrabold text-emerald-700">
            ৳{pricePerUnit}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6">

        <div className="mb-3 flex items-center gap-2">
          <span className="h-6 w-1.5 rounded-full bg-emerald-500"></span>
          <h2 className="line-clamp-1 text-xl font-extrabold text-gray-800 sm:text-2xl">
            {name}
          </h2>
        </div>

        <p className="mb-5 line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-500">
          {description}
        </p>

        {/* Bottom Section */}
        <div className="flex items-center justify-between border-t border-emerald-100 pt-4">

          <div>
            <p className="text-xs font-medium text-gray-400">
              Available Crop
            </p>
            <p className="font-bold text-emerald-700">
              {type}
            </p>
          </div>

          <button
            onClick={handleDetails}
            className="group/btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-all duration-300 hover:from-emerald-800 hover:to-green-700 hover:shadow-lg active:scale-95"
          >
            Crop Details
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default CropCard;
