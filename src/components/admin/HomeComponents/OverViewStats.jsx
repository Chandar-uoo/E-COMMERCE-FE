import React from 'react'
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";

export const OverViewStats = ({
  totalProducts,
  totalCustomers,
  totalRevenue
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Products */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-blue-100">
          <div className="bg-blue-100 p-2 rounded-full">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-xl font-bold text-blue-700">{totalProducts}</h3>
          </div>
        </div>

        
        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-green-100">
          <div className="bg-green-100 p-2 rounded-full">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <h3 className="text-xl font-bold text-green-700">{totalCustomers}</h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-yellow-100">
          <div className="bg-yellow-100 p-2 rounded-full">
            <DollarSign className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-xl font-bold text-yellow-700">
              ₹{totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}