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
  FormControl, Grid
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    websiteId: '',
    socialMedia: '',
    type: '',
    minUnit: '',
    maxUnit: '',
    unitPrice: '',
    discount: '',
    header: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/websites`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      setWebsites(response.data);
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchWebsites();
  }, []);

  const handleAddPackage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/packages`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      setPackages([...packages, response.data]);
      setFormData({
        websiteId: '',
        socialMedia: '',
        type: '',
        minUnit: '',
        maxUnit: '',
        unitPrice: '',
        discount: '',
        header: '',
        description: ''
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  const handleUpdatePackage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/packages/${currentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      setPackages(packages.map((pkg) => (pkg._id === currentId ? response.data : pkg)));
      setFormData({
        websiteId: '',
        socialMedia: '',
        type: '',
        minUnit: '',
        maxUnit: '',
        unitPrice: '',
        discount: '',
        header: '',
        description: ''
      });
      setCurrentId(null);
      setEditMode(false);
      setOpen(false);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/packages/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEditClick = (pkg) => {
    setFormData({
      websiteId: pkg.websiteId,
      socialMedia: pkg.socialMedia,
      type: pkg.type,
      minUnit: pkg.minUnit,
      maxUnit: pkg.maxUnit,
      unitPrice: pkg.unitPrice,
      discount: pkg.discount,
      header: pkg.header,
      description: pkg.description
    });
    setCurrentId(pkg._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    setFormData({
      websiteId: '',
      socialMedia: '',
      type: '',
      minUnit: '',
      maxUnit: '',
      unitPrice: '',
      discount: '',
      header: '',
      description: ''
    });
    setEditMode(false);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-4">

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>

              <TableCell align="left" colSpan={10}>
                Packages
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
              <TableCell>Website Name</TableCell>
              <TableCell>Social Media</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Min Unit</TableCell>
              <TableCell>Max Unit</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Header</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => {
              const website = websites.find((w) => w._id === pkg.websiteId);
              return (
                <TableRow key={pkg._id}>
                  <TableCell>{pkg._id}</TableCell>
                  <TableCell>{website ? website.name : 'Unknown Website'}</TableCell>
                  <TableCell>{pkg.socialMedia}</TableCell>
                  <TableCell>{pkg.type}</TableCell>
                  <TableCell>{pkg.minUnit}</TableCell>
                  <TableCell>{pkg.maxUnit}</TableCell>
                  <TableCell>{pkg.unitPrice}</TableCell>
                  <TableCell>{pkg.discount}</TableCell>
                  <TableCell>{pkg.header}</TableCell>
                  <TableCell>{pkg.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(pkg)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePackage(pkg._id)}>
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
        <DialogTitle>{editMode ? 'Edit Package' : 'Add Package'}</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="websiteId-label">Website</InputLabel>
                <Select
                  labelId="websiteId-label"
                  id="websiteId"
                  name="websiteId"
                  value={formData.websiteId}
                  onChange={handleChange}
                >
                  {websites.map((website) => (
                    <MenuItem key={website._id} value={website._id}>
                      {website.name + ' - ' + website.link}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                label="Social Media"
                type="text"
                fullWidth
                size="small"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Type"
                type="text"
                fullWidth
                size="small"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid
                  item xs={6}
                >
                  <TextField
                    margin="dense"
                    label="Unit Price"
                    type="number"
                    fullWidth
                    size="small"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item xs={6}
                >
                  <TextField
                    margin="dense"
                    label="Discount"
                    type="number"
                    fullWidth
                    size="small"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item xs={6}
                >

                  <TextField
                    margin="dense"
                    label="Min Unit"
                    type="number"
                    fullWidth
                    size="small"

                    name="minUnit"
                    value={formData.minUnit}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Max Unit"
                    type="number"
                    fullWidth
                    size="small"
                    name="maxUnit"
                    value={formData.maxUnit}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>



            </Grid>


            <Grid
              item xs={6}
            >

              <TextField
                margin="dense"
                label="Header"
                type="text"
                fullWidth
                size="small"
                name="header"
                value={formData.header}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                size="small"
                multiline
                rows={8}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdatePackage : handleAddPackage}
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

export default Packages;
