// src/components/Categories.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Categories = () => {
  const [rowData, setRowData] = useState([
    { id: 1, category: 'Uncategorized', slug: 'uncategorized' },
    { id: 2, category: 'Instagram-Comments', slug: 'instagram-comments' },
    { id: 3, category: 'Instagram-likes', slug: 'instagram-likes' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const addCategory = () => {
    const newId = rowData.length + 1;
    setRowData([...rowData, { id: newId, category: newCategory, slug: newSlug }]);
    setNewCategory('');
    setNewSlug('');
  };

  const columnDefs = [
    { headerName: "#", field: "id", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    { headerName: "Slug", field: "slug", sortable: true, filter: true },
    { headerName: "Action", field: "action", cellRendererFramework: () => <button className="text-red-500">...</button> },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-xl font-semibold mb-4">Add new category</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button onClick={addCategory} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">New Category</button>
      </div>
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;