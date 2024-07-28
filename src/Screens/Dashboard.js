// src/components/Dashboard.js
import React from 'react';
import Sidebar from '../Components/Sidebar';
import WelcomeCard from '../Components/WelcomeCard';
import OrderCard from '../Components/OrderCard';
import SalesStatistics from '../Components/SalesStatistics';
import SalesByCategory from '../Components/SalesByCategory';

const Dashboard = () => {
  console.log(localStorage.getItem("token")); 
  return (
    <div className="flex">
      <div className="flex-1 p-10 text-2xl font-bold">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <WelcomeCard />
          </div>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <SalesStatistics />
          </div>
          <SalesByCategory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;