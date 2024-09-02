import { ChangeEvent, FC, ReactNode } from 'react';

import { OutlinedInput, SxProps } from '@mui/material';

interface IInputProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  required?: boolean;
  endAdornment?: ReactNode;
}

const MyInput: FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  sx,
  required,
  endAdornment,
}) => {
  return (
    <OutlinedInput
      required={required}
      size="small"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      sx={sx}
      endAdornment={endAdornment}
    />
  );
};

export default MyInput;
