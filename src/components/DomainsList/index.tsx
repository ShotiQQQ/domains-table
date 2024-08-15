import styles from './DomainsList.module.scss';
import DomainsListHeader from './DomainsListHeader';
import DomainsListItem from './DomainsListItem';
import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import {
  useAllDomainsQuery,
  useGetDomainsByStringLazyQuery,
} from '../../query/domains.generated';
import { LocalDev } from '../../types/types';

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<LocalDev[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  const { data: allDomains, loading: allDomainsLoading } = useAllDomainsQuery();
  const [getFilteredDomains] = useGetDomainsByStringLazyQuery();

  const setCurrentSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const handleSearchDomains = () => {
    getFilteredDomains({
      variables: { includes: searchInputValue },
    }).then(({ data }) => {
      if (data?.allLocalDevsList instanceof Array) {
        setDomainsList([...data?.allLocalDevsList]);
      }
    });
  };

  useEffect(() => {
    if (!allDomainsLoading) {
      if (allDomains?.allLocalDevsList instanceof Array && !allDomainsLoading) {
        setDomainsList([...allDomains?.allLocalDevsList]);
      }
    }
  }, [allDomains, allDomainsLoading]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listSearch}>
        <Input
          value={searchInputValue}
          placeholder="Поиск"
          onChange={setCurrentSearchInputValue}
        />

        <Button style={{ marginLeft: '12px' }} onClick={handleSearchDomains}>
          Поиск
        </Button>
      </div>

      <DomainsListHeader />

      <div className={styles.listContent}>
        {!domainsList.length && !allDomainsLoading && (
          <p className="">Список пуст...</p>
        )}

        {allDomainsLoading && <div className={styles.listLoader}></div>}

        {!allDomainsLoading && (
          <ul className={styles.list}>
            {domainsList.map(({ domain, available, id }) => {
              return (
                <DomainsListItem
                  id={id}
                  domain={domain}
                  available={available}
                  key={id}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DomainsList;
