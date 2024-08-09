import styles from './DomainsList.module.scss';
import DomainsListHeader from './DomainsListHeader';
import DomainsListItem from './DomainsListItem';
import { domainsList } from 'models/domainsList';
import { useState } from 'react';
import { TDomainList } from 'types';

const DomainsList = () => {
  const [currentDomainsList, setCurrentDomainsList] =
    useState<TDomainList>(domainsList);

  return (
    <div className={styles.listContainer}>
      <DomainsListHeader />

      <ul className={styles.list}>
        {currentDomainsList.map(({ domainName, isAvailable }) => {
          return (
            <DomainsListItem
              domainName={domainName}
              isAvailable={isAvailable}
              key={domainName}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default DomainsList;
