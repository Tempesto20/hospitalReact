import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Box, Typography 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import SpecialtyForm from './SpecialtyForm';
import SpecialtyItem from './SpecialtyItem';
import { SpecialtyData } from '../../api/types';
import { fetchSpecialties, createSpecialty, updateSpecialty, deleteSpecialty } from '../../api/api';

const SpecialtyList: React.FC = () => {
  const [specialties, setSpecialties] = useState<SpecialtyData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState<SpecialtyData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const { data } = await fetchSpecialties();
        setSpecialties(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch specialties');
        setLoading(false);
        console.error(err);
      }
    };

    loadSpecialties();
  }, []);

  const handleAddClick = () => {
    setCurrentSpecialty(null);
    setOpenForm(true);
  };

  const handleEditClick = (specialty: SpecialtyData) => {
    setCurrentSpecialty(specialty);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number | any) => {
    setSpecialtyToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (specialtyToDelete) {
      try {
        await deleteSpecialty(specialtyToDelete);
        setSpecialties(specialties.filter(s => s.specialty_id !== specialtyToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete specialty');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (specialty: SpecialtyData) => {
    try {
      if (currentSpecialty && currentSpecialty.specialty_id) {
        const { data: updatedSpecialty } = await updateSpecialty(currentSpecialty.specialty_id, specialty);
        setSpecialties(specialties.map(s => 
          s.specialty_id === currentSpecialty.specialty_id ? updatedSpecialty : s
        ));
      } else {
        const { data: newSpecialty } = await createSpecialty(specialty);
        setSpecialties([...specialties, newSpecialty]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save specialty');
      console.error(err);
    }
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Специальности</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Добавить Специальности
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Название специальности</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specialties.map(specialty => (
              <SpecialtyItem 
                key={specialty.specialty_id}
                specialty={specialty}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SpecialtyForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        specialty={currentSpecialty}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить специальность?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Назад</Button>
          <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialtyList;