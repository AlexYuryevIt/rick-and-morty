import { useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useMemo } from 'react';

import { getCharacters } from '@api';
import { gcTime, initialPage, pageStep, staleTime } from '@constants';
import { getErrorMessage } from '@helpers';
import { useCharactersStore, useFiltersStore } from '@stores';

import type { TCharacter } from '@types';

type TUseGetCharactersProps = {
  isPending: boolean;
  isFetchingMore: boolean;
  isError: boolean;
  hasNextPage: boolean | undefined;
  errorMessage: string | null;
  loadMore: () => void;
  refetch: () => void;
  updateCharacter: (character: TCharacter) => void;
};

type TApiCharactersResponse = {
  characters: TCharacter[];
  hasNext: boolean;
};

export const useGetCharacters = (): TUseGetCharactersProps => {
  const filters = useFiltersStore((state) => state.filters);
  const { setCharacters, setHasNextPage } = useCharactersStore();

  const {
    data,
    isPending,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['characters', 'infinite', filters],
    queryFn: ({ pageParam = initialPage }) => getCharacters(filters, pageParam),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage?.hasNext) {
        return undefined;
      }
      return lastPage.hasNext ? lastPageParam + pageStep : undefined;
    },
    staleTime,
    gcTime
  });

  const characters = useMemo(() => {
    if (!data?.pages) return [];

    return data?.pages?.flatMap(
      (page: TApiCharactersResponse) => page.characters
    );
  }, [data]);

  useEffect(() => {
    if (characters.length > 0) {
      setCharacters(characters);
      setHasNextPage(hasNextPage || false);
    }
  }, [characters, hasNextPage, setCharacters, setHasNextPage]);

  const updateCharacter = (updatedCharacter: TCharacter) => {
    const { characters, setCharacters } = useCharactersStore.getState();
    setCharacters(
      characters.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  };

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return isAxiosError(error) ? getErrorMessage(error) : '';
  }, [error]);

  return {
    isPending,
    isFetchingMore: isFetchingNextPage,
    hasNextPage,
    isError,
    errorMessage,
    loadMore: fetchNextPage,
    updateCharacter,
    refetch
  };
};
