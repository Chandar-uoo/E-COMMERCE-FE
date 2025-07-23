
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import Transaction from './pages/Transaction'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminLayout from './layout/AdminLayout';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Products from './pages/admin/Product';
import Order from './pages/admin/Order';
import Customers from './pages/admin/Customers';
import UserLayout from './layout/UserLayout';
const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          // default routes
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound/>} />
          // main routes
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/search-results' element={<Search />} />
            <Route path="/product/payment" element={<Transaction />}/>
            // admin routes
          </Route>
          <Route path="/admin/*" element={<AdminLayout/>} >
          <Route path = "home" element = {<AdminHomePage/>}/>
          <Route path = "products" element = {<Products/>}/>
          <Route path = "customers" element = {<Customers/>}/>
          <Route path = "order" element = {<Order/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

