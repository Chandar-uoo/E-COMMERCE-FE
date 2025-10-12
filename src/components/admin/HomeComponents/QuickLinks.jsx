import React from "react";
import { Link } from "react-router-dom";

export const QuickLinks = () => {
  return (
    <>
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
            to={"/admin/orders"}
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
    </>
  );
};
