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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Websites = () => {
  const [websites, setWebsites] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/websites`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      console.log('Websites:', response.data);

      setWebsites(response.data);
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleAddWebsite = async () => {
    console.log(name, link);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/websites`,
        { name, link },
        { headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         } }
      );
      setWebsites([...websites, response.data]);
      setName('');
      setLink('');
      setOpen(false);
    } catch (error) {
      console.error('Error adding website:', error);
    }
  };

  const handleUpdateWebsite = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/websites/${currentId}`,
        { name, link },
        { headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        } }
      );
      setWebsites(websites.map((website) => (website._id === currentId ? response.data : website)));
      setName('');
      setLink('');
      setCurrentId(null);
      setEditMode(false);
      setOpen(false);
    } catch (error) {
      console.error('Error updating website:', error);
    }
  };

  const handleDeleteWebsite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/websites/${id}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token },
      });
      setWebsites(websites.filter((website) => website._id !== id));
    } catch (error) {
      console.error('Error deleting website:', error);
    }
  };

  const handleEditClick = (website) => {
    setName(website.name);
    setLink(website.link);
    setCurrentId(website._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddClick = () => {
    setName('');
    setLink('');
    setEditMode(false);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Website
      </Button>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website._id}>
                <TableCell>{website._id}</TableCell>
                <TableCell>{website.name}</TableCell>
                <TableCell>{website.link}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(website)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteWebsite(website._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Website' : 'Add Website'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdateWebsite : handleAddWebsite}
            color="primary"
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Websites;