import { AxiosError } from 'axios';

import { ERROR_MESSAGES, UNEXPECTED_ERROR } from '@constants';

export const getErrorMessage = (error: AxiosError) => {
  const errorStatus = error?.response?.status || error?.status || 0;

  return ERROR_MESSAGES[errorStatus] || UNEXPECTED_ERROR;
};
