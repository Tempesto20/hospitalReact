import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { AppointmentData } from '../../api/types';

interface AppointmentItemProps {
  appointment: AppointmentData;
  onEdit: (appointment: AppointmentData) => void;
  onDelete: (id: number) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ 
  appointment, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>{appointment.appointment_id}</TableCell>
      <TableCell>{appointment.patient_id}</TableCell>
      <TableCell>{appointment.doctor_id}</TableCell>
      <TableCell>{appointment.ward_id}</TableCell>
      <TableCell>{new Date(appointment.appointment_date).toLocaleDateString()}</TableCell>
      <TableCell>{appointment.symptom}</TableCell>
      <TableCell>{appointment.diagnos}</TableCell>
      <TableCell>{appointment.allergy}</TableCell>
      <TableCell>{appointment.preparation}</TableCell>

      <TableCell>
        <IconButton onClick={() => onEdit(appointment)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(appointment.appointment_id!)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentItem;