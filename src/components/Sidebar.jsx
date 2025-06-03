import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { People, PhotoLibrary, CalendarToday } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SIDEBAR_WIDTH = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          top: 64, // offset for header height
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/leads">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Leads" />
        </ListItem>
        <ListItem button component={Link} to="/gallery">
          <ListItemIcon><PhotoLibrary /></ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem button component={Link} to="/bookings">
          <ListItemIcon><CalendarToday /></ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
