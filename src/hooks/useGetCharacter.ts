import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { getCharacter } from '@api';
import { UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage } from '@helpers';
import { useCharacterStore } from '@stores';

export const useGetCharacter = (characterId: number) => {
  const { character, setCharacter } = useCharacterStore();

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
      setCharacter(null);

      if (isAxiosError(error)) {
        const message = getErrorMessage(error);

        return setErrorMessage(message);
      }

      setErrorMessage(UNEXPECTED_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [characterId, setCharacter]);

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
