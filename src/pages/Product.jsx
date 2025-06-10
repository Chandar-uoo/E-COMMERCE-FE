import React from 'react'

const Product = () => {
  const product = {
    title: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1580894908361-95b203ef99c4?auto=format&fit=crop&w=1350&q=80",
    description:
      "Experience premium sound quality with our top-rated noise cancelling headphones. Designed for comfort and long listening sessions, these headphones block out distractions so you can fully immerse yourself in your favorite music or podcast."
  }

  return (
    <div className="min-h-screen bg-gray-200">
      
      <main className="p-12">
        <div className="max-w-6xl mx-auto bg-gray-400 rounded-lg shadow-lg p-12">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight text-center mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-gray-500 text-center">Explore the best of {product.category}</p>
          </div>

          <div className="  flex items-center border-2 w-52 border-black mb-12">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Category</h2>
              <p className="text-xl font-medium text-gray-800">{product.category}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Price</h2>
              <p className="text-3xl font-bold text-green-600">${product.price}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Description</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="text-center">
          <button className="px-12 py-4 bg-indigo-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-indigo-600 transition">
              Add to Cart
            </button> <button className="px-12 py-4 bg-green-400 text-white text-xl font-medium rounded-lg shadow-md hover:bg-indigo-600 transition">
              buy
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Product;
