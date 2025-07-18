import React from 'react'
import AdminRoute from '../routes/AdminRoute'
 import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <AdminRoute>
        <Outlet/>
    </AdminRoute>
  )
}

export default AdminLayout
