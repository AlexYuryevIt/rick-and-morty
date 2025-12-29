import { statusOptions } from '@constants';

import type { Status } from '@types';

export const getCharacterStatus = (status: Status) => {
  return (
    statusOptions.find((charStatus) => charStatus.value === status)?.label || ''
  );
};
