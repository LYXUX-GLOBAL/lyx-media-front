import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`, {
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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/packages`, {
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
        `${process.env.REACT_APP_API_BASE_URL}/orders`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
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
        `${process.env.REACT_APP_API_BASE_URL}/orders/${currentId}/status`,
        { status: formData.status },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
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
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`, {
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

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>

              <TableCell align="left" colSpan={6}>
                Orders
              </TableCell>
              <TableCell align="left" colSpan={1}>
                <Button variant="contained" startIcon={<AddIcon />} sx={{
                  backgroundColor: 'black', color: 'white', '&:hover': {
                    backgroundColor: 'darkgray', color: 'black'
                  },
                }} onClick={handleAddClick}>
                  Add New
                </Button>

              </TableCell>

            </TableRow>
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
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOrder(order._id)}>
                      <DeleteOutlineIcon sx={{ color: red[500] }} />
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
          <FormControl fullWidth size="small" margin="dense">
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
            label="Link"
            type="text"
            fullWidth
            size="small"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item xs={6}
            >
              <TextField
                margin="dense"
                label="Total Price"
                type="number"
                fullWidth
                size="small"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item xs={6}
            >
              <TextField
                margin="dense"
                label="Total Unit"
                type="number"
                fullWidth
                size="small"
                name="totalUnit"
                value={formData.totalUnit}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {editMode && (
            <FormControl fullWidth size="small" margin="dense">
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
          <Button variant="contained" color="error" onClick={() => setOpen(false)} >
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdateOrder : handleAddOrder}
            variant="contained"
            sx={{
              backgroundColor: 'black', color: 'white', '&:hover': {
                backgroundColor: 'darkgray', color: 'black'
              },
            }}
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;