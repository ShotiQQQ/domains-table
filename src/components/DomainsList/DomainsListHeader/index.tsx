import { TableCell, TableHead, TableRow } from '@mui/material';

const DomainsListHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>id</TableCell>
        <TableCell>Домен</TableCell>
        <TableCell align="right">Статус</TableCell>
        <TableCell align="right">Управление</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DomainsListHeader;
