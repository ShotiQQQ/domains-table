import { ChangeEvent, FC } from 'react';

import { Input, SxProps } from '@mui/material';

interface IInputProps {
  value: string;
  placeholder: string;
  sx?: SxProps;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: FC<IInputProps> = ({ value, onChange, placeholder, sx }) => {
  return (
    <Input
      required
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      sx={sx}
    />
  );
};

export default MyInput;
