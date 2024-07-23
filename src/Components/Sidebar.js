import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">LamaMidea</span>
      </div>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Dashboard</Link>
        <div>
          <p className="block py-2.5 px-4 text-gray-400">Products</p>
          <Link to="/products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">All Products</Link>
          <Link to="/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Categories</Link>
          <Link to="/orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Orders</Link>
          <p className="block py-2.5 px-4 text-gray-400">Reports</p>
          <Link to="/analytics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Analytics</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;