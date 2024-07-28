import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    packageId: '',
    totalPrice: '',
    totalUnit: '',
    link: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/orders', {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/packages', {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         },
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchPackages();
  }, []);

  const handleAddOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5001/api/orders',
        formData,
        { headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         } }
      );
      setOrders([...orders, response.data]);
      setFormData({
        packageId: '',
        totalPrice: '',
        totalUnit: '',
        link: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5001/api/orders/${currentId}/status`,
        { status: formData.status },
        { headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         } }
      );
      setOrders(orders.map((order) => (order._id === currentId ? response.data : order)));
      setFormData({
        packageId: '',
        totalPrice: '',
        totalUnit: '',
        link: '',
      });
      setCurrentId(null);
      setEditMode(false);
      setOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         },
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditClick = (order) => {
    setFormData({
      packageId: order.packageId,
      totalPrice: order.totalPrice,
      totalUnit: order.totalUnit,
      link: order.link,
      status: order.status,
    });
    setCurrentId(order._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    setFormData({
      packageId: '',
      totalPrice: '',
      totalUnit: '',
      link: '',
    });
    setEditMode(false);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4">
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Order
      </Button>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Package</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Total Unit</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const pkg = packages.find((p) => p._id === order.packageId);
              return (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{pkg ? pkg.header : 'Unknown Package'}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.totalUnit}</TableCell>
                  <TableCell>{order.link}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(order)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOrder(order._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="packageId-label">Package</InputLabel>
            <Select
              labelId="packageId-label"
              id="packageId"
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
            >
              {packages.map((pkg) => (
                <MenuItem key={pkg._id} value={pkg._id}>
                  {pkg.header}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Total Price"
            type="number"
            fullWidth
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Total Unit"
            type="number"
            fullWidth
            name="totalUnit"
            value={formData.totalUnit}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
          {editMode && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdateOrder : handleAddOrder}
            color="primary"
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;