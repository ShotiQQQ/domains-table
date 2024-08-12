import styles from './DomainsList.module.scss';
import DomainsListHeader from './DomainsListHeader';
import DomainsListItem from './DomainsListItem';
import { domainsList } from 'models/domainsList';
import { ChangeEvent, useState } from 'react';
import { TDomainList } from 'types';
import Input from '../UI/Input';

const DomainsList = () => {
  const [currentDomainsList, setCurrentDomainsList] =
    useState<TDomainList>(domainsList);
  const [filteredDomainsList, setFilteredDomainsList] = useState<TDomainList>([...currentDomainsList]);
  const [searchInputValue, setSearchInputValue] = useState('');

  const setCurrentSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);

    setTimeout(() => {
      searchItems(event.target.value);
    }, 300);
  }

  const searchItems = (value: string) => {
    const includedItems = currentDomainsList.filter((item) => item.domainName.includes(value));

    if (includedItems.length && searchInputValue) {
      setFilteredDomainsList([...includedItems])
    } else {
      setFilteredDomainsList([...currentDomainsList])
    }
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listSearch}>
        <Input value={searchInputValue} placeholder='Поиск' onChange={setCurrentSearchInputValue} />
      </div>

      <DomainsListHeader />

      <ul className={styles.list}>
        {filteredDomainsList.map(({ domainName, isAvailable }) => {
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
