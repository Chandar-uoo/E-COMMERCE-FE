import React from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="flex-none flex items-center gap-4">
        {/* Search Input with Icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 text-black bg-white border-2 border-black rounded-md w-48 hover:border-cyan-300 focus:outline-none"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <CiSearch className="w-5 h-5" />
          </div>
        </div>

        {/* Truck Icon */}
        <Link to="/myOrders" className="btn btn-ghost btn-circle hover:border-white">
          <FaTruck className="h-5 w-5" />
        </Link>

        {/* Shopping Cart Dropdown */}
        <div >
          <div tabIndex={0}  role="button" className="btn btn-ghost btn-circle hover:border-white">
          <Link to="/cart"className="indicator">
          <TiShoppingCart className="h-5 w-5" /></Link>
          </div>
          
        </div>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:border-white">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
