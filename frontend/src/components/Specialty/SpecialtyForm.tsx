import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { SpecialtyData } from '../../api/types';

interface SpecialtyFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (specialty: SpecialtyData) => void;
  specialty: SpecialtyData | any;
}

const SpecialtyForm: React.FC<SpecialtyFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  specialty 
}) => {
  const [formData, setFormData] = useState<Omit<SpecialtyData, 'specialty_id'>>({
    specialty_name: ''
  });
  const [errors, setErrors] = useState<{ specialty_name?: string }>({});

  useEffect(() => {
    if (specialty) {
      setFormData({
        specialty_name: specialty.specialty_name
      });
    } else {
      setFormData({
        specialty_name: ''
      });
    }
  }, [specialty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: { specialty_name?: string } = {};
    if (!formData.specialty_name.trim()) {
      newErrors.specialty_name = 'Specialty name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...(specialty?.specialty_id ? { specialty_id: specialty.specialty_id } : {}),
        ...formData
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {specialty ? 'Edit Specialty' : 'Add New Specialty'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Specialty Name"
            name="specialty_name"
            value={formData.specialty_name}
            onChange={handleChange}
            error={!!errors.specialty_name}
            helperText={errors.specialty_name}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {specialty ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SpecialtyForm;