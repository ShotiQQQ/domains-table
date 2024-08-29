import { ChangeEvent, FC } from 'react';

import MyInput from '../../UI/MyInput';
import Form from '../../UI/Form';

interface ISearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DomainsListSearch: FC<ISearchProps> = ({ value, onChange }) => {
  return (
    <Form style={{ display: 'flex', gap: '12px' }}>
      <MyInput
        value={value}
        placeholder="Найти домен"
        onChange={onChange}
        sx={{ width: '100%' }}
      />
    </Form>
  );
};

export default DomainsListSearch;
