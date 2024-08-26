import { ChangeEvent, FC, useState } from 'react';

import MyInput from '../../UI/MyInput';
import MyButton from '../../UI/MyButton';
import Form from '../../UI/Form';
import { Search } from '@mui/icons-material';

interface ISearchProps {
  searchDomains: (value: string) => void;
}

const DomainsListSearch: FC<ISearchProps> = ({ searchDomains }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const setCurrentSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const submitForm = () => {
    searchDomains(searchInputValue);
  };

  return (
    <Form>
      <MyInput
        value={searchInputValue}
        placeholder="Поиск"
        onChange={setCurrentSearchInputValue}
      />

      <MyButton
        style={{ marginLeft: '12px', minWidth: 'auto' }}
        onClick={submitForm}
      >
        <Search />
      </MyButton>
    </Form>
  );
};

export default DomainsListSearch;
