import { LocalDevsOrderBy } from '../../../types';
import { FC } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export interface ISortingItem {
  orderBy: LocalDevsOrderBy;
  text: string;
}

interface ISortingProps {
  value: LocalDevsOrderBy;
  onChange: (event: SelectChangeEvent) => void;
  options: ISortingItem[];
}

const DomainsListSorting: FC<ISortingProps> = ({
  value,
  onChange,
  options,
}) => {
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
        {options.map(({ orderBy, text }) => (
          <MenuItem value={orderBy} key={orderBy}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DomainsListSorting;
