import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from '@mui/material';
import { DoctorData } from '../../api/types';
import { fetchSpecialties } from '../../api/api';

interface DoctorFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (doctor: DoctorData) => void;
  doctor: DoctorData | null;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  doctor 
}) => {
  const [formData, setFormData] = useState<Omit<DoctorData, 'doctor_id'>>({
    full_name: '',
    specialty_id: 0
  });
  const [specialties, setSpecialties] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const { data } = await fetchSpecialties();
        setSpecialties(data.map((s: any) => ({ id: s.specialty_id, name: s.specialty_name })));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadSpecialties();
  }, []);

  useEffect(() => {
    if (doctor) {
      setFormData({
        full_name: doctor.full_name,
        specialty_id: doctor.specialty_id
      });
    } else {
      setFormData({
        full_name: '',
        specialty_id: 0
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...(doctor?.doctor_id ? { doctor_id: doctor.doctor_id } : {}),
      ...formData
    });
  };

  if (loading) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {doctor ? 'Edit Doctor' : 'Add New Doctor'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Specialty"
            name="specialty_id"
            value={formData.specialty_id}
            onChange={handleChange}
            margin="normal"
          >
            {specialties.map(specialty => (
              <MenuItem key={specialty.id} value={specialty.id}>
                {specialty.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {doctor ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoctorForm;