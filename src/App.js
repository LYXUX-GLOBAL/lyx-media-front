// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Products from "./Screens/Products";
import Categories from "./Screens/Categories";
import Sidebar from "./Components/Sidebar";
import Orders from "./Screens/Orders";
import Analytics from "./Screens/Analytics";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import MainLayout from "./Components/MainLayout";
import Websites from "./Screens/Websites";
import Packages from "./Screens/Packages";
import Users from "./Screens/Users";
function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="fix">
          <div className="flex-1 p-10">
          <MainLayout>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/websites" element={<Websites />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/users" element={<Users />} />
            </Routes>

            </MainLayout>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
