import React, { useState } from 'react';
import AdminRoute from '../routes/AdminRoute'
 import { Outlet } from 'react-router-dom'
 import Header from "../components/common/Header.jsx" 
import Sidebar from "../components/common/Sidebar.jsx"
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminRoute>
       <div className="min-h-screen bg-gray-100">

      {/* Main content area */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6">
        <Outlet/>
        </main>
    </div>
    </AdminRoute>
  )
}

export default AdminLayout;




