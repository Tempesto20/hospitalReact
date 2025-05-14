import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Medical System
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/specialties">Specialties</Button>
          <Button color="inherit" component={Link} to="/doctors">Doctors</Button>
          <Button color="inherit" component={Link} to="/patients">Patients</Button>
          <Button color="inherit" component={Link} to="/departments">Departments</Button>
          <Button color="inherit" component={Link} to="/wards">Wards</Button>
          <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;