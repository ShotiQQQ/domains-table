import { LocalDevsOrderBy } from '../../../types';
import { FC } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const { AvailableDesc, AvailableAsc, Natural } = LocalDevsOrderBy;

interface ISortingProps {
  value: LocalDevsOrderBy;
  onChange: (event: SelectChangeEvent) => void;
}

const DomainsListSorting: FC<ISortingProps> = ({ value, onChange }) => {
  return (
    <FormControl size="small" style={{ width: '30%' }}>
      <InputLabel id="select-label">Сортировать</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        label="Сортировка"
        variant="outlined"
        size="small"
        value={value}
        onChange={onChange}
      >
        <MenuItem value={Natural}>По умолчанию</MenuItem>
        <MenuItem value={AvailableDesc}>По статусу - сначала доступен</MenuItem>
        <MenuItem value={AvailableAsc}>
          По статусу - сначала недоступен
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default DomainsListSorting;
