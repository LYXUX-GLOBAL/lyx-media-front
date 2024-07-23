// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Screens/Dashboard';
import Products from './Screens/Products';
import Categories from './Screens/Categories';
import Sidebar from './Components/Sidebar';
import Orders from './Screens/Orders';
import Analytics from './Screens/Analytics';
function App() {
  return (
    <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;