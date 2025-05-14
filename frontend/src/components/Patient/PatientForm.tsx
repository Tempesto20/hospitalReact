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
import { PatientData } from '../../api/types';

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (patient: PatientData) => void;
  patient: PatientData | null;
}

const PatientForm: React.FC<PatientFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  patient 
}) => {
  const [formData, setFormData] = useState<Omit<PatientData, 'patient_id'>>({
    full_name: '',
    birth_date: new Date().toISOString().split('T')[0],
    insurance_policy: '',
    passport: '',
    admission_date: new Date().toISOString().split('T')[0],
    discharge_date: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (patient) {
      setFormData({
        full_name: patient.full_name,
        birth_date: patient.birth_date,
        insurance_policy: patient.insurance_policy,
        passport: patient.passport,
        admission_date: patient.admission_date,
        discharge_date: patient.discharge_date || ''
      });
    } else {
      setFormData({
        full_name: '',
        birth_date: new Date().toISOString().split('T')[0],
        insurance_policy: '',
        passport: '',
        admission_date: new Date().toISOString().split('T')[0],
        discharge_date: ''
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (!formData.insurance_policy.match(/^[А-Я]{2}[0-9]{4}[А-Я]$/)) {
      newErrors.insurance_policy = 'Invalid insurance policy format (XX9999X)';
    }
    
    if (!formData.passport.match(/^[0-9]{2} [0-9]{2} [0-9]{6}$/)) {
      newErrors.passport = 'Invalid passport format (00 00 000000)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...(patient?.patient_id ? { patient_id: patient.patient_id } : {}),
        ...formData,
        discharge_date: formData.discharge_date || undefined
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {patient ? 'Edit Patient' : 'Add New Patient'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2, display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            error={!!errors.full_name}
            helperText={errors.full_name}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Birth Date"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Insurance Policy"
            name="insurance_policy"
            value={formData.insurance_policy}
            onChange={handleChange}
            error={!!errors.insurance_policy}
            helperText={errors.insurance_policy}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Passport"
            name="passport"
            value={formData.passport}
            onChange={handleChange}
            error={!!errors.passport}
            helperText={errors.passport}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Admission Date"
            type="date"
            name="admission_date"
            value={formData.admission_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Discharge Date"
            type="date"
            name="discharge_date"
            value={formData.discharge_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {patient ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;