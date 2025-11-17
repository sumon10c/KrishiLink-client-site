import React from 'react';
import { useLoaderData } from 'react-router';

const CropDetalis = () => {
    const product = useLoaderData()
    console.log(product);
    const {image,name,pricePerUnit,type,description}=product
    return (
        <div className="hero bg-base-200 min-h-screen bg-gradient-to-r from-green-800 to-green-500">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={image}
            className="w-[450px] h-[450px] md:ml-[-200px] rounded-lg shadow-2xl"
          />
          <div className='md:ml-[70px]'>
            <h1 className="text-5xl text-white font-bold">Name : {name}</h1>
            <h1 className='mt-3 text-white font-bold text-3xl'> Type : {type}</h1>
            <h1 className='mt-3 font-bold text-white'>Price-PerUnit : {pricePerUnit} Taka</h1>
            <p className="py-6 text-white font-semibold">
              {description}
            </p>
            <button className="btn text-white bg-gradient-to-r  from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 font-bold">My Interest</button>
          </div>
        </div>
      </div>
    );
};

export default CropDetalis;