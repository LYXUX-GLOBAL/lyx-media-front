// src/components/AddProductModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddProductModal = ({ isOpen, onRequestClose }) => {
  const [activeTab, setActiveTab] = useState('Packages');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log("Form submitted");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add a new product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product name</label>
            <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product description</label>
            <textarea className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bottom Content</label>
            <textarea className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="flex mb-4">
            <button type="button" className={`px-4 py-2 ${activeTab === 'Packages' ? 'bg-gray-200' : 'bg-gray-100'}`} onClick={() => setActiveTab('Packages')}>
              Packages
            </button>
            <button type="button" className={`px-4 py-2 ${activeTab === 'Discount Steps' ? 'bg-gray-200' : 'bg-gray-100'}`} onClick={() => setActiveTab('Discount Steps')}>
              Discount Steps
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product data</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Regular price ($)" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
              <input type="text" placeholder="Sale price ($)" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product detail description</label>
            <textarea className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Product
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;