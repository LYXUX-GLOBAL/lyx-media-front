import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from './Sidebar';
import '../App.css';
import { COLORS } from "../utils/Color";
const MainLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen">
      <SideNav open={isDrawerOpen} onClose={toggleDrawer} />
      <AppBar sx={{ backgroundColor: COLORS.white }} position="fixed">
        <Toolbar>
          <IconButton edge="start" color={COLORS.black} aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <h2 style={{ fontWeight: 700, fontSize: 30 }} className="gradient-text" >
            LYX-Media
          </h2>
        </Toolbar>
      </AppBar>
      <main className="flex-1 mt-16 p-4">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;