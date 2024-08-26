import { FC, ReactNode } from 'react';
import { preventSubmitForm } from '../../../utils/preventSubmitForm';

interface IFormProps {
  children: ReactNode;
}

const Form: FC<IFormProps> = ({ children }) => {
  return <form onSubmit={preventSubmitForm}>{children}</form>;
};

export default Form;
