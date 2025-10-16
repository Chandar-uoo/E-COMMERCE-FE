import React, { useState } from "react";
import { Eye, Edit } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatusMutation } from "../../../services/admin/adminOrdersApi";

import { CustomToast } from "../../../utils/CustomToast";
import { toast } from "react-toastify";
export const OrderList = ({ order }) => {
  const nav = useNavigate();
  const [showCustomToast, setshowCustomToast] = useState(false);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const updateStatus = async () => {
    try {
      await updateOrderStatus(order._id).unwrap();
      toast.success("order status has been updated");
    } catch (err) {
      toast.error(err?.message);
    }
  };
  const veiwOrder = async (order) => {
    try {
      nav(`/admin/veiwOrder/${order._id}`, { state: { order } });
    } catch (err) {
      console.log(err.message);
    }
  };
  // not update conition
  const notUpdateStatusOn = order.orderStatus !== "shipped"&&order.paymentStatus !== "unpaid";
  return (
    <tr>
      <CustomToast
        show={showCustomToast}
        message="Do you want to marked as shipped this product?"
        onOk={() => {
          updateStatus(), setshowCustomToast(false);
        }}
        onCancel={() => setshowCustomToast(false)}
      />
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
          {notUpdateStatusOn && (
            <button
              onClick={() => setshowCustomToast(true)}
              className="text-green-600 hover:text-green-800"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
