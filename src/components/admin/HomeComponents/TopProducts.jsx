import React from 'react';
import { TrendingUp, Package } from 'lucide-react';

export const TopProducts = ({ topThreeProducts }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Top 3 Products</h2>
      </div>

      <div className="space-y-4">
        {topThreeProducts && topThreeProducts.length > 0 ? (
          topThreeProducts.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <span className="text-blue-600 font-bold text-lg">
                    #{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                   Sold Count: {product.soldCount}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  ₹{product.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Package className="w-12 h-12 mb-2" />
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};