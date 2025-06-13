import React from 'react';
import ProductCard from './ProductCard';



const ProductList = ({products}) => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
