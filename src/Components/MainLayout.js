import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from './Sidebar';
const MainLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen">
      <SideNav open={isDrawerOpen} onClose={toggleDrawer} />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            LYX-Media
          </Typography>
        </Toolbar>
      </AppBar>
      <main className="flex-1 mt-16 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;