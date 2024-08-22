import { useEffect, useRef, useState } from 'react';

import styles from './DomainsList.module.scss';

import DomainsListSearch from './DomainsListSearch';
import DomainsListItem from './DomainsListItem';
import DomainsListHeader from './DomainsListHeader';
import DomainsListEmpty from './DomainsListEmpty';
import Modal from '../Modal';
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import {
  DomainsListViewFragment,
  useGetDomainsByStringLazyQuery,
  useGetPaginatedListLazyQuery,
} from './domains.generated';

const domainsPerPage = 20;
const modalTitle = 'Добавить запись в таблицу';

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<
    (DomainsListViewFragment | null)[]
  >([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const endCursorRef = useRef(endCursor);
  const hasNextPageRef = useRef(hasNextPage);
  const observedBlockRef = useRef(null);

  const [getPaginatedList, { loading: paginatedListLoading }] =
    useGetPaginatedListLazyQuery();
  const [getFilteredDomains] = useGetDomainsByStringLazyQuery();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

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
        setDomainsList((prevState) => [...prevState, ...list]);
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

  useEffect(() => {
    if (!paginatedListLoading) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !!domainsList.length) {
          setDomainsListPaginated(endCursorRef.current);
        }
      }) as IntersectionObserver;

      if (observedBlockRef.current) {
        observer.observe(observedBlockRef.current);
      }
    }
  }, [hasNextPage]);

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        title={modalTitle}
      />

      <div className={styles.listContainer}>
        <div className={styles.listSearch}>
          <DomainsListSearch searchDomains={searchDomains} />

          <IconButton title={modalTitle} onClick={handleOpenModal}>
            <AddCircle color="primary" />
          </IconButton>
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

          <div className={styles.listObserved} ref={observedBlockRef}></div>

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
    </>
  );
};

export default DomainsList;
