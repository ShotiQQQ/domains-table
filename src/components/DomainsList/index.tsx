import { ChangeEvent, useEffect, useRef, useState } from 'react';

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
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import {
  DomainsListViewFragment,
  useGetDomainsLazyQuery,
} from './domains.generated';
import DomainsListAddNewItem from './DomainsListAddNewItem';

const domainsPerPage = 50;
const modalTitle = 'Добавить новый домен';

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<
    (DomainsListViewFragment | null)[]
  >([]);
  const [searchValue, setSearchValue] = useState('');
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const endCursorRef = useRef(endCursor);
  const hasNextPageRef = useRef(hasNextPage);
  const searchValueRef = useRef(searchValue);
  const observedBlockRef = useRef(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [getDomains, { loading }] = useGetDomainsLazyQuery();
  const loadingRef = useRef(loading);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const getDomainsList = (type: 'search' | 'default' = 'default') => {
    getDomains({
      variables: {
        after: type === 'default' ? endCursorRef.current : null,
        first: domainsPerPage,
        includes: searchValueRef.current,
      },
    }).then(({ data }) => {
      const list = data?.allLocalDevs?.nodes;
      const pageInfo = data?.allLocalDevs?.pageInfo;

      if (list) {
        if (type === 'search') {
          if (
            tableContainerRef.current &&
            tableContainerRef.current.scrollTop !== 0
          ) {
            tableContainerRef.current.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
          setDomainsList([...list]);
        } else {
          setDomainsList((prevState) => [...prevState, ...list]);
        }
      }

      if (pageInfo) {
        setEndCursor(pageInfo?.endCursor);
        setHasNextPage(pageInfo?.hasNextPage);
      }
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    endCursorRef.current = endCursor;
  }, [endCursor]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    searchValueRef.current = searchValue;
  }, [searchValue]);

  useEffect(() => {
    getDomainsList();
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!isFirstRender) {
      timeout = setTimeout(() => {
        getDomainsList('search');
      }, 300);
    }

    setIsFirstRender(false);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchValue]);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPageRef.current &&
          !loadingRef.current
        ) {
          getDomainsList();
        }
      }) as IntersectionObserver;

      if (observedBlockRef.current) {
        observer.observe(observedBlockRef.current);
      }
    }
  }, [observedBlockRef.current]);

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} title={modalTitle}>
        <DomainsListAddNewItem closeModal={handleCloseModal} />
      </Modal>

      <div className={styles.listContainer}>
        <div className={styles.listSearch}>
          <div className={styles.listContainerTitle}>
            <h1 className={styles.listTitle}>Управление доменами</h1>
            <IconButton title={modalTitle} onClick={handleOpenModal}>
              <AddCircle color="primary" />
            </IconButton>
          </div>

          <DomainsListSearch value={searchValue} onChange={handleSearch} />
        </div>

        <div className={styles.listContent}>
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableContainerRef}>
              <div className={styles.listWrapper}>
                <Table sx={{ minWidth: 490, minHeight: 200 }} stickyHeader>
                  <DomainsListHeader />

                  <TableBody>
                    {!domainsList.length && !loading && <DomainsListEmpty />}

                    {domainsList.map((item) => {
                      if (!item) {
                        return null;
                      }

                      const { id, available, domain } = item;

                      return (
                        <DomainsListItem
                          available={available}
                          domain={domain}
                          id={id}
                          key={id}
                        />
                      );
                    })}
                  </TableBody>
                </Table>

                <div
                  className={styles.listObserved}
                  ref={observedBlockRef}
                ></div>
              </div>
            </TableContainer>
          </Paper>

          {loading && (
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
