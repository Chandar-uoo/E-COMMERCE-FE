import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import userImage from "../../../assets/default-img.jpg";
import { useLogoutMutation } from "../../../services/auth/authApi";
import Loader from "../../Common/Loader";
import { useCheckUserQuery, userApi } from "../../../services/user/userApi";
import { tokenService } from "../../../utils/tokenService";
import { CustomToast } from "../../../utils/CustomToast";
import { cartApi } from "../../../services/user/cartApi";
import { orderApi } from "../../../services/user/orderApi";

const NavBar = () => {
  const { data:user } = useCheckUserQuery(undefined, {
  // this prevents refetch
  refetchOnMountOrArgChange: false,
});

  const [_, setSearchParams] = useSearchParams();
  const [text, settext] = useState("");
  const [showCustomToast, setshowCustomToast] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [logout, { loading: isLogoutLoading }] = useLogoutMutation();
  
  const searchItem = () => {
    if (text !== "" && text !== null && text !== undefined) {
      const queryString = new URLSearchParams({
        search: text,
        page: 1,
      }).toString();
      setSearchParams(queryString);
      nav(`/search-results?${queryString}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    tokenService.clear();
    dispatch(userApi.util.resetApiState());
    dispatch(cartApi.util.resetApiState());
    dispatch(orderApi.util.resetApiState());
    setshowCustomToast(true);
  };

  if (isLogoutLoading) return <Loader />;

  return (
    <div className="navbar bg-neutral text-white shadow-sm px-6 py-2">
      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl  text-white">
          RetailX
        </Link>
      </div>
   <CustomToast
  show={showCustomToast}
  message="Logout Successfully"
  onOk={() => {
    setshowCustomToast(false);
    nav("/login"); 
  }}
 
/>
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
              <img src={user?.image || userImage} alt={user?.name || "user"} />
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
              <a className="hover:bg-gray-800 rounded" onClick={handleLogout}>
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
