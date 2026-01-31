import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError) => {
  const errorStatus = error?.response?.status || error?.status || 0;

  return errorStatus.toString();
};
