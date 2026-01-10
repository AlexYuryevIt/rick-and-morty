import type { TFilters } from '@types';
import type { StateCreator } from 'zustand';

export type TFiltersSlice = {
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

export const FiltersSlice: StateCreator<TFiltersSlice> = (set) => ({
  filters: initialFiltersState,

  setFilter: (value, field) => {
    set((state) => ({
      filters: { ...state.filters, [field]: value }
    }));
  },

  resetFilters: () => {
    set({ filters: initialFiltersState });
  }
});
