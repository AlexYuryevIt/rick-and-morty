import { getStatusOptions } from '@constants';

import type { Status } from '@types';

export const getCharacterStatus = (status: Status) => {
  const options = getStatusOptions();

  return (
    options.find(
      (charStatus) => charStatus?.value?.toLowerCase() === status?.toLowerCase()
    )?.label || ''
  );
};
