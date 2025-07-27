import React from "react";
import { useLocation } from "react-router-dom";

const ViewCustomer = () => {
const location = useLocation();
const { customer } = location.state || {};
  if (!customer) return null;
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={customer.image}
          alt={customer.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
          <p className="text-gray-500 text-sm">{customer.email}</p>
          <p className="text-sm text-gray-600">Role: {customer.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-4 text-gray-700">
        <p><strong>Phone:</strong> {customer.phoneNo}</p>
        <p><strong>DOB:</strong> {new Date(customer.DOB).toLocaleDateString()}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Gender:</strong> {customer.gender}</p>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">🛒 Cart Items:</h3>
        {customer.cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items in cart.</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {customer.cart.map((item) => (
              <li key={item._id}>Product ID: {item.productId}, Qty: {item.quantity}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
