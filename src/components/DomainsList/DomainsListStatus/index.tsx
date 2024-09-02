import { FC } from 'react';

import { Chip } from '@mui/material';

interface IStatusProps {
  isAvailable: boolean;
}

const DomainsListStatus: FC<IStatusProps> = ({ isAvailable }) => {
  return (
    <Chip
      label={isAvailable ? 'Доступен' : 'Недоступен'}
      color={isAvailable ? 'success' : 'error'}
      variant="outlined"
      size="small"
      sx={{ borderRadius: '4px', textTransform: 'lowercase', width: '100%' }}
    />
  );
};

export default DomainsListStatus;
