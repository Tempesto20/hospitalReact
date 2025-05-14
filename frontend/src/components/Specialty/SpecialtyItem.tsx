import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { SpecialtyData } from '../../api/types';

interface SpecialtyItemProps {
  specialty: SpecialtyData;
  onEdit: (specialty: SpecialtyData) => void;
  onDelete: (id: number | any) => void;
}

const SpecialtyItem: React.FC<SpecialtyItemProps> = ({ specialty, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{specialty.specialty_name}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(specialty)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(specialty.specialty_id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SpecialtyItem;