import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Leads from './pages/Leads';
import Gallery from './pages/Gallery';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/leads" element={<Leads />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<Navigate to="/leads" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
