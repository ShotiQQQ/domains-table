import { FC, ReactNode } from 'react';

import styles from './Modal.module.scss';

import { Dialog, DialogTitle } from '@mui/material';

interface IModalProps {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ isOpen, title, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <div className={styles.modalContent}>{children}</div>
    </Dialog>
  );
};

export default Modal;
