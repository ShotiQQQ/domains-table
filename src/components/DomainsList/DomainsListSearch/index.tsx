import { ChangeEvent, FC, useState } from 'react';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

interface ISearchProps {
  onClick: (value: string) => void;
}

const DomainsListSearch: FC<ISearchProps> = ({ onClick }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const setCurrentSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <>
      <Input
        value={searchInputValue}
        placeholder="Поиск"
        onChange={setCurrentSearchInputValue}
      />

      <Button
        style={{ marginLeft: '12px' }}
        onClick={() => onClick(searchInputValue)}
      >
        Поиск
      </Button>
    </>
  );
};

export default DomainsListSearch;
