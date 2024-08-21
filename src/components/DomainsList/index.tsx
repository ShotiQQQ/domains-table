import { useEffect, useRef, useState } from 'react';

import styles from './DomainsList.module.scss';

import DomainsListSearch from './DomainsListSearch';
import DomainsListItem from './DomainsListItem';
import DomainsListHeader from './DomainsListHeader';
import DomainsListEmpty from './DomainsListEmpty';
import {
  CircularProgress,
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
} from './domains.generated';

const domainsPerPage = 20;

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<
    (DomainsListViewFragment | null)[]
  >([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);

  const observedBlock = useRef(null);
  const endCursorRef = useRef(endCursor);
  const hasNextPageRef = useRef(hasNextPage);

  const [getPaginatedList, { loading: paginatedListLoading }] =
    useGetPaginatedListLazyQuery();
  const [getFilteredDomains] = useGetDomainsByStringLazyQuery();

  const searchDomains = (value: string) => {
    if (value) {
      getFilteredDomains({
        variables: { includes: value, count: domainsPerPage },
      }).then(({ data }) => {
        const list = data?.allLocalDevs?.nodes;

        if (list) {
          setDomainsList([...list]);
        }
      });
    } else {
      setDomainsListPaginated();
    }
  };

  const setDomainsListPaginated = (after?: string | null) => {
    getPaginatedList({
      variables: {
        after,
        first: domainsPerPage,
      },
    }).then(({ data }) => {
      const list = data?.allLocalDevs?.nodes;
      const pageInfo = data?.allLocalDevs?.pageInfo;

      if (list) {
        setDomainsList([...domainsList, ...list]);
      }

      if (pageInfo) {
        setEndCursor(pageInfo?.endCursor);
        setHasNextPage(pageInfo?.hasNextPage);
      }
    });
  };

  useEffect(() => {
    endCursorRef.current = endCursor;
  }, [endCursor]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    setDomainsListPaginated();
  }, []);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting }) => {
      if (isIntersecting && hasNextPage) {
        setDomainsListPaginated(endCursorRef.current);
      }
    });
  });

  useEffect(() => {
    if (observer) observer.disconnect();

    if (observedBlock.current) {
      observer.observe(observedBlock.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer]);

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
              {!domainsList.length && !paginatedListLoading && (
                <DomainsListEmpty />
              )}

              {domainsList.map((item) => {
                if (!item) {
                  return null;
                }

                const { id, available, domain } = item;

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
        <div className={styles.listObserved} ref={observedBlock}></div>

        {paginatedListLoading && (
          <CircularProgress
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '-50px',
              transform: 'translateX(-50%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DomainsList;
