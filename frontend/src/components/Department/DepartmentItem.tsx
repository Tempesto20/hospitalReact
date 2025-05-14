import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DepartmentData } from '../../api/types';

interface DepartmentItemProps {
  department: DepartmentData;
  onEdit: (department: DepartmentData) => void;
  onDelete: (id: number) => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({ 
  department, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>{department.department_name}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(department)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(department.department_id!)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DepartmentItem;