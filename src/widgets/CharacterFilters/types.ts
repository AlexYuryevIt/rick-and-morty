import type { TFilters } from '@types';

export type TFiltersProps = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};
