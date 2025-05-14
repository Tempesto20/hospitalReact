import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { PatientData } from '../../api/types';

interface PatientItemProps {
  patient: PatientData;
  onEdit: (patient: PatientData) => void;
  onDelete: (id: number) => void;
}

const PatientItem: React.FC<PatientItemProps> = ({ 
  patient, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>{patient.full_name}</TableCell>
      <TableCell>{new Date(patient.birth_date).toLocaleDateString()}</TableCell>
      <TableCell>{patient.insurance_policy}</TableCell>
      <TableCell>{patient.passport}</TableCell>
      <TableCell>{new Date(patient.admission_date).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(patient.discharge_date).toLocaleDateString()}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(patient)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(patient.patient_id!)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PatientItem;