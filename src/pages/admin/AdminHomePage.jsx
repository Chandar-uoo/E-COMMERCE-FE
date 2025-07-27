import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AdminUserThunk } from "../../store/AdminThunk/AdminUserThunk";
import { FetchOrdersThunk } from "../../store/AdminThunk/AdminOrderThunk";
import { FetchProduct } from "../../store/thunk/ProductThunk";
const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.adminUserState);
  const { orders } = useSelector((state) => state.adminOrderState);
  /* const { products = [] } = useSelector((state) => state.products);*/

  const nav = useNavigate();

  useEffect(() => {
    dispatch(FetchOrdersThunk("processing"));
  }, [dispatch]);

  const ordersToShip = orders.filter(
    (order) => order.orderStatus === "processing"
  ).length;
  const fetchAll = async () => {
    await dispatch(AdminUserThunk());
    await dispatch(FetchOrdersThunk("all"));
    /* await dispatch(FetchProduct());*/
  };

  /*const totalProducts = products.length;*/
  const totalOrders = orders.length;
  const totalUsers = customers.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl text-teal-400 font-bold mb-6">
        Welcome, Admin 👋
      </h1>
      {/* Notification Dropdown */}
      <div className="flex justify-end mb-6">
        {/* ✅ Notification Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn bg-black text-green-300 btn-ghost btn-circle">
            <div className="indicator">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.4-1.4A2 2 0 0118 14.1V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                />
              </svg>
              {ordersToShip > 0 && (
                <span className="badge badge-xs badge-primary indicator-item"></span>
              )}
            </div>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-black rounded-box w-64 mt-4 z-[999]"
          >
            {ordersToShip > 0 ? (
              <>
                <li>
                  <p className="text-sm font-semibold text-white">
                    You have {ordersToShip} orders to ship.
                  </p>
                </li>
                <li>
                  <button
                    className="btn btn-sm btn-outline btn-primary mt-2"
                    onClick={() => {
                      nav("/admin/orders");
                      document.activeElement.blur(); // close dropdown on nav
                    }}
                  >
                    View Orders
                  </button>
                </li>
              </>
            ) : (
              <li>
                <p className="text-sm text-gray-500">No pending orders</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Products 
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-blue-100">
          <div className="bg-blue-100 p-2 rounded-full">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-xl font-bold text-blue-700">{totalProducts}</h3>
          </div>
        </div>*/}

        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-purple-100">
          <div className="bg-purple-100 p-2 rounded-full">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-xl font-bold text-purple-700">{totalOrders}</h3>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-green-100">
          <div className="bg-green-100 p-2 rounded-full">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-xl font-bold text-green-700">{totalUsers}</h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 border border-yellow-100">
          <div className="bg-yellow-100 p-2 rounded-full">
            <DollarSign className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-xl font-bold text-yellow-700">
              {totalRevenue}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl text-green-500 font-semibold mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to={"/admin/products"}
            className="block  text-black text-center px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100 transition"
          >
            Manage Products
          </Link>
          <Link
            to={"/admin/order"}
            className="block  text-black text-center px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100 transition"
          >
            Manage Orders
          </Link>
          <Link
            to={"/admin/customers"}
            className="block  text-black text-center px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100 transition"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
