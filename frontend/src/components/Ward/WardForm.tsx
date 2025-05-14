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
import { WardData } from '../../api/types';
import { fetchDepartments, fetchDoctors } from '../../api/api';

interface WardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ward: WardData) => void;
  ward: WardData | null;
}

const WardForm: React.FC<WardFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  ward 
}) => {
  const [formData, setFormData] = useState<Omit<WardData, 'ward_id'>>({
    ward_number: '',
    department_id: 0,
    doctor_id: 0
  });
  const [departments, setDepartments] = useState<{id: number, name: string}[]>([]);
  const [doctors, setDoctors] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const departmentsRes = await fetchDepartments();
        const doctorsRes = await fetchDoctors();
        
        setDepartments(departmentsRes.data.map((d: any) => ({ id: d.department_id, name: d.department_name })));
        setDoctors(doctorsRes.data.map((d: any) => ({ id: d.doctor_id, name: d.full_name })));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (ward) {
      setFormData({
        ward_number: ward.ward_number,
        department_id: ward.department_id,
        doctor_id: ward.doctor_id || 0
      });
    } else {
      setFormData({
        ward_number: '',
        department_id: 0,
        doctor_id: 0
      });
    }
  }, [ward]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...(ward?.ward_id ? { ward_id: ward.ward_id } : {}),
      ...formData,
      doctor_id: formData.doctor_id || undefined
    });
  };

  if (loading) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {ward ? 'Edit Ward' : 'Add New Ward'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Ward Number"
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Department"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            margin="normal"
          >
            {departments.map(department => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Doctor"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value={0}>None</MenuItem>
            {doctors.map(doctor => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {ward ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WardForm;