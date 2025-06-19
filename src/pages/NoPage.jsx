// import React from 'react'
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar'

const NoPage = () => {
   return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
    </>
  );
};

export default NoPage