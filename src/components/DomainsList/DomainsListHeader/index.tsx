import { TableCell, TableHead, TableRow } from '@mui/material';

const DomainsListHeader = () => {
  return (
    <TableHead sx={{ backgroundColor: 'rgb(146, 163, 179, 15%)' }}>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Домен</TableCell>
        <TableCell>Статус</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DomainsListHeader;
