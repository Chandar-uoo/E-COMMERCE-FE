import React, { useState } from "react";
import { Eye, Edit } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  FetchOrdersThunk,
  UpdateOrderStatusThunk,
} from "../../store/AdminThunk/AdminOrderThunk";
import { useNavigate } from "react-router-dom";
export const OrderList = ({ order }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [edit, setedit] = useState(false);
  const updateStatus = async (orderId) => {
    await dispatch(UpdateOrderStatusThunk(orderId));
    await dispatch(FetchOrdersThunk("all"));
    setedit(false);
  };
  const veiwOrder = async (order) => {
    try {
      nav(`/admin/veiwOrder/${order._id}`, { state: { order } });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {order._id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{order?.userId?.name}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{order.totalPrice}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{order.orderStatus}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{order.paymentStatus}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {" "}
        {new Date(order.createdAt).toLocaleDateString("en-GB")}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Eye onClick={() => veiwOrder(order)} className="w-4 h-4" />
          </button>
          {!edit ? (
            order.orderStatus !== "shipped" && (
              <button
                onClick={() => setedit(true)}
                className="text-green-600 hover:text-green-800"
              >
                <Edit className="w-4 h-4" />
              </button>
            )
          ) : (
            <div
              role="alert"
              className="alert alert-vertical sm:alert-horizontal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>do you wanna update order staus.</span>
              <div>
                <button onClick={() => setedit(false)} className="btn btn-sm">
                  Deny
                </button>
                <button
                  onClick={() => updateStatus(order._id)}
                  className="btn btn-sm btn-primary"
                >
                  Accept
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
