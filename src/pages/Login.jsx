import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import logo from '../assets/logo.png';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const { success, data } = await loginUser(email, password);

    if (success && data.success) {
      login({ token: data.token, success:success });
      navigate('/leads');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs"  sx={{
        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" >
        <Card elevation={6} sx={{ width: '100%', p: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="Fusion Fame Hair Studio"
                src={logo}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Fusion Fame Hair Studio
              </Typography>
              <TextField
                label="Email"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
