import { FC, ReactNode } from 'react';

import { Button, type SxProps } from '@mui/material';

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
  onClick?: () => void;
  style?: object;
  color?: TButtonColor;
  size?: TButtonSize;
  type?: 'submit' | 'button';
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
  sx?: SxProps;
}

const MyButton: FC<IButtonProps> = ({
  children,
  style,
  onClick,
  color,
  size,
  disabled,
  className,
  variant = 'contained',
  type = 'button',
  sx,
}) => {
  return (
    <Button
      type={type}
      style={style}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      className={className}
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default MyButton;
