import React, { useEffect } from 'react';
import OrderCard from '../../components/user/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../components/Common/EmptyState';
import { readOrders } from '../../store/thunk/OrderThunk';
import Loader from '../../components/Common/Loader';
import ErrorMessage from '../../components/Common/ErrorMessage';

const MyOrders = () => {
const{ order,error,loading} = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const fetchOrder = async () => {
   await dispatch(readOrders());
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-800 bg-yellow-100 border-yellow-200',
      processing: 'text-blue-800 bg-blue-100 border-blue-200',
      shipped: 'text-purple-800 bg-purple-100 border-purple-200',
      delivered: 'text-emerald-800 bg-emerald-100 border-emerald-200',
      cancelled: 'text-red-800 bg-red-100 border-red-200',
    };
    return colors[status?.toLowerCase()] || 'text-gray-700 bg-gray-100 border-gray-200';
  };

  const getPaymentColor = (status) => {
    const colors = {
      paid: 'text-emerald-800 bg-emerald-100 border-emerald-200',
      pending: 'text-yellow-800 bg-yellow-100 border-yellow-200',
      failed: 'text-red-800 bg-red-100 border-red-200',
    };
    return colors[status?.toLowerCase()] || 'text-gray-700 bg-gray-100 border-gray-200';
  };
  if(loading){
    return <Loader/>
  }
  if(error){
    return <ErrorMessage message={error}/>
  }

  return !order ? (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <EmptyState message="No orders found" />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            My Orders
          </h1>
          <p className="text-gray-600 text-lg">Track and manage your purchases</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {order.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 hover:border-gray-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
                      <span className="text-emerald-600">#</span>
                      <span className="truncate">{order._id}</span>
                    </h2>
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                        </svg>
                        <span className="text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700 truncate max-w-xs">
                          {order.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-3">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                      <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                      {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                    </div>
                    
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold border ${getPaymentColor(order.paymentStatus)}`}>
                      <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)} ({order.payMethod})
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-blue-600 flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Order Items</span>
                  </h3>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">
                      ${order?.totalPrice?.toFixed(2)}
                    </div>
                    <div className="text-gray-500 text-sm">Total Amount</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {order.items.length > 0 ? (
                    order.items.map((item) => (
                      <OrderCard key={item._id} item={item} />
                    ))
                  ) : (
                    <EmptyState message="No items in this order." />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    <style>{`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>

    </div>
  );
};

export default MyOrders;
