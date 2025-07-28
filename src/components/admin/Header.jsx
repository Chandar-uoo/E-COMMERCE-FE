import { useNavigate } from "react-router-dom";
import { logoutService } from "../../api/userService";


const Header = ({ onMenuClick }) => {
 const nav =  useNavigate();
    const logout = async () => {
        const res = await logoutService();
        alert(res);
        nav("/login")
      }
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
        <a onClick={()=>nav("/admin/home")} className="btn btn-ghost text-xl">A - Z commerce</a>
      </div>
    <div className="navbar-end pr-2.5">
        <button onClick={logout} className="btn btn-ghost border-cyan-400  hover:bg-cyan-400 hover:text-white ">
          Logout 
        </button>
      </div>
      
    </div>
  );
};

export default Header;
