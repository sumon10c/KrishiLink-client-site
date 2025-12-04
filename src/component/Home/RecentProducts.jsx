import React, { use } from 'react';
import RecentCrops from '../RecentCrops';

const RecentProducts = ({ recent, loading }) => {

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className='p-4 bg-gradient-to-r from-red-600 to-[#00c853]'>
            <h1 className='text-center md:text-5xl font-bold text-white mb-3'>
                Recent Crops
            </h1>

            <div className='grid md:grid-cols-3 gap-8 mt-5'>
                {recent.map(crop => (
                    <RecentCrops crop={crop} key={crop._id} />
                ))}
            </div>
        </div>
    );
};

export default RecentProducts;