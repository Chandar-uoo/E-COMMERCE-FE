import { useNavigate } from "react-router-dom";
import { getProduct } from "../../api/productService";
import { useDispatch, useSelector } from "react-redux";
import { orderMaking } from "../../store/thunk/OrderThunk";
import ErrorMessage from "../Common/ErrorMessage";

const OrderCard = ({ item }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const errorResult = useSelector((state) => state.order.error);

  const veiwProduct = async (id) => {
    try {
      const item = await getProduct(id);
      nav(`/products/${id}`, { state: { item } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const process = async (product) => {
    const resultAction = await dispatch(
      orderMaking({
        itemsFromClient: [{ productId: product._id, quantity: 1 }],
      })
    );

    if (orderMaking.fulfilled.match(resultAction)) {
      nav("/product/payment");
    } else {
      console.error("Order creation failed:", resultAction.payload || resultAction.error);
      return <ErrorMessage error={errorResult} />;
    }
  };

  return (
    <div className="group hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-start space-x-6 bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <img
            src={item.productId?.thumbnail || "/placeholder.png"}
            alt={item.productId?.title}
            className="w-28 h-28 object-cover rounded-xl border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm"
          />
          <div className="absolute -top-2 -right-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full border border-emerald-200">
            x{item.quantity}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
              {item.productId?.title}
            </h4>
            <div className="flex items-center space-x-4 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                Qty: {item.quantity}
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                ${(item.productId?.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {item.productId?.description}
          </p>
          
          <div className="text-xs text-gray-500">
            Unit Price: ${item.productId?.price?.toFixed(2)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 flex-shrink-0">
          <button
            onClick={() => veiwProduct(item.productId._id)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow hover:shadow-blue-200 transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View</span>
            </span>
          </button>
          
          <button
            onClick={() => process(item.productId)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow hover:shadow-emerald-200 transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span>Buy Again</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
