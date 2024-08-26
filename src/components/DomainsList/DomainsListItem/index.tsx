import { FC } from 'react';

import styles from './DomainsListItem.module.scss';

import MyButton from 'components/UI/MyButton';
import { Link, TableCell } from '@mui/material';

import { LocalDev } from '../../../types';
import { RestartAlt } from '@mui/icons-material';

const DomainsListItem: FC<LocalDev> = ({ id, domain, available }) => {
  return (
    <>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link href={domain} underline="hover" target="_blank">
          {domain}
        </Link>
      </TableCell>
      <TableCell>
        <p
          className={styles.itemText}
          style={{
            color: available ? '#2e7d32' : '#d32f2f',
            margin: 0,
          }}
        >
          {available ? 'Доступен' : 'Недоступен'}
        </p>
      </TableCell>
      <TableCell align="right">
        <MyButton size="small" style={{ minWidth: 'auto' }}>
          <RestartAlt />
        </MyButton>
      </TableCell>
    </>
  );
};

export default DomainsListItem;
