import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Страница не найдена
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Страница, которую вы ищете, не существует.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Вернуться на главную страницу
      </Button>
    </Box>
  );
};

export default NotFoundPage;