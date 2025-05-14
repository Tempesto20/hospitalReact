import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Box, Typography 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import DepartmentForm from './DepartmentForm';
import DepartmentItem from './DepartmentItem';
import { DepartmentData } from '../../api/types';
import { 
  fetchDepartments, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} from '../../api/api';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<DepartmentData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const { data } = await fetchDepartments();
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch departments');
        setLoading(false);
        console.error(err);
      }
    };

    loadDepartments();
  }, []);

  const handleAddClick = () => {
    setCurrentDepartment(null);
    setOpenForm(true);
  };

  const handleEditClick = (department: DepartmentData) => {
    setCurrentDepartment(department);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setDepartmentToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (departmentToDelete) {
      try {
        await deleteDepartment(departmentToDelete);
        setDepartments(departments.filter(d => d.department_id !== departmentToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete department');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (department: DepartmentData) => {
    try {
      if (currentDepartment?.department_id) {
        const { data: updatedDepartment } = await updateDepartment(
          currentDepartment.department_id, 
          department
        );
        setDepartments(departments.map(d => 
          d.department_id === currentDepartment.department_id ? updatedDepartment : d
        ));
      } else {
        const { data: newDepartment } = await createDepartment(department);
        setDepartments([...departments, newDepartment]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save department');
      console.error(err);
    }
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Отделения</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Добавить Отделение
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Название отделения</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map(department => (
              <DepartmentItem 
                key={department.department_id}
                department={department}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DepartmentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        department={currentDepartment}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить Отделение?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Назад</Button>
          <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentList;