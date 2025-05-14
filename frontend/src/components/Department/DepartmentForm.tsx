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
import { DepartmentData } from '../../api/types';

interface DepartmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (department: DepartmentData) => void;
  department: DepartmentData | null;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  department 
}) => {
  const [formData, setFormData] = useState<Omit<DepartmentData, 'department_id'>>({
    department_name: ''
  });
  const [errors, setErrors] = useState<{ department_name?: string }>({});

  useEffect(() => {
    if (department) {
      setFormData({
        department_name: department.department_name
      });
    } else {
      setFormData({
        department_name: ''
      });
    }
  }, [department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: { department_name?: string } = {};
    if (!formData.department_name.trim()) {
      newErrors.department_name = 'Department name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...(department?.department_id ? { department_id: department.department_id } : {}),
        ...formData
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {department ? 'Edit Department' : 'Add New Department'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Department Name"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            error={!!errors.department_name}
            helperText={errors.department_name}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {department ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentForm;