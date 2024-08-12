import { ChangeEvent, FC } from 'react';

interface IInputProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input onChange={onChange} value={value} placeholder={placeholder} />
  );
};

export default Input;
