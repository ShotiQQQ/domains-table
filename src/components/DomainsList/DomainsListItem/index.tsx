import { FC } from 'react';

import styles from './DomainsListItem.module.scss';

import MyButton from 'components/UI/MyButton';
import { Link, TableCell, TableRow } from '@mui/material';
import { LocalDev } from '../../../types';
import { RestartAlt } from '@mui/icons-material';
import DomainsListStatus from '../DomainsListStatus';

const DomainsListItem: FC<LocalDev> = ({ id, domain, available }) => {
  return (
    <TableRow
      sx={{ verticalAlign: 'text-top' }}
      hover
      className={styles.itemRow}
    >
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link href={domain} underline="hover" target="_blank">
          {domain}
        </Link>
      </TableCell>
      <TableCell align="center" width="100">
        <DomainsListStatus isAvailable={available} />
      </TableCell>
      <TableCell align="right">
        <MyButton
          size="small"
          variant="text"
          className={styles.itemButton}
          style={{ minWidth: 'auto' }}
        >
          <RestartAlt />
        </MyButton>
      </TableCell>
    </TableRow>
  );
};

export default DomainsListItem;
