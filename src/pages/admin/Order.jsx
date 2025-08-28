import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchOrdersThunk } from "../../store/AdminThunk/AdminOrderThunk";
import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { OrderList } from "../../components/admin/OrderList";
import EmptyState from "../../components/Common/EmptyState";
import usePagination from "../../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { MoveRight, MoveLeft } from "lucide-react";

const Order = () => {
  const { orders, loading, error, pagination } = useSelector(
    (state) => state.adminOrderState
  );
  const dispatch = useDispatch();
  const [status, setstatus] = useState("all");
  const [_, setsearchParams] = useSearchParams();
  
  const fetchOrders = async () => {
    await dispatch(FetchOrdersThunk({ orderStatus: status }));
    const queryString = new URLSearchParams({
      orderStatus: status,
      page: 1,
    }).toString();
    setsearchParams(queryString);
  };
  useEffect(() => {
    fetchOrders();
  }, [status]);
  const { nextPage, prevPage } = usePagination();
  const next = () => {
    if (pagination.hasNextPage) {
      const updatedParams = nextPage(); // Get the updated params
      dispatch(FetchOrdersThunk(updatedParams.toString()));
    }
  };

  const prev = () => {
    if (pagination.hasPrevPage) {
      const updatedParams = prevPage(); // Get the updated params
      dispatch(FetchOrdersThunk(updatedParams.toString()));
    }
  };
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="cancelled">Cancelled</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders?.map((order) => (
                  <OrderList key={order._id} order={order} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    <EmptyState message="No orders found" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center-safe gap-4  px-4">
        {pagination.hasPrevPage && (
          <button
            onClick={prev}
            className="join-item  btn btn-outline bg-black w"
          >
            <MoveLeft />
            Prev
          </button>
        )}
        {pagination.hasNextPage && (
          <button
            onClick={next}
            className="join-item btn btn-outline bg-black "
          >
            Next
            <MoveRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
