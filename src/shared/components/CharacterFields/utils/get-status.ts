import { statusOptions } from '@constants';

import type { Status } from '@types';

export const getCharacterStatus = (status: Status) =>
  statusOptions.find(
    (charStatus) => charStatus.value.toLowerCase() === status?.toLowerCase()
  )?.label || '';
