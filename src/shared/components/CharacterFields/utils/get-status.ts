import { statusOptions } from '@constants';

import type { Status } from '@types';

export const getCharacterStatus = (status: Status) => {
  const options = statusOptions();

  return (
    options.find(
      (charStatus) => charStatus?.value?.toLowerCase() === status?.toLowerCase()
    )?.label || ''
  );
};
