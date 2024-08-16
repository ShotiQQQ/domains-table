import { FC } from 'react';

import styles from './DomainsListItem.module.scss';

import MyButton from 'components/UI/MyButton';
import { TableCell } from '@mui/material';

import { LocalDev } from '../../../types';

const DomainsListItem: FC<LocalDev> = ({ id, domain, available }) => {
  return (
    <>
      <TableCell>{id}</TableCell>
      <TableCell>
        <b>{domain}</b>
      </TableCell>
      <TableCell align="right">
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
        <MyButton size="small">Обновить статус</MyButton>
      </TableCell>
    </>
  );
};

export default DomainsListItem;
