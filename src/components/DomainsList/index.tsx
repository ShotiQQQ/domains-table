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
  SelectChangeEvent,
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
import { scrollElementToTop } from '../../utils/scrollElementToTop';
import DomainsListSorting from './DomainsListSorting';
import { LocalDevsOrderBy } from '../../types';

const domainsPerPage = 50;
const modalTitle = 'Добавить новый домен';

const DomainsList = () => {
  const [domainsList, setDomainsList] = useState<
    (DomainsListViewFragment | null)[]
  >([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<LocalDevsOrderBy>(
    LocalDevsOrderBy.Natural,
  );
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const endCursorRef = useRef(endCursor);
  const hasNextPageRef = useRef(hasNextPage);
  const searchValueRef = useRef(searchValue);
  const sortValueRef = useRef(sortValue);
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

  const handleSorting = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as LocalDevsOrderBy);
  };
  const getDomainsList = (type: 'search' | 'default' = 'default') => {
    getDomains({
      variables: {
        after: type === 'default' ? endCursorRef.current : null,
        first: domainsPerPage,
        includes: searchValueRef.current,
        orderBy: sortValueRef.current,
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
            scrollElementToTop(tableContainerRef.current);
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

  const handleClickRemoveSearch = () => {
    setSearchValue('');
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
    sortValueRef.current = sortValue;
  }, [sortValue]);

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
    if (!isFirstRender) {
      getDomainsList('search');
    }
  }, [sortValue]);

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

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <DomainsListSearch
              isVisibleRemove={!!searchValue.length}
              value={searchValue}
              handleClickRemoveSearch={handleClickRemoveSearch}
              onChange={handleSearch}
            />

            <DomainsListSorting value={sortValue} onChange={handleSorting} />
          </div>
        </div>

        <div className={styles.listContent}>
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer
              sx={{ maxHeight: 440, overscrollBehavior: 'none' }}
              className={styles.listTableContainer}
              ref={tableContainerRef}
            >
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
