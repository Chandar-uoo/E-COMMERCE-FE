import React from "react";
import { useLocation } from "react-router-dom";

const ViewOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  if (!order) return null;
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-purple-700">
        Order ID: {order._id}
      </h2>
      <p className="text-black text-sm">User ID: {order.userId}</p>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg"
          >
            <img
              src={item.productId.img}
              alt={item.productId.ProductName}
              className="w-16 h-16 rounded border"
            />
            <div>
              <p className="font-semibold">{item.productId.ProductName}</p>
              <p className="text-sm text-black">Qty: {item.quantity}</p>
              <p className="text-sm text-black">₹ {item.productId.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 text-black gap-4 text-sm mt-4">
        <p>
          <strong>Total Price:</strong> ₹{order.totalPrice}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
        <p>
          <strong>Payment:</strong> {order.paymentStatus} ({order.payMethod})
        </p>
        <p>
          <strong>Status:</strong> {order.orderStatus}
        </p>
        <p>
          <strong>Ordered At:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ViewOrder;
