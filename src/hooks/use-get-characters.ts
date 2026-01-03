import { isAxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@api';
import { ERROR_MESSAGES, initialPage, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { type TCharacter, type TFilters } from '@types';

type TUseGetCharactersProps = {
  characters: TCharacter[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  hasNext: boolean;
  loadMore: () => void;
  refetch: () => void;
};

export const useGetCharacters = (filters: TFilters): TUseGetCharactersProps => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const getCharactersList = useCallback(
    async (pageToLoad: number) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);

      try {
        const { characters: newChars, hasNext } = await getCharacters(
          filters,
          pageToLoad,
          controller.signal
        );

        setCharacters((prev) =>
          pageToLoad === initialPage ? newChars : [...prev, ...newChars]
        );

        setHasNext(hasNext);
        setPage(pageToLoad);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;

        setIsError(true);
        setErrorMessage(UNEXPECTED_ERROR);
        setCharacters([]);

        if (isAxiosError(error)) {
          const errorStatus = error?.response?.status || error?.status || 0;
          const message = ERROR_MESSAGES[errorStatus] || UNEXPECTED_ERROR;
          setErrorMessage(message);
          notify(message, 'error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    getCharactersList(initialPage);

    return () => {
      controllerRef.current?.abort();
    };
  }, [filters, getCharactersList]);

  const loadMore = useCallback(() => {
    if (!hasNext || isLoading) return;

    getCharactersList(page + 1);
  }, [hasNext, isLoading, page, getCharactersList]);

  const refetch = useCallback(() => {
    getCharactersList(initialPage);
  }, [getCharactersList]);

  return {
    characters,
    isLoading,
    isError,
    errorMessage,
    hasNext,
    loadMore,
    refetch
  };
};
