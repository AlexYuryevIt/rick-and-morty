import { AxiosError } from 'axios';

import { ERROR_MESSAGE_KEYS, UNEXPECTED_ERROR } from '@constants';

export const getErrorMessage = (error: AxiosError) => {
  const errorStatus = error?.response?.status || error?.status || 0;

  return ERROR_MESSAGE_KEYS[errorStatus] || UNEXPECTED_ERROR;
};
