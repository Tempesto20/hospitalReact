import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Box, Typography 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import DoctorForm from './DoctorForm';
import DoctorItem from './DoctorItem';
import { DoctorData } from '../../api/types';
import { 
  fetchDoctors, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor 
} from '../../api/api';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const { data } = await fetchDoctors();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors');
        setLoading(false);
        console.error(err);
      }
    };

    loadDoctors();
  }, []);

  const handleAddClick = () => {
    setCurrentDoctor(null);
    setOpenForm(true);
  };

  const handleEditClick = (doctor: DoctorData) => {
    setCurrentDoctor(doctor);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setDoctorToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (doctorToDelete) {
      try {
        await deleteDoctor(doctorToDelete);
        setDoctors(doctors.filter(d => d.doctor_id !== doctorToDelete));
        setOpenDeleteDialog(false);
      } catch (err) {
        setError('Failed to delete doctor');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (doctor: DoctorData) => {
    try {
      if (currentDoctor?.doctor_id) {
        const { data: updatedDoctor } = await updateDoctor(
          currentDoctor.doctor_id, 
          doctor
        );
        setDoctors(doctors.map(d => 
          d.doctor_id === currentDoctor.doctor_id ? updatedDoctor : d
        ));
      } else {
        const { data: newDoctor } = await createDoctor(doctor);
        setDoctors([...doctors, newDoctor]);
      }
      setOpenForm(false);
    } catch (err) {
      setError('Failed to save doctor');
      console.error(err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h4">Doctors</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Add Doctor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map(doctor => (
              <DoctorItem 
                key={doctor.doctor_id}
                doctor={doctor}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DoctorForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        doctor={currentDoctor}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this doctor?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorList;