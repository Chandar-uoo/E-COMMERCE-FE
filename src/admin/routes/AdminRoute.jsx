import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  // Check if the user is logged in and has the admin role
  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" />; // redirect if not admin
  }

  return children; // show the admin page if allowed
};

export default AdminRoute;