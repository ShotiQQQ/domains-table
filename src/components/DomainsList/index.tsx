import { useEffect, useState } from 'react';

import styles from './DomainsList.module.scss';

import DomainsListSearch from './DomainsListSearch';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';

import {
  DomainsListViewFragment,
  useAllDomainsQuery,
  useGetDomainsByStringLazyQuery,
} from './domains.generated';
import DomainsListItem from './DomainsListItem';
import DomainsListHeader from './DomainsListHeader';
import DomainsListEmpty from './DomainsListEmpty';

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
        <DomainsListSearch searchDomains={searchDomains} />
      </div>

      <div className={styles.listContent}>
        {allDomainsLoading && <div className={styles.listLoader}></div>}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550, minHeight: 200 }}>
            <DomainsListHeader />

            <TableBody>
              {!domainsList.length && !allDomainsLoading && (
                <DomainsListEmpty />
              )}

              {!allDomainsLoading &&
                domainsList.map(({ domain, available, id }) => {
                  return (
                    <TableRow key={id}>
                      <DomainsListItem
                        available={available}
                        domain={domain}
                        id={id}
                      />
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DomainsList;
