import { isAxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@api';
import { initialPage, pageStep, UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage } from '@helpers';
import { type TCharacter, type TFilters } from '@types';

type TUseGetCharactersProps = {
  characters: TCharacter[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  hasNextPage: boolean;
  loadMore: () => void;
  refetch: () => void;
  updateCharacter: (character: TCharacter) => void;
};

export const useGetCharacters = (filters: TFilters): TUseGetCharactersProps => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
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

        setHasNextPage(hasNext);
        setPage(pageToLoad);
      } catch (error: unknown) {
        if (isAxiosError(error) && error.code === 'CanceledError') return;

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
    getCharactersList(initialPage);

    return () => {
      controllerRef.current?.abort();
    };
  }, [getCharactersList]);

  const loadMore = useCallback(() => {
    if (!hasNextPage || isLoading || isError) return;

    getCharactersList(page + pageStep);
  }, [hasNextPage, isLoading, isError, page, getCharactersList]);

  const refetch = useCallback(() => {
    getCharactersList(initialPage);
  }, [getCharactersList]);

  const updateCharacter = (updatedCharacter: TCharacter) =>
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );

  return {
    characters,
    isLoading,
    isError,
    errorMessage,
    hasNextPage,
    loadMore,
    refetch,
    updateCharacter
  };
};
