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
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-r from-green-800 to-[#00c853] p-2 ">
      <div className="text-center">
        <h1 className="font-bold text-3xl text-white mt-2">KRISHI LINK</h1>

        <h1 className="font-bold text-2xl text-white">All Crops</h1>
        <input
          type="text"
          placeholder="Search Your Crops"
          className="input mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 w-max mx-auto gap-8 mt-5">
        {crops.filter((crop) =>
          crop.name.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          crops
            .filter((crop) =>
              crop.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((crop) => <CropCard key={crop._id} crop={crop} />)
        ) : (
          <p className="text-white text-3xl font-bold text-center col-span-3">
           Crop Not Found, Try Again
          </p>
        )}
      </div>
    </div>
  );
};

export default Allcrops;
