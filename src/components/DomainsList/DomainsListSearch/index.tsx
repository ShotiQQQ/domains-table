import { ChangeEvent, FC } from 'react';

import MyInput from '../../UI/MyInput';
import Form from '../../UI/Form';
import { IconButton, InputAdornment } from '@mui/material';
import { Close } from '@mui/icons-material';

interface ISearchProps {
  value: string;
  isVisibleRemove: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickRemoveSearch: () => void;
}

const DomainsListSearch: FC<ISearchProps> = ({
  value,
  onChange,
  handleClickRemoveSearch,
  isVisibleRemove = false,
}) => {
  return (
    <Form style={{ display: 'flex', gap: '12px', width: '65%' }}>
      <MyInput
        value={value}
        placeholder="Найти домен"
        onChange={onChange}
        sx={{ width: '100%' }}
        endAdornment={
          isVisibleRemove ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickRemoveSearch}
                edge="end"
                sx={{ padding: '4px' }}
              >
                <Close />
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
    </Form>
  );
};

export default DomainsListSearch;
