import { LocalDevsOrderBy } from '../types';
import { ISortingItem } from '../components/DomainsList/DomainsListSorting';

const { AvailableDesc, AvailableAsc, Natural, IdDesc, IdAsc } =
  LocalDevsOrderBy;

export const sortingOptions: ISortingItem[] = [
  {
    orderBy: Natural,
    text: 'По умолчанию',
  },
  {
    orderBy: AvailableDesc,
    text: 'По статусу - сначала доступен',
  },
  {
    orderBy: AvailableAsc,
    text: 'По статусу - сначала недоступен',
  },
  {
    orderBy: IdAsc,
    text: 'По id - от меньшего к большему',
  },
  {
    orderBy: IdDesc,
    text: 'По id - от большего к меньшему',
  },
];
