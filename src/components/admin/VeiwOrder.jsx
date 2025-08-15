import React from "react";
import { useLocation } from "react-router-dom";

const ViewOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  
  if (!order) return null;

  // Status color mapping
  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'processing': 'bg-blue-50 text-blue-700 border-blue-200',
      'shipped': 'bg-purple-50 text-purple-700 border-purple-200',
      'delivered': 'bg-green-50 text-green-700 border-green-200',
      'cancelled': 'bg-red-50 text-red-700 border-red-200'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getPaymentStatusColor = (status) => {
    const paymentColors = {
      'paid': 'bg-green-50 text-green-700 border-green-200',
      'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'failed': 'bg-red-50 text-red-700 border-red-200',
      'refunded': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return paymentColors[status?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Order #{order._id}
                </h1>
                {order.userId && (
                  <p className="text-gray-600">
                    Customer: <span className="font-medium text-gray-900">{order.userId.name}</span>
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                  📦 {order.orderStatus}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                  💳 {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-4">
              {order.items ? (
                order.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <img
                      src={item.productId?.thumbnail || item.thumbnail}
                      alt={item.productId?.title || item.title || 'Product'}
                      className="w-20 h-20 rounded-lg border border-gray-200 object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.productId?.title || item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.productId?.description || item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          Quantity: <span className="font-medium text-gray-900">{item.quantity}</span>
                        </span>
                        <span className="text-gray-600">
                          Price: <span className="font-medium text-green-600">${item.productId?.price || item.price}</span>
                        </span>
                        <span className="text-gray-600">
                          Subtotal: <span className="font-medium text-gray-900">${((item.productId?.price || item.price) * item.quantity).toFixed(2)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No items found in this order
                </div>
              )}
            </div>
          </div>

          {/* Order Details Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Payment & Pricing */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${order.totalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Payment Method:</span>
                    <span className="text-gray-900 font-medium capitalize">
                      {order.payMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Payment Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus).replace('border-', 'border ')}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping & Status */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Shipping Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Delivery Address:</span>
                    <span className="text-gray-900 text-right max-w-xs">
                      {order.address}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Order Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus).replace('border-', 'border ')}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  {order.createdAt && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Order Date:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                  {order.updatedAt && order.updatedAt !== order.createdAt && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Last Updated:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(order.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Order Summary</h3>
                  <p className="text-sm text-gray-600">
                    {order.items?.length || 0} item(s) • Ordered {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${order.totalPrice}</div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  📋 View Invoice
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  📦 Track Order
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                  ✏️ Edit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;