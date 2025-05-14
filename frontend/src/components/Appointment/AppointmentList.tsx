import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Box, Typography 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import AppointmentForm from './AppointmentForm';
import AppointmentItem from './AppointmentItem';
import { AppointmentData } from '../../api/types';
import { 
  fetchAppointments, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../../api/api';

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const { data } = await fetchAppointments();
        console.log('вывод данных ' + data);
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
        console.error(err);
      }
    };

    loadAppointments();
  }, []);

  const handleAddClick = () => {
    setCurrentAppointment(null);
    setOpenForm(true);
  };

  const handleEditClick = (appointment: AppointmentData) => {
    setCurrentAppointment(appointment);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setAppointmentToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete);
        setAppointments(appointments.filter(a => a.appointment_id !== appointmentToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete appointment');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (appointment: AppointmentData) => {
    try {
      if (currentAppointment?.appointment_id) {
        const { data: updatedAppointment } = await updateAppointment(
          currentAppointment.appointment_id, 
          appointment
        );
        setAppointments(appointments.map(a => 
          a.appointment_id === currentAppointment.appointment_id ? updatedAppointment : a
        ));
      } else {
        const { data: newAppointment } = await createAppointment(appointment);
        setAppointments([...appointments, newAppointment]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save appointment');
      console.error(err);
    }
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Приемы</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Добавить прием
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер приема</TableCell>
              <TableCell>Пациен</TableCell>
              <TableCell>Доктор</TableCell>
              <TableCell>Номер палаты</TableCell>
              <TableCell>Дата приема</TableCell>
              <TableCell>Сиптомы</TableCell>
              <TableCell>Диагноз</TableCell>
              <TableCell>Аллергия</TableCell>
              <TableCell>Препараты</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appointment => (
              <AppointmentItem 
                key={appointment.appointment_id}
                appointment={appointment}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AppointmentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        appointment={currentAppointment}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы действительно хотите удалить прием?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Назад</Button>
          <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentList;