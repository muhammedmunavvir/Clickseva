import React from "react";
import { NavLink } from "react-router-dom";

export const Heropage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-400 to-purple-500 text-white py-10 px-4 sm:py-16 sm:px-6 md:py-20 md:px-10 relative overflow-hidden">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start p-4 sm:p-6 md:p-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
            Welcome to clickstore!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 animate__animated animate__fadeIn">
            From gadgets to groceries, everything you need in one place!
          </p>
          <NavLink
            to="/Allproducts"
            className="bg-white text-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow hover:bg-gray-200 transition duration-300 animate__animated animate__bounce"
          >
            Shop Now
          </NavLink>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 h-1/4 justify-center mt-8 ">
          <div className="flex flex-col gap-4 items-center">
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/71hlbslxrAL.jpg"
              alt="Electronics Product"
              className="w-48 h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 mr-44"
            />
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/71v8Twt4+nL._AC_SL1500_.jpg"
              alt="Groceries Product"
              className="w-48 h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ml-44"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className=""></div>
      </section>

      {/* Categories Section */}
      <section className="py-10 px-4 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6"></h2>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* Dog Category */}
          <div className="bg-gray-100 rounded-lg shadow-lg m-4 p-6 flex flex-col items-center transition-transform transform hover:scale-105">
            <img
              src="https://i.etsystatic.com/14487627/r/il/660f3b/3856034732/il_fullxfull.3856034732_rkoy.jpg"
              alt="Dog Category"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">grocery</h3>
            <NavLink
              to="/products/grocery"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Shop Now  
            </NavLink>
          </div>

          {/* Cat Category */}
          <div className="bg-gray-100 rounded-lg shadow-lg m-4 p-6 flex flex-col items-center transition-transform transform hover:scale-105">
            <img
              src="https://m.media-amazon.com/images/I/71QgPXiSYnL.jpg"
              alt="Cat Category"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              electronics
            </h3>
            <NavLink
              to="/products/electronics"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Shop Now
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
