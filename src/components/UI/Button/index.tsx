import styles from './Button.module.scss';
import { FC, ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  style?: object;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ children, style, onClick }) => {
  return (
    <button className={styles.button} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
