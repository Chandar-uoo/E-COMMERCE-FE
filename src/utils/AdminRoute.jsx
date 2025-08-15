import { Navigate, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/Common/Loader";
import ErrorMessage from "../components/Common/ErrorMessage";
;


const AdminRoute = ({ children }) => {
  const {user,loading,error} = useSelector((state) => state.user);
const nav = useNavigate();

 if(error === "Session expired. Please login again."){
     nav("/login")
  }
  if (loading || !user) {
    return <Loader />;
  }
 
setTimeout(() => {
     if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }
}, 100);

 

  return children; // show the admin page if allowed
};

export default AdminRoute;