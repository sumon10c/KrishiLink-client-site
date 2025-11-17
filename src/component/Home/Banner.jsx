import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Welcome to KrishiLink",
    description:
      "KrishiLink is your all-in-one platform that connects farmers, traders, and consumers seamlessly. Explore opportunities, share insights, and grow together in the modern agricultural ecosystem.",
    image: "https://i.ibb.co.com/hJYQnZ1C/danh-vo-Ivn-SPK5-Q-e-Q-unsplash.jpg",
  },
  {
    id: 2,
    title: "Grow Your Crops",
    description:
      "Discover expert tips, modern farming techniques, and useful resources to maximize your crop yield. KrishiLink helps you take informed decisions to make your farming more efficient and profitable.",
    image: "https://i.ibb.co.com/xS70LNSd/sandy-ravaloniaina-Y678onx-Fo-JI-unsplash.jpg",
  },
  {
    id: 3,
    title: "Sell & Trade Easily",
    description:
      "Connect directly with buyers and sellers in your region. Post your crops, negotiate deals, and expand your market without any middlemen, making trading faster, easier, and more profitable.",
    image: "https://i.ibb.co.com/zHjmFHtN/varun-verma-s-UK5-CSA183g-unsplash.jpg",
  },
  {
    id: 4,
    title: "Learn Modern Farming",
    description:
      "Access step-by-step tutorials, educational videos, and expert advice to adopt modern farming methods. Stay ahead with technology-driven solutions that enhance productivity and sustainability.",
    image: "https://i.ibb.co.com/3P2kW5Y/devi-puspita-amartha-yahya-Fkoy-TJ24uz8-unsplash.jpg",
  },
  {
    id: 5,
    title: "Stay Updated",
    description:
      "Keep up with the latest agricultural news, market prices, and trends. KrishiLink ensures you are always informed so you can plan your farming strategies wisely and stay competitive.",
    image: "https://i.ibb.co.com/B5PR2Kyd/dusan-ristic-64-ALWJ6-EC8-I-unsplash.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-9 bg-gradient-to-r from-yellow-400 to-green-400 md:min-h-screen">
      
     
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl text-green-600 font-bold mb-4">
          {slides[current].title}
        </h1>

        <p className="text-lg mb-6 font-semibold">
          {slides[current].description}
        </p>

       
        <div className="flex justify-center lg:justify-start gap-4">
          <button
            onClick={prevSlide}
            className="px-4 py-2 font-bold bg-gradient-to-r from-red-600 to-[#00c853] text-white rounded hover:bg-green-700"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="px-4 py-2 font-bold bg-gradient-to-r from-red-600 to-[#00c853] text-white rounded hover:bg-green-700"
          >
            Next
          </button>
        </div>

      
        <div className="flex justify-center lg:justify-start mt-6 gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-4 w-4 rounded-full cursor-pointer transition-all duration-300 ${
                current === index
                  ? "bg-green-700 scale-110"
                  : "bg-white opacity-60"
              }`}
            ></div>
          ))}
        </div>
      </div>

      
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default Banner;
