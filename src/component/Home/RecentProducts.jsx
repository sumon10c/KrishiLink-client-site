import React, { use } from 'react';
import RecentCrops from '../RecentCrops';

const RecentProducts = ({recentProductsPromise}) => {
    const recentProducts = use(recentProductsPromise)
    console.log(recentProducts)
    return (
        <div className='p-4 bg-gradient-to-r from-red-600 to-[#00c853]'>
        <div>
            <h1 className='text-center md:text-5xl font-bold text-white mb-3'>Recent Crops</h1>
        </div>
        <div className='grid md:grid-cols-3 w-max mx-auto gap-8 mt-5'>
        {
            recentProducts.map(crop=><RecentCrops key={crop._id} crop={crop}></RecentCrops>)
        }
        </div>
        </div>
    );
};

export default RecentProducts;