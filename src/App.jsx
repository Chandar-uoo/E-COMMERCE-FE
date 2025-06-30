
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import Transaction from './pages/Transaction'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
const App = () => {
  return (
    <div>
      
     <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/products/:id" element ={<Product/>}/>
     <Route path="/myOrders" element = {<MyOrders/>}/>
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path = '/search-results' element={<Search/>}/>
     <Route path="/product/payment/:id" element={<Transaction/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

