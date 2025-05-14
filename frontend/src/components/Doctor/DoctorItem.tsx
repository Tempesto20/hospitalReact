import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DoctorData } from '../../api/types';

interface DoctorItemProps {
  doctor: DoctorData;
  onEdit: (doctor: DoctorData) => void;
  onDelete: (id: number) => void;
}

const DoctorItem: React.FC<DoctorItemProps> = ({ 
  doctor, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>{doctor.doctor_id}</TableCell>
      <TableCell>{doctor.full_name}</TableCell>
      <TableCell>{doctor.specialty_id}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(doctor)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(doctor.doctor_id!)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DoctorItem;