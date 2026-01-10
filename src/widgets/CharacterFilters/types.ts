import type { TFilters } from '@types';
import type { Dispatch, SetStateAction } from 'react';

export type TFiltersProps = {
  filters: TFilters;
  setFilters: Dispatch<SetStateAction<TFilters>>;
};
