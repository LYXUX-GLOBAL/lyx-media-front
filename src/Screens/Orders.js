// src/components/Orders.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import OrderCard from '../Components/OrderCard';
const Orders = () => {
  const [rowData] = useState([
    { id: 1, order: '#84606 VALENTYNA Test', date: 'Jul 18, 2024', status: 'Active', price: '$0.50', origin: 'Direct' },
    { id: 2, order: '#84606 VALENTYNA Test', date: 'Jul 18, 2024', status: 'Pending', price: '$0.50', origin: 'Direct' },
    { id: 3, order: '#84606 VALENTYNA Test', date: 'Jul 18, 2024', status: 'Completed', price: '$0.50', origin: 'Direct' },
    { id: 4, order: '#84606 VALENTYNA Test', date: 'Jul 18, 2024', status: 'Pending', price: '$0.50', origin: 'Direct' },
    { id: 5, order: '#84606 VALENTYNA Test', date: 'Jul 18, 2024', status: 'Completed', price: '$0.50', origin: 'Direct' },
  ]);

  const [columnDefs] = useState([
    { headerName: "#", field: "id", sortable: true, filter: true },
    { headerName: "Order", field: "order", sortable: true, filter: true, cellRendererFramework: (params) => <a href="#">{params.value}</a> },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true, cellRendererFramework: (params) => {
        const statusColors = {
          'Active': 'text-blue-500',
          'Pending': 'text-orange-500',
          'Completed': 'text-green-500',
        };
        return <span className={statusColors[params.value]}>{params.value}</span>;
      }
    },
    { headerName: "Price", field: "price", sortable: true, filter: true },
    { headerName: "Origin", field: "origin", sortable: true, filter: true },
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
        
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">New Product</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Orders;