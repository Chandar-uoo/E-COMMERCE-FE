// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-4xl text-yellow-300 font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className="text-blue-400 underline">Back to Home</Link>
    </div>
  );
};

export default NotFound;