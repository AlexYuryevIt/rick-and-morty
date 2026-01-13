import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { getCharacters } from '@api';
import { initialPage, pageStep, UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage } from '@helpers';
import { useCharactersStore, useFiltersStore } from '@stores';

import type { TCharacter } from '@types';

type TUseGetCharactersProps = {
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  errorMessage: string | null;
  loadMore: () => void;
  refetch: () => void;
  updateCharacter: (character: TCharacter) => void;
};

export const useGetCharacters = (): TUseGetCharactersProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = useFiltersStore((state) => state.filters);

  const getCharactersList = useCallback(
    async (pageToLoad: number = initialPage) => {
      const { characters, setCharacters, setPage, setHasNextPage } =
        useCharactersStore.getState();

      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);

      if (pageToLoad > initialPage) {
        setIsLoadingMore(true);
      }

      try {
        const { characters: newChars, hasNext } = await getCharacters(
          filters,
          pageToLoad || initialPage
        );

        setCharacters(
          pageToLoad === initialPage ? newChars : [...characters, ...newChars]
        );

        setHasNextPage(hasNext);
        setPage(pageToLoad || initialPage);
      } catch (error: unknown) {
        setIsError(true);
        setHasNextPage(false);
        setPage(initialPage);

        if (isAxiosError(error)) {
          const message = getErrorMessage(error);
          setErrorMessage(message);
          return;
        }

        setErrorMessage(UNEXPECTED_ERROR);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    getCharactersList();
  }, [getCharactersList]);

  const loadMore = useCallback(() => {
    const { page, hasNextPage } = useCharactersStore.getState();

    if (!hasNextPage || isLoading || isError) return;

    getCharactersList(page + pageStep);
  }, [isLoading, isError, getCharactersList]);

  const refetch = useCallback(() => {
    getCharactersList(initialPage);
  }, [getCharactersList]);

  const updateCharacter = (updatedCharacter: TCharacter) => {
    const { characters, setCharacters } = useCharactersStore.getState();
    setCharacters(
      characters.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  };

  return {
    isLoading,
    isLoadingMore,
    isError,
    errorMessage,
    loadMore,
    refetch,
    updateCharacter
  };
};
