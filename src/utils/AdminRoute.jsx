import { Navigate } from "react-router-dom";

import Loader from "../components/Common/Loader";
import { useCheckUserQuery } from "../services/user/userApi";


const AdminRoute = ({ children }) => {
 

  const { data: user, isError, isLoading} = useCheckUserQuery();



  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;