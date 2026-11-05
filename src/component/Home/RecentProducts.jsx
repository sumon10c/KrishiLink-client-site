
import React, { use } from 'react';
import RecentCrops from '../RecentCrops';

const RecentProducts = ({ recent, loading }) => {

    if (loading) return (
        <div className="flex justify-center items-center py-20 bg-[#f0fdf4]">
            <span className="loading loading-spinner loading-lg text-emerald-700"></span>
        </div>
    );

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] py-20 px-5 md:px-10">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto">

                {/* Section Heading */}
                <div className="text-center mb-14">

                    <span className="inline-block px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-[2px] uppercase border border-emerald-200">
                        🌱 Fresh From Our Farmers
                    </span>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#064e3b] mt-5 mb-5">
                        Recent Crops
                    </h1>

                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-8">
                        Discover the latest fresh crops directly from our trusted farmers. Explore quality products and connect with local agricultural communities.
                    </p>

                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-600 to-green-400 rounded-full mx-auto mt-6"></div>

                </div>

                {/* Crops Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {recent.map(crop => (
                        <RecentCrops crop={crop} key={crop._id} />
                    ))}

                </div>

                {/* Bottom Text */}
                <div className="text-center mt-14">

                    <p className="text-gray-500 font-medium">
                        Growing Together, Growing Better with
                        <span className="text-emerald-700 font-extrabold ml-1">
                            KrishiLink
                        </span>
                    </p>

                </div>

            </div>

        </section>
    );
};

export default RecentProducts;
