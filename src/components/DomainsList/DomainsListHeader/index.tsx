import { TableCell, TableHead, TableRow } from '@mui/material';

const DomainsListHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Домен</TableCell>
        <TableCell align="center">Статус</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DomainsListHeader;
