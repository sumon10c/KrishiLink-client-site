import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Welcome to KrishiLink",
    description:
      "KrishiLink is your all-in-one platform that connects farmers, traders, and consumers seamlessly. Explore opportunities, share insights, and grow together in the modern agricultural ecosystem.",
    image: "https://i.ibb.co/hJYQnZ1C/danh-vo-Ivn-SPK5-Q-e-Q-unsplash.jpg",
  },
  {
    id: 2,
    title: "Grow Your Crops",
    description:
      "Discover expert tips, modern farming techniques, and useful resources to maximize your crop yield. KrishiLink helps you take informed decisions to make your farming more efficient and profitable.",
    image:
      "https://i.ibb.co/xS70LNSd/sandy-ravaloniaina-Y678onx-Fo-JI-unsplash.jpg",
  },
  {
    id: 3,
    title: "Sell & Trade Easily",
    description:
      "Connect directly with buyers and sellers in your region. Post your crops, negotiate deals, and expand your market without any middlemen, making trading faster, easier, and more profitable.",
    image: "https://i.ibb.co/zHjmFHtN/varun-verma-s-UK5-CSA183g-unsplash.jpg",
  },
  {
    id: 4,
    title: "Learn Modern Farming",
    description:
      "Access step-by-step tutorials, educational videos, and expert advice to adopt modern farming methods. Stay ahead with technology-driven solutions that enhance productivity and sustainability.",
    image:
      "https://i.ibb.co/3P2kW5Y/devi-puspita-amartha-yahya-Fkoy-TJ24uz8-unsplash.jpg",
  },
  {
    id: 5,
    title: "Stay Updated",
    description:
      "Keep up with the latest agricultural news, market prices, and trends. KrishiLink ensures you are always informed so you can plan your farming strategies wisely and stay competitive.",
    image: "https://i.ibb.co/B5PR2Kyd/dusan-ristic-64-ALWJ6-EC8-I-unsplash.jpg",
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
    <div className="bg-white">
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5]">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-16 lg:py-24 min-h-[650px] flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-wide mb-6 border border-emerald-200">
              🌱 SMART AGRICULTURE PLATFORM
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#064e3b] leading-tight mb-6">
              {slides[current].title}
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-8 mb-9 max-w-xl mx-auto lg:mx-0">
              {slides[current].description}
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={prevSlide}
                className="px-7 py-3.5 rounded-xl font-bold text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400 shadow-sm transition-all duration-300"
              >
                ← Prev
              </button>

              <button
                onClick={nextSlide}
                className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#047857] to-[#059669] hover:from-[#065f46] hover:to-[#047857] shadow-lg shadow-emerald-800/20 hover:shadow-emerald-800/30 transition-all duration-300"
              >
                Next →
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center lg:justify-start mt-9 gap-3">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full cursor-pointer transition-all duration-500 ${
                    current === index
                      ? "bg-emerald-700 w-10"
                      : "bg-emerald-300 hover:bg-emerald-500 w-2.5"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-[35px] blur-xl"></div>

            <div className="relative overflow-hidden rounded-[28px] shadow-2xl shadow-emerald-900/20 border-[6px] border-white">
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-[320px] md:h-[480px] object-cover transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/40 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-4 py-2 rounded-lg bg-white/90 backdrop-blur-md text-emerald-800 font-bold text-sm shadow-lg">
                  🌿 Growing Together, Growing Better
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Crops */}
      <section className="py-20 px-5 md:px-10 bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-emerald-700 font-bold tracking-[3px] text-sm uppercase">
              Explore Our Agriculture
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#064e3b] mt-4 mb-5">
              Featured Crops
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-8">
              Explore some of the top crops grown by our farmers and find out
              how you can benefit.
            </p>

            <div className="w-20 h-1.5 bg-emerald-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wheat */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-emerald-100">
              <div className="overflow-hidden">
                <img
                  src="https://i.ibb.co.com/FLwvz2yS/kovacs-mate-9hn-FVu-Qmh94-unsplash.jpg"
                  alt="Wheat"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-7">
                <span className="text-emerald-700 text-sm font-bold">
                  🌾 FARMING
                </span>
                <h3 className="text-2xl font-bold text-[#064e3b] mt-3 mb-3">
                  Wheat
                </h3>
                <p className="text-gray-600 leading-7">
                  High-quality wheat grown using sustainable methods.
                </p>
              </div>
            </div>

            {/* Rice */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-emerald-100">
              <div className="overflow-hidden">
                <img
                  src="https://i.ibb.co.com/Lhb4XjMh/kseniya-nekrasova-M5h-X7319-EBA-unsplash.jpg"
                  alt="Rice"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-7">
                <span className="text-emerald-700 text-sm font-bold">
                  🌱 AGRICULTURE
                </span>
                <h3 className="text-2xl font-bold text-[#064e3b] mt-3 mb-3">
                  Rice
                </h3>
                <p className="text-gray-600 leading-7">
                  Premium rice varieties cultivated by our trusted farmers.
                </p>
              </div>
            </div>

            {/* Vegetables */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-emerald-100">
              <div className="overflow-hidden">
                <img
                  src="https://i.ibb.co.com/q35B7T7y/inigo-de-la-maza-s285s-Dw5-Ikc-unsplash.jpg"
                  alt="Vegetables"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-7">
                <span className="text-emerald-700 text-sm font-bold">
                  🥬 FRESH FOOD
                </span>
                <h3 className="text-2xl font-bold text-[#064e3b] mt-3 mb-3">
                  Vegetables
                </h3>
                <p className="text-gray-600 leading-7">
                  Fresh vegetables delivered directly from farms to your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#065f46] py-20 px-5 md:px-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-300/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-emerald-200 font-bold tracking-[3px] uppercase text-sm">
            Be Part Of Something Great
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-5 mb-6">
            Join Our Community
          </h2>

          <p className="text-emerald-50/90 text-base md:text-lg leading-8 max-w-2xl mx-auto mb-10">
            Connect with thousands of farmers, traders, and experts. Share your
            experience and learn from others.
          </p>

          <button className="px-9 py-4 rounded-xl bg-white text-emerald-800 font-extrabold text-lg shadow-xl hover:bg-emerald-100 hover:scale-105 transition-all duration-300">
            Get Started →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Banner;
