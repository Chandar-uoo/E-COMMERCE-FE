import React from 'react';
import { CheckCircle, Package, CreditCard, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Common/Loader';

const OrderDetail = ({orderData}) => {
 const nav = useNavigate();
 const {loading} = useSelector((state)=>state.order)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
if(loading) return <Loader/>
  return (
    <>
     <nav className="flex mb-8 text-sm">
            <button
              onClick={() => nav("/")}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Products
            </button>
          </nav>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-lg text-green-600 font-medium mb-4">{orderData.message}</p>
          <p className="text-gray-600">Thank you for your purchase. Your order has been received and is being processed.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Order Details
          </h2>

          {/* Order ID and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Order ID</p>
              <p className="text-sm font-mono text-gray-900">{orderData.result._id}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Order Date</p>
              <p className="text-sm text-gray-900 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(orderData.result.createdAt)}
              </p>
            </div>
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Payment Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.result.paymentStatus)}`}>
                <CreditCard className="h-4 w-4 mr-1" />
                {orderData.result.paymentStatus.charAt(0).toUpperCase() + orderData.result.paymentStatus.slice(1)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Order Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.result.orderStatus)}`}>
                <Package className="h-4 w-4 mr-1" />
                {orderData.result.orderStatus.charAt(0).toUpperCase() + orderData.result.orderStatus.slice(1)}
              </span>
            </div>
          </div>

          {/* Payment and Delivery Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Method:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {orderData.result.payMethod.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="text-lg font-semibold text-gray-900 flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {orderData.result.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Delivery Information
                </h3>
                <div className="text-sm text-gray-600">
                  <p>{orderData.result.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {orderData.result.items.map((item, index) => (
              <div key={item.id || index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{item.name || `Item ${index + 1}`}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(item.price || (orderData.result.totalPrice / (item.quantity || 1))).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">${orderData.result.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
            Track Your Order
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderDetail;