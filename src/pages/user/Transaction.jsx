import React ,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderpayment } from '../../store/thunk/OrderThunk';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Transaction = () => {
  const dispatch = useDispatch();
  const orderId = useSelector((state)=>state.order.orderId);
  const [paymentMethod, setPaymentMethod] = useState('');
   const order = useSelector((state)=>state.order.order);
  const currorder = order.find((item)=>item._id == orderId); 
  const nav = useNavigate();
  const errorResult =  useSelector((state)=>state.order.error);
    const handlePayment = async () => {
   try {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    const resultAction = await dispatch(orderpayment({orderId,paymentMethod})) 
    if(orderpayment.fulfilled.match(resultAction)){
      alert(`Order has been  placed with ${paymentMethod}`);
      nav('/')
    }
   } catch (err) {
    console.log(err);
    return <ErrorMessage error={errorResult}/>
    
   }
    
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">Payment for: {currorder?.productName || 'Unknown Product'}</h2>

    <div className="space-y-4">
      <label className="block">
        <input
          type="radio"
          name="payment"
          value="cod"
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-2"
        />
        Cash on Delivery (COD)
      </label>

      <label className="block">
        <input
          type="radio"
          name="payment"
          value="netPay"
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-2"
        />
        Net Banking
      </label>

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Pay
      </button>
    </div>
  </div>
  )
}

export default Transaction;
