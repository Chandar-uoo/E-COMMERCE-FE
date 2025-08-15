import React ,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderpayment } from '../../store/thunk/OrderThunk';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/Common/ErrorMessage';
import { CreditCard, Truck, ShoppingBag, CheckCircle, Loader } from 'lucide-react';
const Transaction = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('');
  const {loading,error} = useSelector((state)=>state.order);
  const currorder = useSelector((state)=>state.order.currentOrder); 
  const nav = useNavigate();
    const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    const resultAction = await dispatch(orderpayment({orderId:currorder._id,paymentMethod})) 
    if(orderpayment.fulfilled.match(resultAction)){
       nav('/')
      alert(`Order has been  placed with ${paymentMethod}`);
    }
    
  };
  if(loading) return <Loader/>
  if(error) return <ErrorMessage message={error}/>
 
  
 return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Review your order and select a payment method</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-gray-600" />
            Order Summary
          </h2>
           <div className="font-semibold text-gray-900"> Total Products : {currorder.items.length}</div>
        
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">${currorder?.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'cod' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-4 flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mr-3">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when your order arrives</div>
                </div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'netPay' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}>
              <input
                type="radio"
                name="payment"
                value="netPay"
                checked={paymentMethod === 'netPay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-4 flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Net Banking</div>
                  <div className="text-sm text-gray-600">Secure online payment</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Order Status Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-900">Order Status: {currorder?.orderStatus}</p>
              <p className="text-sm text-blue-700">Order ID: {currorder?._id?.slice(-8)}</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Complete Payment - $${currorder?.totalPrice}`
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transaction;



