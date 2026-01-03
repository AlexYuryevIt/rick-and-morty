import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { getCharacter } from '@api';
import { UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage, notify } from '@helpers';
import { type TCharacter } from '@types';

export const useGetCharacter = (characterId: number) => {
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getCharacterInfo = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const char = await getCharacter(characterId);

      setCharacter(char);
    } catch (error) {
      setIsError(true);
      setErrorMessage(UNEXPECTED_ERROR);
      setCharacter(null);

      if (isAxiosError(error)) {
        const message = getErrorMessage(error);
        setErrorMessage(message);
        notify(message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [characterId]);

  useEffect(() => {
    getCharacterInfo();
  }, [getCharacterInfo]);

  return {
    character,
    isLoading,
    isError,
    errorMessage
  };
};
