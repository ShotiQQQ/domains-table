import styles from './DomainsListItem.module.scss';
import { FC } from 'react';
import { IDomainItem } from 'types';
import Button from '../../UI/Button';

const DomainsListItem: FC<IDomainItem> = ({ domainName, isAvailable }) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemDomain}>
        <p className={styles.itemText}>{domainName}</p>
      </div>
      <div className={styles.itemStatus}>
        <p
          className={styles.itemText}
          style={{ color: isAvailable ? 'lightgreen' : 'red' }}
        >
          {isAvailable ? 'Доступен' : 'Недоступен'}
        </p>
      </div>
      <div className={styles.itemButtons}>
        <Button text="Обновить статус" />
      </div>
    </li>
  );
};

export default DomainsListItem;
