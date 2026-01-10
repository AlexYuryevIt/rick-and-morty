import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CharacterSlice, type TCharacterSlice } from './slices/characterSlice';
import {
  CharactersListSlice,
  type TCharactersListSlice
} from './slices/charactersListSlice';
import { FiltersSlice, type TFiltersSlice } from './slices/filtersSlice';

export type TCharactersStoreState = TCharactersListSlice &
  TCharacterSlice &
  TFiltersSlice;

export const useCharactersStore = create<TCharactersStoreState>()(
  devtools(
    (set, get, state) => ({
      ...CharactersListSlice(set, get, state),
      ...CharacterSlice(set, get, state),
      ...FiltersSlice(set, get, state)
    }),
    {
      name: 'characters-store'
    }
  )
);
