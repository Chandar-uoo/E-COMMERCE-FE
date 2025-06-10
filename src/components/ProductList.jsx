import React from 'react';
import ProductCard from './ProductCard';

const dummyProducts = [
  { id: 1, name: 'Canon EOS R6', price: 2499.99 },
  { id: 2, name: 'Sony Alpha a7 III', price: 1999.99 },
  { id: 3, name: 'Nikon Z6 II', price: 1799.99 },
  { id: 4, name: 'Fujifilm X-T5', price: 1699.99 },
  { id: 5, name: 'Panasonic Lumix S5', price: 1499.99 },
  { id: 6, name: 'DJI Mavic Air 2', price: 799.99 },
  { id: 7, name: 'GoPro HERO11', price: 399.99 },
  { id: 8, name: 'Sigma 24-70mm f/2.8', price: 1099.99 },
];

const ProductList = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
