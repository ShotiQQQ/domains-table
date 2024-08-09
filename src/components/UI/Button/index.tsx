import styles from './Button.module.scss';
import { FC } from 'react';

interface IButtonProps {
  text: string;
}

const Button: FC<IButtonProps> = ({ text }) => {
  return <button className={styles.button}>{text}</button>;
};

export default Button;
