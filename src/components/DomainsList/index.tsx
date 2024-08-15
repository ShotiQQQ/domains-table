import { useEffect, useState } from 'react';

import styles from './DomainsList.module.scss';

import DomainsListHeader from './DomainsListHeader';
import DomainsListItem from './DomainsListItem';
import DomainsListSearch from './DomainsListSearch';

import {
  DomainsListViewFragment,
  useAllDomainsQuery,
  useGetDomainsByStringLazyQuery,
} from './domains.generated';

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<DomainsListViewFragment[]>([]);

  const { data: allDomains, loading: allDomainsLoading } = useAllDomainsQuery();
  const [getFilteredDomains] = useGetDomainsByStringLazyQuery();

  const searchDomains = (value: string) => {
    getFilteredDomains({
      variables: { includes: value },
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
        <DomainsListSearch onClick={searchDomains} />
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
