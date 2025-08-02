

const Banner = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16 px-6 lg:px-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto">
        {/* TEXT CONTENT */}
        <div className="mb-10 lg:mb-0 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Chanel Coco Noir Eau De
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.
          </p>
      
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-64 lg:h-96 flex justify-center items-center">
          <img
            src="https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
            alt="Chanel Coco Noir"
            className="w-full max-w-xs rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
