

import React from 'react'
import NavBar from '../components/user/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/Footer'

const UserLayout = () => {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout
