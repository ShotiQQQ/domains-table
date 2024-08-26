import { FormEvent } from 'react';

export const preventSubmitForm = (event: FormEvent) => {
  event.preventDefault();
};
