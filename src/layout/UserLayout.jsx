

import React from 'react'
import NavBar from '../components/user/UserLayoutComponents/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/UserLayoutComponents/Footer'


const UserLayout = () => {
  return (
    <div className="flex flex-col max-h-screen">
      {/* Header always visible */}
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>

      {/* Content takes remaining space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer sticks to bottom if page is short, but also moves down on scroll */}
      <footer className=" bottom-0">
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
