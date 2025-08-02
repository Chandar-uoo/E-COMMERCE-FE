import React from 'react'
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-4xl text-red-400 font-bold mb-4">403 - Access Denied</h1>
      <p className="mb-6">You do not have permission to access this page.</p>
      <Link to="/" className="text-blue-400 underline">Go to Homepage</Link>
    </div>
  )
}

export default Unauthorized;
