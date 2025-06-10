
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import Transaction from './pages/Transaction'
const App = () => {
  return (
    <div>
      
     <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/product/:id" element ={<Product/>}/>
     <Route path="/myOrders" element = {<MyOrders/>}/>
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/product/:id/payment" element={<Transaction/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

