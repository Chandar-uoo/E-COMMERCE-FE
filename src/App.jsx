
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
import Layout from './components/Layout';
import AdminHomePage from './admin/pages/AdminHomePage';
import AdminLayout from './admin/layout/AdminLayout';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
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
          <Route element={<Layout />}>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

