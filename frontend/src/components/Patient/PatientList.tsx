import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Box, Typography 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import PatientForm from './PatientForm';
import PatientItem from './PatientItem';
import { PatientData } from '../../api/types';
import { 
  fetchPatients, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from '../../api/api';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<PatientData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const { data } = await fetchPatients();
        setPatients(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch patients');
        setLoading(false);
        console.error(err);
      }
    };

    loadPatients();
  }, []);

  const handleAddClick = () => {
    setCurrentPatient(null);
    setOpenForm(true);
  };

  const handleEditClick = (patient: PatientData) => {
    setCurrentPatient(patient);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setPatientToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (patientToDelete) {
      try {
        await deletePatient(patientToDelete);
        setPatients(patients.filter(p => p.patient_id !== patientToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete patient');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (patient: PatientData) => {
    try {
      if (currentPatient?.patient_id) {
        const { data: updatedPatient } = await updatePatient(
          currentPatient.patient_id, 
          patient
        );
        setPatients(patients.map(p => 
          p.patient_id === currentPatient.patient_id ? updatedPatient : p
        ));
      } else {
        const { data: newPatient } = await createPatient(patient);
        setPatients([...patients, newPatient]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save patient');
      console.error(err);
    }
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Пациенты</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Добавить Пациента
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>ФИО</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Полис</TableCell>
              <TableCell>Паспорт</TableCell>
              <TableCell>Дата поступления</TableCell>
              <TableCell>Дата выписки</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(patient => (
              <PatientItem 
                key={patient.patient_id}
                patient={patient}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PatientForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        patient={currentPatient}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить пациента?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Назад</Button>
          <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientList;