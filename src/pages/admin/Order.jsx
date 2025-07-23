import React from 'react';
import { Eye, Edit } from 'lucide-react';

const Order = () => {
   

    const recentOrders = [
        { id: '#12345', customer: 'John Doe', amount: '$299.99', status: 'Delivered', date: '2024-01-15' },
        { id: '#12346', customer: 'Jane Smith', amount: '$149.50', status: 'Processing', date: '2024-01-14' },
        { id: '#12347', customer: 'Mike Johnson', amount: '$89.99', status: 'Shipped', date: '2024-01-14' },
        { id: '#12348', customer: 'Sarah Wilson', amount: '$199.99', status: 'Pending', date: '2024-01-13' },
    ];
    return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
    
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <select className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
};

export default Order;


