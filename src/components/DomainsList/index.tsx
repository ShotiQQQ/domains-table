import { ChangeEvent, useEffect, useState } from 'react';

import styles from './DomainsList.module.scss';

import DomainsListSearch from './DomainsListSearch';
import DomainsListItem from './DomainsListItem';
import DomainsListHeader from './DomainsListHeader';
import DomainsListEmpty from './DomainsListEmpty';
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';

import {
  DomainsListViewFragment,
  useGetDomainsByStringLazyQuery,
  useGetPaginatedListLazyQuery,
  useGetTotalCountLazyQuery,
} from './domains.generated';

const domainsPerPage = 5;

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<DomainsListViewFragment[]>([]);
  const [countPages, setCountPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [getPaginatedList] = useGetPaginatedListLazyQuery();
  const [getFilteredDomains] = useGetDomainsByStringLazyQuery();
  const [getTotalCount] = useGetTotalCountLazyQuery();

  const searchDomains = (value: string) => {
    if (value) {
      getFilteredDomains({
        variables: { includes: value, count: domainsPerPage },
      }).then(({ data }) => {
        if (data?.allLocalDevs?.nodes instanceof Array) {
          setDomainsList([...data?.allLocalDevs?.nodes]);
        }
      });
    } else {
      setDomainsListPaginated();
    }
  };

  const setDomainsListPaginated = (offset?: number) => {
    getPaginatedList({
      variables: {
        offset,
        first: domainsPerPage,
      },
    }).then(({ data }) => {
      const list = data?.allLocalDevs?.nodes;

      list && setDomainsList([...list]);
    });
  };

  const handleClickPagination = (
    event: ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    setDomainsListPaginated(value * domainsPerPage - domainsPerPage);
  };

  useEffect(() => {
    setDomainsListPaginated();

    getTotalCount().then(({ data }) => {
      const totalCount = data?.allLocalDevs?.totalCount;

      totalCount && setCountPages(Math.ceil(totalCount / domainsPerPage));
    });
  }, []);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listSearch}>
        <DomainsListSearch searchDomains={searchDomains} />
      </div>

      <div className={styles.listContent}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550, minHeight: 200 }}>
            <DomainsListHeader />

            <TableBody>
              {!domainsList.length && <DomainsListEmpty />}

              {domainsList.map(({ id, available, domain }) => {
                return (
                  <TableRow key={id} sx={{ verticalAlign: 'text-top' }}>
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

        <Pagination
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
          count={countPages}
          page={currentPage}
          shape="rounded"
          onChange={(event, value) => handleClickPagination(event, value)}
        />
      </div>
    </div>
  );
};

export default DomainsList;
