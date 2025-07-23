import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Package, ShoppingCart, Users } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg z-50 transform transition-transform duration-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-base-300">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="menu p-4 space-y-2 text-base font-medium">
          <li>
            <Link onClick={onClose} to="/admin/home" className="flex items-center gap-2 hover:bg-base-300 p-2 rounded-md">
              <Home className="w-5 h-5" /> Home
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/admin/products" className="flex items-center gap-2 hover:bg-base-300 p-2 rounded-md">
              <Package className="w-5 h-5" /> Products
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/admin/order" className="flex items-center gap-2 hover:bg-base-300 p-2 rounded-md">
              <ShoppingCart className="w-5 h-5" /> Orders
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/admin/customers" className="flex items-center gap-2 hover:bg-base-300 p-2 rounded-md">
              <Users className="w-5 h-5" /> Customers
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;