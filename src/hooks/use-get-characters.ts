import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { getCharacters } from '@api';
import { ERROR_MESSAGES, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { type TCharacter } from '@types';

export const useGetCharacters = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getCharactersList = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const res = (await getCharacters()) || [];

      setCharacters(res);
    } catch (error) {
      setIsError(true);

      if (isAxiosError(error)) {
        const errorStatus = error?.response?.status || error?.status || 0;
        const message = ERROR_MESSAGES[errorStatus] || UNEXPECTED_ERROR;

        notify(message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharactersList();
  }, []);

  return {
    characters,
    isLoading,
    isError,
    refetch: getCharactersList
  };
};
