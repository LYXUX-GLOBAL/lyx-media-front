import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Home, People, Web, ShoppingCart, Assignment, Logout } from '@mui/icons-material';

const SideNav = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="w-64">
        <List>
          <ListItem button component={NavLink} to="/" onClick={onClose}>
            <Home />
            <ListItemText primary="Dashboard" className="ml-2" />
          </ListItem>
          <ListItem button component={NavLink} to="/users" onClick={onClose}>
            <People />
            <ListItemText primary="Users" className="ml-2" />
          </ListItem>
          <ListItem button component={NavLink} to="/websites" onClick={onClose}>
            <Web />
            <ListItemText primary="Websites" className="ml-2" />
          </ListItem>
          <ListItem button component={NavLink} to="/packages" onClick={onClose}>
            <Assignment />
            <ListItemText primary="Packages" className="ml-2" />
          </ListItem>
          <ListItem button component={NavLink} to="/orders" onClick={onClose}>
            <ShoppingCart />
            <ListItemText primary="Orders" className="ml-2" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout}>
            <Logout />
            <ListItemText primary="Logout" className="ml-2" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideNav;