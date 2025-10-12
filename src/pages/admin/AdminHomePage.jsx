
import Loader from "../../components/Common/Loader";
import { OverViewStats } from "../../components/admin/HomeComponents/OverViewStats";
import { QuickLinks } from "../../components/admin/HomeComponents/QuickLinks";
import { NotificationsDropDown } from "../../components/admin/HomeComponents/NotificationsDropDown";
import {useFetchDashBoardQuery } from "../../services/admin/adminDashBoard";
import { toast } from "react-toastify";
import { TopProducts } from "../../components/admin/HomeComponents/TopProducts";

const AdminHomePage = () => {

  
  const { data, isLoading, isError, error } = useFetchDashBoardQuery();
  const {totalProducts,topThreeProducts,totalRevenue,totalPendingOrders,totalCustomers} =  data || {};
  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message);
  }
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl text-teal-400 font-bold mb-6">
          Welcome, Admin 👋
        </h1>
       
        <div className="flex justify-end mb-6">
          <NotificationsDropDown totalPendingOrders ={totalPendingOrders}/>
          </div>
          <OverViewStats totalCustomers={totalCustomers} totalProducts={totalProducts} totalRevenue={totalRevenue}/>
          <TopProducts topThreeProducts={topThreeProducts}/>
          <QuickLinks/>
        </div>
      
    </>
  );
};

export default AdminHomePage;
 