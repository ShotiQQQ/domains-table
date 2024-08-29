import { CSSProperties, FC, ReactNode } from 'react';
import { preventSubmitForm } from '../../../utils/preventSubmitForm';

interface IFormProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Form: FC<IFormProps> = ({ children, style }) => {
  return (
    <form onSubmit={preventSubmitForm} style={style}>
      {children}
    </form>
  );
};

export default Form;
