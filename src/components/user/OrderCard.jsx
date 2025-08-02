import { useNavigate } from "react-router-dom";
import { getProduct } from "../../api/productService";
import { useDispatch, useSelector } from "react-redux";
import { orderMaking } from "../../store/thunk/OrderThunk";
import ErrorMessage from "../Common/ErrorMessage";



const OrderCard = ({item}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const errorResult =  useSelector((state)=>state.order.error);
      const veiwProduct = async (id) => {
        try {
          const item = await getProduct(id);
          nav(`/products/${id}`,{state: { item }});
        } catch (err) {
          console.log(err.message);
        }
      }

      const process = async (product) => {
  const resultAction = await dispatch(orderMaking({ itemsFromClient: [{ productId: product._id, quantity: 1 }],totalPrice:product.price }));
  
  
        if (orderMaking.fulfilled.match(resultAction)) {
      nav("/product/payment");
    } else {
      console.error("Order creation failed:", resultAction.payload || resultAction.error);
      return <ErrorMessage error={errorResult}/>
    }
  };
  return(
    <div className="space-y-4">
                <div
                  key={item._id}
                  className="flex items-center space-x-4 border border-gray-700 rounded-md p-4 bg-gray-800"
                >
                  <img
                    src={item.productId?.img || "/placeholder.png"}
                    alt={item.productId?.ProductName}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                  />
  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">
                      {item.productId?.ProductName}
                    </h4>
                    <p className="text-gray-400">
                      ${item.productId?.price * item.quantity}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.productId?.description}
                    </p>
                  </div>
  
                  <div className="flex flex-col space-y-2">
                    <button onClick={()=>veiwProduct(item.productId._id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md">
                      View Product
                    </button>
                    <button onClick={()=>process(item.productId)} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md">
                      Buy Again
                    </button>
                  </div>
                </div>
            </div>
  )
    
  };
export default OrderCard;

