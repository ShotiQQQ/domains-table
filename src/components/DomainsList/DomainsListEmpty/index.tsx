import { TableCell, TableRow } from '@mui/material';

const DomainsListEmpty = () => {
  return (
    <TableRow>
      <TableCell>
        <p style={{ margin: 0 }}>Список пуст...</p>
      </TableCell>
    </TableRow>
  );
};

export default DomainsListEmpty;
