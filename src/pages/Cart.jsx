import React from 'react'
import CartCard from '../components/CartCard';
import { useSelector } from 'react-redux';

const Cart = () => {
  const user = useSelector((state)=>state.user.user)
  return (
    <div>
    {user.cart.map((item) => (
  <CartCard key={item._id} item={item} />
))}
    </div>
  )
}

export default Cart;
