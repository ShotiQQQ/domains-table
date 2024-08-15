import styles from './DomainsListItem.module.scss';
import { FC } from 'react';
import Button from 'components/UI/Button';
import { LocalDev } from '../../../types';

const DomainsListItem: FC<LocalDev> = ({ id, domain, available }) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemDomain}>
        <p className={styles.itemText}>
          {id}. {domain}
        </p>
      </div>
      <div className={styles.itemStatus}>
        <p
          className={styles.itemText}
          style={{ color: available ? 'lightgreen' : 'red' }}
        >
          {available ? 'Доступен' : 'Недоступен'}
        </p>
      </div>
      <div className={styles.itemButtons}>
        <Button>Обновить статус</Button>
      </div>
    </li>
  );
};

export default DomainsListItem;
