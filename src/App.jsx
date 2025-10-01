import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Product from "./pages/user/Product";
import MyOrders from "./pages/user/MyOrders";
import Cart from "./pages/user/Cart";
import Transaction from "./pages/user/Transaction";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Search from "./pages/user/Search";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLayout from "./layout/AdminLayout";
import Unauthorized from "./pages/common/Unauthorized";
import NotFound from "./pages/common/NotFound";
import Products from "./pages/admin/Product";
import Order from "./pages/admin/Order";
import Customers from "./pages/admin/Customers";
import UserLayout from "./layout/UserLayout";
import ViewProduct from "./components/admin/VeiwProduct";
import ViewOrder from "./components/admin/VeiwOrder";
import ViewCustomer from "./components/admin/VeiwCustomer";
import { Profile } from "./pages/user/Profile";
import ProductFormWrapper from "./components/admin/ProductFormWrapper";
import { ToastContainer, Bounce } from "react-toastify";
import { useCheckUserQuery } from "./services/user/userApi";

const App = () => {
 const { data } = useCheckUserQuery();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          // default routes
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
          // main routes
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search-results" element={<Search />} />
            <Route path="/product/payment" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
            // admin routes
          </Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="home" element={<AdminHomePage />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Order />} />
            <Route path="form" element={<ProductFormWrapper />} />
            <Route path="veiwProduct/:id" element={<ViewProduct />} />
            <Route path="veiwOrder/:id" element={<ViewOrder />} />
            <Route path="veiwCustomer/:id" element={<ViewCustomer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
