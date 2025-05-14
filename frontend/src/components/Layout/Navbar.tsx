import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Медицинскеая система
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/specialties">Специальности</Button>
          <Button color="inherit" component={Link} to="/doctors">Врачи</Button>
          <Button color="inherit" component={Link} to="/patients">Пациенты</Button>
          <Button color="inherit" component={Link} to="/departments">Отделения</Button>
          <Button color="inherit" component={Link} to="/wards">Палаты</Button>
          <Button color="inherit" component={Link} to="/appointments">Приемы</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;