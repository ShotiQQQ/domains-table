import { ChangeEvent, FC } from 'react';

import { Input } from '@mui/material';

interface IInputProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: FC<IInputProps> = ({ value, onChange, placeholder }) => {
  return <Input onChange={onChange} value={value} placeholder={placeholder} />;
};

export default MyInput;
