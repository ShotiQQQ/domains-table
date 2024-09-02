import { ChangeEvent, FC, useState } from 'react';

import MyInput from '../../UI/MyInput';
import MyButton from '../../UI/MyButton';
import Form from '../../UI/Form';

import { getUniqueID } from '../../../utils/getUniqueID';
import { checkHasHTTP } from '../../../utils/checkHasHTTP';
import { useCreateNewDomainMutation } from '../domains.generated';

interface INewItemProps {
  closeModal: () => void;
}

const DomainsListAddNewItem: FC<INewItemProps> = ({ closeModal }) => {
  const [domainNameValue, setDomainNameValue] = useState('');
  const [isShownDone, setIsShownDone] = useState(false);

  const [createNewDomain, { loading }] = useCreateNewDomainMutation();

  const addNewDomain = () => {
    if (domainNameValue) {
      createNewDomain({
        variables: {
          localDev: {
            id: getUniqueID(),
            domain: checkHasHTTP(domainNameValue),
            available: false,
          },
        },
      }).then(() => {
        setIsShownDone(true);

        setTimeout(() => {
          closeModal();
        }, 2000);
      });
    }
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDomainNameValue(event.target.value);
  };

  return (
    <Form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px',
        }}
      >
        <MyInput
          value={domainNameValue}
          placeholder="Имя домена"
          onChange={handleChangeInput}
          required={true}
          sx={{ marginBottom: '24px' }}
        />

        <MyButton
          type="submit"
          style={{ display: 'block', margin: '0 auto' }}
          onClick={addNewDomain}
          disabled={loading || isShownDone}
        >
          Добавить
        </MyButton>
      </div>
    </Form>
  );
};

export default DomainsListAddNewItem;
