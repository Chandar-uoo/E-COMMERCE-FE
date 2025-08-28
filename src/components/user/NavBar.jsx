import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutService } from "../../api/userService";
import { clearOrder } from "../../store/Slices/OrderSlice";
import { clearUser } from "../../store/Slices/UserSlice";
import { clearCartState } from "../../store/Slices/CartSlice";
import userImage from "../../assets/default-img.jpg";
import { SearchProduct } from "../../store/thunk/ProductThunk";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const [_,setSearchParams] = useSearchParams();
  const [text, settext] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const searchItem = () => {
    if (text !== "" && text !== null && text !== undefined) {
      dispatch(SearchProduct({ search: text }));
      const queryString = new URLSearchParams({search:text,page:1}).toString();
      setSearchParams(queryString)
      nav(`/search-results?${queryString}`);
    }
  };

  const logout = async () => {
    const res = await logoutService();
    localStorage.clear();
    dispatch(clearCartState());
    dispatch(clearOrder());
    dispatch(clearUser());
    alert(res);
    nav("/login");
  };

  return (
    <div className="navbar bg-neutral text-white shadow-sm px-6 py-2">
      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl  text-white">
          RetailX
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex-none flex items-center gap-4">
        {/* Search Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            searchItem();
          }}
          className="flex w-64 h-8 rounded-md overflow-hidden border border-gray-600"
        >
          {/* Input */}
          <input
            value={text}
            onChange={(e) => settext(e.target.value)}
            type="text"
            placeholder="Search product"
            required
            className="w-5/6 px-3 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-1/6 flex items-center justify-center bg-white hover:bg-gray-200"
          >
            <CiSearch className="w-6 h-6 text-black" />
          </button>
        </form>

        {/* Orders Icon */}
        <Link
          to="/myOrders"
          className="btn btn-ghost btn-circle hover:border-white"
        >
          <FaTruck className="h-6 w-6 text-white" />
        </Link>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="btn btn-ghost btn-circle hover:border-white"
        >
          <TiShoppingCart className="h-6 w-6 text-white" />
        </Link>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end flex items-center gap-2">
          {/* Name */}
          {user?.name && (
            <div className="font-semibold text-white hidden sm:block">
              {user.name}
            </div>
          )}

          {/* Avatar */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
              <img src={user?.image} alt={userImage} />
            </div>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-gray-900 rounded-box w-52 text-white"
          >
            <li>
              <a
                onClick={() => nav("/profile")}
                className="justify-between hover:bg-gray-800 rounded"
              >
                Profile
              </a>
            </li>
            <li>
              <a className="hover:bg-gray-800 rounded" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
