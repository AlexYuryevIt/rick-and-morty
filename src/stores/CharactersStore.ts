import { create } from 'zustand';

import { initialPage } from '@constants';

import type { TCharacter } from '@types';

export type TCharactersListStore = {
  characters: TCharacter[];
  page: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
  setCharacters: (characters: TCharacter[]) => void;
};

export const useCharactersStore = create<TCharactersListStore>()((set) => ({
  characters: [],
  page: initialPage,
  hasNextPage: false,
  setCharacters: (characters: TCharacter[]) => set({ characters }),
  setPage: (page: number) => set({ page }),
  setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage })
}));
