import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../services/auth/authApi";
import { useState } from "react";
import { CustomToast } from "../../../utils/CustomToast";
import { tokenService } from "../../../utils/tokenService";
import { useDispatch } from "react-redux";
import { userApi } from "../../../services/user/userApi";

const Header = ({ onMenuClick }) => {
  const [logout] = useLogoutMutation();
  const [showCustomToast, setshowCustomToast] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logoutHandler = async () => {
    await logout();
    localStorage.clear();
    tokenService.clear();
    console.log(tokenService.get());
    dispatch(userApi.util.resetApiState());
    setshowCustomToast(true);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <button onClick={onMenuClick} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </div>

      <div className="navbar-center">
        <a onClick={() => nav("/admin/home")} className="btn btn-ghost text-xl">
          RetailX
        </a>
      </div>
      <div className="navbar-end pr-2.5">
        <button
          onClick={logoutHandler}
          className="btn btn-ghost border-cyan-400  hover:bg-cyan-400 hover:text-white "
        >
          Logout
        </button>
      </div>
      <CustomToast
        show={showCustomToast}
        message="Logout Successfully"
        onOk={() => {
          setshowCustomToast(false);
          nav("/login");
        }}
      />
    </div>
  );
};

export default Header;
