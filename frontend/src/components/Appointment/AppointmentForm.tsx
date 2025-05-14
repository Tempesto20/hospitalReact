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
import { AppointmentData } from '../../api/types';
import { fetchPatients, fetchDoctors, fetchWards } from '../../api/api';

interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (appointment: AppointmentData) => void;
  appointment: AppointmentData | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  appointment 
}) => {
  const [formData, setFormData] = useState<Omit<AppointmentData, 'appointment_id'>>({
    patient_id: 0,
    doctor_id: 0,
    ward_id: 0,
    appointment_date: new Date().toISOString().split('T')[0],
    symptom: '',
    diagnos: '',
    allergy: '',
    preparation: ''
  });
  const [patients, setPatients] = useState<{id: number, name: string}[]>([]);
  const [doctors, setDoctors] = useState<{id: number, name: string}[]>([]);
  const [wards, setWards] = useState<{id: number, number: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const patientsRes = await fetchPatients();
        const doctorsRes = await fetchDoctors();
        const wardsRes = await fetchWards();
        
        setPatients(patientsRes.data.map((p: any) => ({ id: p.patient_id, name: p.full_name })));
        setDoctors(doctorsRes.data.map((d: any) => ({ id: d.doctor_id, name: d.full_name })));
        setWards(wardsRes.data.map((w: any) => ({ id: w.ward_id, number: w.ward_number })));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
        ward_id: appointment.ward_id || 0,
        appointment_date: appointment.appointment_date,
        symptom: appointment.symptom || '',
        diagnos: appointment.diagnos || '',
        allergy: appointment.allergy || '',
        preparation: appointment.preparation || ''
      });
    } else {
      setFormData({
        patient_id: 0,
        doctor_id: 0,
        ward_id: 0,
        appointment_date: new Date().toISOString().split('T')[0],
        symptom: '',
        diagnos: '',
        allergy: '',
        preparation: ''
      });
    }
  }, [appointment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...(appointment?.appointment_id ? { appointment_id: appointment.appointment_id } : {}),
      ...formData
    });
  };

  if (loading) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {appointment ? 'Edit Appointment' : 'Add New Appointment'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2, display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
          <TextField
            select
            fullWidth
            label="Patient"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            margin="normal"
          >
            {patients.map(patient => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name}
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
            {doctors.map(doctor => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Ward"
            name="ward_id"
            value={formData.ward_id}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value={0}>None</MenuItem>
            {wards.map(ward => (
              <MenuItem key={ward.id} value={ward.id}>
                {ward.number}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Date"
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Symptoms"
            name="symptom"
            value={formData.symptom}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Diagnosis"
            name="diagnos"
            value={formData.diagnos}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Allergies"
            name="allergy"
            value={formData.allergy}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Preparations"
            name="preparation"
            value={formData.preparation}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Назад</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {appointment ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;