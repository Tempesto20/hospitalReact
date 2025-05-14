import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { WardData } from '../../api/types';

interface WardItemProps {
  ward: WardData;
  onEdit: (ward: WardData) => void;
  onDelete: (id: number) => void;
}

const WardItem: React.FC<WardItemProps> = ({ 
  ward, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>{ward.ward_number}</TableCell>
      <TableCell>{ward.department_id}</TableCell>
      <TableCell>{ward.doctor_id || 'None'}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(ward)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(ward.ward_id!)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default WardItem;