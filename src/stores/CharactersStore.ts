import { create } from 'zustand';

import { initialPage } from '@constants';

import type { TCharacter, TFavouriteCharacter } from '@types';

export type TCharactersListStore = {
  characters: TCharacter[];
  favourites: TFavouriteCharacter[];
  page: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
  setCharacters: (characters: TCharacter[]) => void;
  setFavourites: (favourites: TFavouriteCharacter[]) => void;
};

export const useCharactersStore = create<TCharactersListStore>()((set) => ({
  characters: [],
  favourites: JSON.parse(localStorage.getItem('favourites') ?? '[]'),
  page: initialPage,
  hasNextPage: false,
  setCharacters: (characters: TCharacter[]) => set({ characters }),
  setFavourites: (favourites: TFavouriteCharacter[]) => {
    set({ favourites });
    localStorage.setItem('favourites', JSON.stringify(favourites));
  },
  setPage: (page: number) => set({ page }),
  setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage })
}));
