import { ChangeEvent, FC } from 'react';

import { SxProps, TextField } from '@mui/material';

interface IInputProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  required?: boolean;
}

const MyInput: FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  sx,
  required,
}) => {
  return (
    <TextField
      required={required}
      variant="outlined"
      size="small"
      onChange={onChange}
      value={value}
      label={placeholder}
      sx={sx}
    />
  );
};

export default MyInput;
