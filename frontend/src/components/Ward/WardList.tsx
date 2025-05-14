import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Box, Typography 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import WardForm from './WardForm';
import WardItem from './WardItem';
import { WardData } from '../../api/types';
import { 
  fetchWards, 
  createWard, 
  updateWard, 
  deleteWard 
} from '../../api/api';

const WardList: React.FC = () => {
  const [wards, setWards] = useState<WardData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentWard, setCurrentWard] = useState<WardData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [wardToDelete, setWardToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWards = async () => {
      try {
        const { data } = await fetchWards();
        setWards(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wards');
        setLoading(false);
        console.error(err);
      }
    };

    loadWards();
  }, []);

  const handleAddClick = () => {
    setCurrentWard(null);
    setOpenForm(true);
  };

  const handleEditClick = (ward: WardData) => {
    setCurrentWard(ward);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setWardToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (wardToDelete) {
      try {
        await deleteWard(wardToDelete);
        setWards(wards.filter(w => w.ward_id !== wardToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete ward');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (ward: WardData) => {
    try {
      if (currentWard?.ward_id) {
        const { data: updatedWard } = await updateWard(
          currentWard.ward_id, 
          ward
        );
        setWards(wards.map(w => 
          w.ward_id === currentWard.ward_id ? updatedWard : w
        ));
      } else {
        const { data: newWard } = await createWard(ward);
        setWards([...wards, newWard]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save ward');
      console.error(err);
    }
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Палаты</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Добавить палату
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Номер палаты</TableCell>
              <TableCell>Отделение</TableCell>
              <TableCell>Врач</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wards.map(ward => (
              <WardItem 
                key={ward.ward_id}
                ward={ward}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <WardForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        ward={currentWard}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить палату?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Назад</Button>
          <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WardList;