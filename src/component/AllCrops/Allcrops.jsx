
import React, { useEffect, useState } from "react";
import CropCard from "./CropCard";

const Allcrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://krishilink-api-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-[#f0fdf4]">
        <span className="loading loading-spinner loading-lg text-emerald-700"></span>
        <p className="text-emerald-800 font-semibold mt-4">
          Loading Fresh Crops...
        </p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] py-16 px-5 md:px-10">

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">

          <span className="inline-block px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-[3px] uppercase border border-emerald-200">
            🌱 Smart Agriculture Platform
          </span>

          <h1 className="font-extrabold text-4xl md:text-5xl text-[#064e3b] mt-5 mb-4">
            KRISHI<span className="text-emerald-600">LINK</span>
          </h1>

          <h2 className="font-bold text-2xl md:text-3xl text-emerald-800 mb-4">
            Explore All Crops
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-8">
            Discover fresh and quality crops directly from our trusted farmers.
            Find your desired products and connect with local sellers.
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-600 to-green-400 rounded-full mx-auto mt-6"></div>

        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">

          <div className="relative group">

            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>

            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">

              <span className="pl-5 text-emerald-600 text-2xl">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search your favorite crops..."
                className="input w-full h-16 border-none outline-none bg-transparent text-gray-700 text-base md:text-lg focus:outline-none focus:border-none focus:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="pr-5">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-lg">
                  SEARCH
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {crops.filter((crop) =>
            crop.name.toLowerCase().includes(search.toLowerCase())
          ).length > 0 ? (

            crops
              .filter((crop) =>
                crop.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))

          ) : (

            <div className="col-span-full flex flex-col items-center justify-center py-16 px-5 bg-white/80 rounded-3xl border border-emerald-100 shadow-sm">

              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-5">
                🌾
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-[#064e3b] mb-3">
                Crop Not Found!
              </h3>

              <p className="text-gray-500 text-center text-base">
                Sorry, we couldn't find any crops matching your search.
              </p>

              <p className="text-emerald-700 font-semibold mt-2">
                Try searching with another crop name.
              </p>

            </div>

          )}

        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">

          <p className="text-gray-500 font-medium">
            Growing Together, Growing Better with
            <span className="text-emerald-700 font-extrabold ml-1">
              KrishiLink 🌱
            </span>
          </p>

        </div>

      </div>

    </section>
  );
};

export default Allcrops;
