import React from 'react';

const Banner = () => {
  return (
    <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to RetailX
        </h1>
        <p className="text-xl text-gray-600">
          Discover Your Product At Perfect Prices
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-800 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;