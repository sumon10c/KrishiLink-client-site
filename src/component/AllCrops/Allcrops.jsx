import React, { useEffect, useState } from "react";
import CropCard from "./CropCard";

const Allcrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setCrops(data))

      .catch((error) => console.log(error));
  }, []);

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
