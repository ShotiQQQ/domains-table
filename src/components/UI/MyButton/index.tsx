import { FC, ReactNode } from 'react';

import { Button } from '@mui/material';

type TButtonColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

type TButtonSize = 'small' | 'medium' | 'large';

interface IButtonProps {
  children: ReactNode;
  style?: object;
  color?: TButtonColor;
  size?: TButtonSize;
  onClick?: () => void;
}

const MyButton: FC<IButtonProps> = ({
  children,
  style,
  onClick,
  color,
  size,
}) => {
  return (
    <Button
      style={style}
      color={color}
      size={size}
      onClick={onClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default MyButton;
