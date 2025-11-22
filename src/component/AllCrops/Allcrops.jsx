import React, { useEffect, useState } from "react";
import CropCard from "./CropCard";

const Allcrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
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
    <div>
      <h1>All Crops</h1>
      <div className="grid md:grid-cols-3 w-max mx-auto gap-8 mt-5">
        {crops.map((crop) => (
          <CropCard key={crop._id} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default Allcrops;
