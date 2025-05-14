import React from 'react';
import { Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Вас приветствует медицинская система
      </Typography>
      <Typography variant="body1">
        Используйте навигационное меню для работы
      </Typography>
    </Box>
  );
};

export default HomePage;