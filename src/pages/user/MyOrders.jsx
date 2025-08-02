import React ,{useEffect}from 'react'
import OrderCard from '../../components/user/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../components/Common/EmptyState';
import { readOrder } from '../../api/orderServices';
import { addOrders } from '../../store/Slices/OrderSlice';


const MyOrders = () => {
  const orders = useSelector((state)=>state.order.order);
  const dispatch =  useDispatch(); 
    const fetchOrder = async()=>{
      const Order = await readOrder();
        dispatch(addOrders(Order))
    }
     useEffect(() => {
      fetchOrder()
     },[]);
    

     return (
     orders.length === 0 ? (
        <EmptyState message="No orders found" />
      ) : ( <div className="max-w-5xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
          My Orders
        </h1>
  
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold text-green-300">
                Order ID: {order._id}
              </p>
              <p className="text-gray-400">
                Date placed:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-400">Payment: {order.paymentStatus} ({order.payMethod})</p>
              <p className="text-gray-400">Status: {order.orderStatus}</p>
              <p className="text-gray-400">Address: {order.address}</p>
            </div>
  
            <h3 className="text-xl font-bold text-blue-400 mt-4 mb-2">
              Items:
            </h3>
            {order.items.length > 0 ? (
              order.items.map((item) => (
                <OrderCard key={item._id} item={item} />
              ))
            ) : (
              <EmptyState message="No items in this order." />
            )}
            <p className="text-lg font-semibold text-green-300">
                total price: ${order?.totalPrice}
              </p>
          </div>
        ))}
      </div>)
    )
};

export default MyOrders;

  

