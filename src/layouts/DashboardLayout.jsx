import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'black',
          color: '#fff',
          height: `${HEADER_HEIGHT}px`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
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

      {/* Sidebar & Content */}
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar - Permanent on Desktop, Drawer on Mobile */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: SIDEBAR_WIDTH,
              },
            }}
          >
            <Sidebar />
          </Drawer>
        ) : (
          <Box
            sx={{
              width: SIDEBAR_WIDTH,
              flexShrink: 0,
              mt: `${HEADER_HEIGHT}px`,
              position: 'fixed',
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              overflowY: 'auto',
              borderRight: '1px solid #ddd',
              backgroundColor: '#fff',
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: '100%',
            mt: `${HEADER_HEIGHT}px`,
            ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
