import { create } from 'zustand';

import type { TFilters } from '@types';

export type TFiltersStore = {
  filters: TFilters;
  setFilter: (value: string | null, field: keyof TFilters) => void;
  resetFilters: () => void;
};

const initialFiltersState = {
  name: '',
  species: null,
  gender: null,
  status: null
};

export const useFiltersStore = create<TFiltersStore>()((set) => ({
  filters: initialFiltersState,

  setFilter: (value, field) => {
    set((state) => ({
      filters: { ...state.filters, [field]: value }
    }));
  },

  resetFilters: () => {
    set({ filters: initialFiltersState });
  }
}));
