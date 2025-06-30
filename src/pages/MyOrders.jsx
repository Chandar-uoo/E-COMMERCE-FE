import React from 'react'
import OrderCard from '../components/OrderCard';
import { useSelector } from 'react-redux';


const MyOrders = () => {
  const orders = useSelector((state)=>state.order.order);
const placedorder = orders.filter(item =>
  item.paymentStatus === "paid"
);



  return (
    <div>
      <h1 className='text-3xl'>Orders</h1>
     {placedorder.map((orderedProduct)=>(<OrderCard key={orderedProduct._id}  orderedProduct={orderedProduct}/>))}
    </div>
  )
}

export default MyOrders;
