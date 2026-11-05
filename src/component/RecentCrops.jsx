
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const RecentCrops = ({ crop }) => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleDetails = () => {
    if (user) {
      navigate(`/cropDetails/${_id}`);
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login",
      })
      navigate('/login', { state: { from: `/cropDetails/${_id}` } });
    }
  }

  const { image, name, pricePerUnit, type, description, _id } = crop;

  return (
    <div className="group card bg-white w-full max-w-96 mx-auto rounded-2xl overflow-hidden border border-emerald-100 shadow-md hover:shadow-2xl hover:shadow-emerald-900/15 hover:-translate-y-2 transition-all duration-500">

      {/* Crop Image */}
      <figure className="relative overflow-hidden h-64">

        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={image}
          alt="Crop"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>

        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-emerald-800 px-4 py-2 rounded-full text-sm font-bold shadow-md">
          🌱 {type}
        </span>

      </figure>

      {/* Card Content */}
      <div className="card-body p-6 bg-gradient-to-br from-white via-white to-emerald-50">

        <div className="flex items-center justify-between gap-2 mb-2">

          <h2 className="card-title text-[#064e3b] font-extrabold text-2xl">
            {name}
          </h2>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            Fresh Crop
          </span>

        </div>

        {/* Price */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-2">

          <p className="text-sm font-semibold text-gray-500 mb-1">
            Price Per Unit
          </p>

          <h3 className="text-2xl font-extrabold text-emerald-700">
            ৳ {pricePerUnit}
            <span className="text-sm font-semibold text-gray-500 ml-1">
              / Unit
            </span>
          </h3>

        </div>

        {/* Description */}
        <p className="text-gray-600 font-medium leading-7 text-sm line-clamp-3 min-h-[60px]">
          {description}
        </p>

        {/* Button */}
        <div className="card-actions mt-4">

          <button
            onClick={handleDetails}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#047857] to-[#059669] hover:from-[#065f46] hover:to-[#047857] shadow-lg shadow-emerald-800/20 hover:shadow-emerald-800/30 transition-all duration-300 hover:scale-[1.02]"
          >
            View Crop Details →
          </button>

        </div>

      </div>

    </div>
  );
};

export default RecentCrops;
