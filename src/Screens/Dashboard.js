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
    <div >
      <h1 style={{ fontWeight: 400, fontSize: 40, fontFamily: 'Poppins' }}>Welcome Back</h1>
      <div class="grid md:grid-flow-col sm:grid-flow-row gap-4">

        <div class="md:col-span-2 sm:col-span-1">
          <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-solid border-2 border-stone-400 rounded-md p-4">
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div>
        </div>
        <div class="md:col-span-2 sm:col-span-1 border-solid border-2 border-stone-400 rounded-md p-4"><SalesStatistics /></div>
        <div class="md:row-span-2  sm:col-span-1  border-solid border-2 border-stone-400 rounded-md p-4"><SalesByCategory /></div>
      </div>
    </div>
  );
};

export default Dashboard;