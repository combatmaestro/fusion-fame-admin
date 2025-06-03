import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Header = () => {
  const { logout } = useAuth();
console.log("Header mounted")
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'black',
        color: '#fff',
        height:'60px'
      }}
      
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Avatar src={logo} alt="Fusion Fame" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h6" noWrap>
            Fusion Fame
          </Typography>
        </Box>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
