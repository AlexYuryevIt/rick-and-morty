import { isAxiosError } from 'axios';
import { type StateCreator } from 'zustand';

import { getCharacters } from '@api';
import { initialPage, pageStep, UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage } from '@helpers';

import type { TCharacter, TFilters } from '@types';

export type TCharactersListSlice = {
  characters: TCharacter[];
  page: number;
  hasNextPage: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  errorMessage: string | null;
  fetchCharacters: (filters: TFilters, page?: number) => Promise<void>;
  loadMore: (filters: TFilters) => Promise<void>;
  refetch: () => Promise<void>;
  updateCharacter: (character: TCharacter) => void;
};

export const CharactersListSlice: StateCreator<TCharactersListSlice> = (
  set,
  get
) => ({
  characters: [],
  page: initialPage,
  hasNextPage: true,
  isLoading: false,
  isLoadingMore: false,
  isError: false,
  errorMessage: null,

  fetchCharacters: async (filters, pageToLoad = initialPage) => {
    set({
      ...(pageToLoad === initialPage
        ? { isLoading: true }
        : { isLoadingMore: true }),
      isError: false,
      errorMessage: null
    });

    try {
      const { characters: newChars, hasNext } = await getCharacters(
        filters,
        pageToLoad
      );

      set({
        characters:
          pageToLoad === initialPage
            ? newChars
            : [...get().characters, ...newChars],
        hasNextPage: hasNext,
        page: pageToLoad,
        ...(pageToLoad === initialPage
          ? { isLoading: false }
          : { isLoadingMore: false })
      });
    } catch (error: unknown) {
      if (isAxiosError(error) && error.code === 'CanceledError') return;

      set({
        isLoading: false,
        isError: true,
        hasNextPage: false,
        page: initialPage,
        errorMessage: isAxiosError(error)
          ? getErrorMessage(error)
          : UNEXPECTED_ERROR
      });
    }
  },

  loadMore: async (filters: TFilters) => {
    const { hasNextPage, isLoading, isError, page, fetchCharacters } = get();

    if (!hasNextPage || isLoading || isError) return;

    await fetchCharacters(filters, page + pageStep);
  },

  refetch: () => {
    return get().fetchCharacters({} as TFilters, initialPage);
  },

  updateCharacter: (updatedCharacter) => {
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    }));
  }
});
