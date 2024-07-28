// src/components/Products.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddProductModal from '../Components/AddProductModal';

const Products = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [rowData] = useState([
    { id: 1, product: 'Instagram-likes', stock: 'In Stock', price: '$0.50', categories: 'Likes' },
    { id: 2, product: 'Instagram-likes', stock: 'In Stock', price: '$0.50', categories: 'Likes' },
    { id: 3, product: 'Instagram-likes', stock: 'In Stock', price: '$0.50', categories: 'Likes' },
  ]);

  const [columnDefs] = useState([
    { headerName: "#", field: "id", sortable: true, filter: true },
    { headerName: "Product", field: "product", sortable: true, filter: true },
    { headerName: "Stock", field: "stock", sortable: true, filter: true, cellStyle: { color: 'green' } },
    { headerName: "Price", field: "price", sortable: true, filter: true },
    { headerName: "Categories", field: "categories", sortable: true, filter: true },
  ]);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={openModal}>New Product</button>
        <AddProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />

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

export default Products;