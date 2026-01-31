import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

import { getCharacter } from '@api';
import { staleTime } from '@constants';
import { getErrorMessage } from '@helpers';
import { useCharacterStore } from '@stores';

export const useGetCharacter = (characterId: number) => {
  const setCharacter = useCharacterStore((state) => state.setCharacter);

  const { data, isFetching, isPending, isError, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter(characterId),
    staleTime
  });

  useEffect(() => {
    if (!data || error) {
      setCharacter(null);
    }

    setCharacter(data);
  }, [data, error, setCharacter]);

  const errorMessage = isAxiosError(error) ? getErrorMessage(error) : '';

  return {
    isLoading: isPending,
    isFetching,
    isError,
    errorMessage
  };
};
