import React from 'react';

const RecentCrops = ({crop}) => {
    const {image,name,pricePerUnit,type,description}=crop;
    return (
        <div className="card bg-base-100 w-96 shadow-sm ">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body bg-gradient-to-r from-[#ffe600] to-[#00c853]">
          <h2 className="card-title text-white font-bold text-3xl">Name : {name}</h2>
          <h2 className='text-white font-bold text-2xl'>Type : {type}</h2>
          <h1 className='text-white font-bold'>Price-PerUnit : {pricePerUnit} Taka</h1>
          <p className='text-white font-semibold'>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-gradient-to-r from-[#ffe600] to-[#00c853] hover:from-red-600 hover:to-[#00c853] text-white">View Detalis</button>
          </div>
        </div>
      </div>
    );
};

export default RecentCrops;