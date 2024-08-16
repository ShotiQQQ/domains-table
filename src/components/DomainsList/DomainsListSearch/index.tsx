import { ChangeEvent, FC, useState } from 'react';

import MyInput from '../../UI/MyInput';
import MyButton from '../../UI/MyButton';

interface ISearchProps {
  searchDomains: (value: string) => void;
}

const DomainsListSearch: FC<ISearchProps> = ({ searchDomains }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const setCurrentSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const submitForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchDomains(searchInputValue);
  };

  return (
    <form onSubmit={submitForm}>
      <MyInput
        value={searchInputValue}
        placeholder="Поиск"
        onChange={setCurrentSearchInputValue}
      />

      <MyButton
        color="success"
        style={{ marginLeft: '12px' }}
        onClick={() => searchDomains(searchInputValue)}
      >
        Поиск
      </MyButton>
    </form>
  );
};

export default DomainsListSearch;
